/**
 * Build-time script: scans app/**\/*.tsx for Korean text that is clickable only
 * (inside <button>, <a>, or label-like props), translates via OpenAI, writes to
 * lib/event-names.json.
 *
 * Run: node scripts/generate-event-names.mjs
 *
 * Existing entries in event-names.json are never overwritten.
 */

import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const EVENT_NAMES_PATH = path.join(ROOT, 'lib', 'event-names.json');

// ── 1. Load existing mappings ──────────────────────────────────────────────
const existing = JSON.parse(fs.readFileSync(EVENT_NAMES_PATH, 'utf-8'));

// ── 2. Collect Korean text only from clickable elements (<button>, <a>) ─────
const hasKorean = /[\uAC00-\uD7AF]/;

/** Extract Korean-containing text from HTML/JSX inner content (handles nested tags). */
function extractKoreanFromInner(inner) {
  const results = new Set();
  const trimmed = inner.trim();
  // Single text node (no nested tags) — e.g. <button>회원가입</button>
  if (trimmed && hasKorean.test(trimmed) && !trimmed.includes('<')) {
    results.add(trimmed);
  }
  // Text nodes: between > and < (nested elements), must contain Korean
  const textNode = />([^<{}]*[\uAC00-\uD7AF][^<{}]*)</g;
  let m;
  while ((m = textNode.exec(inner)) !== null) {
    const t = m[1].trim();
    if (t && hasKorean.test(t)) results.add(t);
  }
  return results;
}

function extractClickableKoreanStrings(content) {
  const results = new Set();

  // <button>...</button> — inner content (non-greedy, allows nested elements)
  const buttonRe = /<button[\s>][^>]*>([\s\S]*?)<\/button>/gi;
  let m;
  while ((m = buttonRe.exec(content)) !== null) {
    for (const t of extractKoreanFromInner(m[1])) results.add(t);
  }

  // <a ...>...</a>
  const anchorRe = /<a\s[^>]*>([\s\S]*?)<\/a>/gi;
  while ((m = anchorRe.exec(content)) !== null) {
    for (const t of extractKoreanFromInner(m[1])) results.add(t);
  }

  // JSX props: buttonText="...", label="...", aria-label="..."
  const labelPropRe = /(?:buttonText|label|aria-label|title)\s*=\s*\{?["'`]([^"'`\n]*[\uAC00-\uD7AF][^"'`\n]*)["'`]/g;
  while ((m = labelPropRe.exec(content)) !== null) {
    const t = m[1].trim();
    if (t && hasKorean.test(t)) results.add(t);
  }

  // Object literals (e.g. data.ts): buttonText: "시작하기", so dynamic buttons are covered
  const dataLabelRe = /(?:buttonText|label)\s*:\s*["'`]([^"'`\n]*[\uAC00-\uD7AF][^"'`\n]*)["'`]/g;
  while ((m = dataLabelRe.exec(content)) !== null) {
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
      for (const t of extractClickableKoreanStrings(content)) allTexts.add(t);
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
