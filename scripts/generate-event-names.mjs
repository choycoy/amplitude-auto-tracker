/**
 * Build-time script: scans app/**\/*.tsx for Korean text,
 * translates new entries via OpenAI, and writes to lib/event-names.json.
 *
 * Run: node --env-file=.env scripts/generate-event-names.mjs
 *
 * Existing entries in event-names.json are never overwritten,
 * so manual overrides are safe.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EVENT_NAMES_PATH = path.join(ROOT, 'lib', 'event-names.json');

// ── 1. Load existing mappings ──────────────────────────────────────────────
const existing = JSON.parse(fs.readFileSync(EVENT_NAMES_PATH, 'utf-8'));

// ── 2. Collect Korean text from all TSX files ──────────────────────────────
function extractKoreanStrings(content) {
  const results = new Set();
  const hasKorean = /[\uAC00-\uD7AF]/;

  // JSX text nodes: >Korean text<
  const jsxText = />([^<{}\n]*[\uAC00-\uD7AF][^<{}\n]*)</g;
  let m;
  while ((m = jsxText.exec(content)) !== null) {
    const t = m[1].trim();
    if (t && hasKorean.test(t)) results.add(t);
  }

  // String literals: 'Korean' or "Korean"
  const strLit = /['"`]([^'"`\n]*[\uAC00-\uD7AF][^'"`\n]*)[`'"]/g;
  while ((m = strLit.exec(content)) !== null) {
    const t = m[1].trim();
    if (t && hasKorean.test(t)) results.add(t);
  }

  return results;
}

function scanDir(dir) {
  const allTexts = new Set();
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      for (const t of scanDir(full)) allTexts.add(t);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf-8');
      for (const t of extractKoreanStrings(content)) allTexts.add(t);
    }
  }
  return allTexts;
}

const allTexts = scanDir(path.join(ROOT, 'app'));
const toTranslate = [...allTexts].filter((t) => !existing[t]);

if (toTranslate.length === 0) {
  console.log('No new texts found. event-names.json is up to date.');
  process.exit(0);
}

console.log(`Found ${toTranslate.length} new text(s) to translate:`, toTranslate);

// ── 3. Call OpenAI once ────────────────────────────────────────────────────
const client = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

const response = await client.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'system',
      content: `Convert button/link text into snake_case analytics event names.
Rules:
- Convert any language to English
- Use lowercase snake_case
- Keep it concise (max 3-4 words)
- Add "_clicked" suffix
- Be consistent and semantic
- Return ONLY a JSON object mapping each input text to its event name

Example:
{
  "회원가입": "signup_clicked",
  "저장하기": "save_clicked"
}`,
    },
    {
      role: 'user',
      content: `Convert these texts to event names:\n${JSON.stringify(toTranslate)}`,
    },
  ],
  temperature: 0.3,
  response_format: { type: 'json_object' },
});

const translations = JSON.parse(response.choices[0].message.content);

// ── 4. Merge and write ─────────────────────────────────────────────────────
// Existing entries take priority — never overwrite manual overrides
const merged = { ...translations, ...existing };

// Sort keys for stable diffs in git
const sorted = Object.fromEntries(
  Object.entries(merged).sort(([a], [b]) => a.localeCompare(b))
);

fs.writeFileSync(EVENT_NAMES_PATH, JSON.stringify(sorted, null, 2) + '\n');
console.log(`Done. Wrote ${Object.keys(sorted).length} entries to lib/event-names.json`);
