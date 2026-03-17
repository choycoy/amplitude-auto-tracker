"use client";

import { useState, useEffect } from "react";
import { Clipboard, Check } from "lucide-react";
import { initAmplitude } from "amplitude-auto-tracker";
import { useAmplitudeEventLog } from "./hooks/useAmplitudeEventLog";
import { FeaturesSection, EventLogPanel, ActionButtons } from "./components/ui";
import eventNames from "../lib/event-names.json";

const INSTALL_CMD = "npm install amplitude-auto-tracker";
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL!;
const NPM_URL = process.env.NEXT_PUBLIC_NPM_URL!;

export default function FeatureIntroPage() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isLoggedInA, setIsLoggedInA] = useState(false);
  const [isLoggedInB, setIsLoggedInB] = useState(false);
  const { eventLog, flashId } = useAmplitudeEventLog();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) {
      initAmplitude({ eventNames: eventNames as Record<string, string> });
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-mono font-bold text-gray-900 text-sm tracking-tight">
            amplitude-auto-tracker
          </span>
          <div className="flex items-center gap-1">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors px-3 py-1.5 rounded-md hover:bg-gray-50"
            >
              GitHub
            </a>
            <a
              href={NPM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors px-3 py-1.5 rounded-md hover:bg-gray-50"
            >
              npm
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — left-aligned, dot-grid backdrop */}
      <header
        id="hero"
        className="relative overflow-hidden border-b border-gray-100"
      >
        {/* Dot grid */}
        <div className="dot-grid absolute inset-0 opacity-40" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20">
          {/* Meta strip */}
          <div className="animate-slide-up flex items-center gap-3 mb-10 font-mono text-xs text-gray-400 tracking-widest uppercase">
            <span>Package</span>
            <span className="h-px w-6 bg-gray-200" />
            <span className="text-indigo-500 font-semibold">v0.1.2</span>
            <span className="h-px w-6 bg-gray-200" />
            <span>MIT</span>
            <span className="h-px w-6 bg-gray-200" />
            <a
              href={NPM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors"
            >
              npm ↗
            </a>
          </div>

          {/* Giant title */}
          <h1 className="animate-slide-up font-mono text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-gray-950 mb-6">
            amplitude-
            <br />
            auto-tracker
            <span className="animate-blink text-indigo-500 ml-1">_</span>
          </h1>

          {/* Description */}
          <p className="animate-slide-up-delay text-gray-500 text-lg max-w-md mb-10 leading-relaxed break-keep">
            버튼·링크 텍스트만으로 Amplitude 이벤트를 자동 추적합니다. 이벤트
            이름은 빌드 시 생성, 위치는 DOM에서 자동 유추.
          </p>

          {/* Install block */}
          <div className="animate-slide-up-delay-2 mb-8 max-w-lg">
            <div className="flex items-stretch bg-gray-950 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/5">
              <div className="flex items-center gap-3 px-5 py-3.5 flex-1 font-mono text-sm">
                <span className="text-indigo-400 select-none flex-shrink-0">
                  $
                </span>
                <span className="text-gray-100">{INSTALL_CMD}</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-4 text-gray-400 hover:text-white hover:bg-white/10 transition-all border-l border-gray-800 text-xs font-mono cursor-pointer flex-shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">copied</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" />
                    <span>copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CTAs */}
          <div className="animate-slide-up-delay-2 flex items-center gap-3">
            <a
              href={NPM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-950 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg"
            >
              View on npm ↗
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Quick start — terminal window with chrome */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gray-950 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/5">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-800">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-gray-500">
              quick-start.ts
            </span>
          </div>
          {/* Code */}
          <div className="p-6 font-mono text-sm leading-7 overflow-x-auto">
            <p>
              <span className="text-purple-400">import</span>{" "}
              <span className="text-gray-100">{"{ initAmplitude }"}</span>{" "}
              <span className="text-purple-400">from</span>{" "}
              <span className="text-green-400">
                &apos;amplitude-auto-tracker&apos;
              </span>
            </p>
            <p>
              <span className="text-purple-400">import</span>{" "}
              <span className="text-gray-100">eventNames</span>{" "}
              <span className="text-purple-400">from</span>{" "}
              <span className="text-green-400">
                &apos;./lib/event-names.json&apos;
              </span>
            </p>
            <p className="mt-4">
              <span className="text-blue-400">initAmplitude</span>
              <span className="text-gray-100">{"({ eventNames })"}</span>
            </p>
            <p className="mt-4 text-gray-600 text-xs">
              {
                "// Done. Every button & link click is now tracked automatically."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* Live Demo */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-10">
          <div>
            <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-1">
              Interactive
            </p>
            <h2 className="text-2xl font-bold text-gray-900">라이브 데모</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
          <p className="text-gray-400 text-xs font-mono hidden md:block">
            같은 버튼 · 다른 <code className="text-indigo-400">location</code>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <section
            id="demo-a"
            className="group relative rounded-2xl p-8 text-center bg-gray-950 overflow-hidden border border-gray-800 hover:border-indigo-500/40 transition-colors"
          >
            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl group-hover:bg-indigo-600/20 transition-all" />
            <p className="font-mono text-xs text-indigo-400 mb-1">
              section id=&quot;demo-a&quot;
            </p>
            <p className="text-sm text-gray-500 mb-6">
              클릭 →{" "}
              <code className="font-mono text-indigo-300 text-xs">
                location: &quot;demo-a&quot;
              </code>
            </p>

            <ActionButtons
              isLoggedIn={isLoggedInA}
              onToggleLogin={() => setIsLoggedInA((prev) => !prev)}
            />
          </section>

          <section
            id="demo-b"
            className="group relative rounded-2xl p-8 text-center bg-gray-950 overflow-hidden border border-gray-800 hover:border-purple-500/40 transition-colors"
          >
            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all" />
            <p className="font-mono text-xs text-purple-400 mb-1">
              section id=&quot;demo-b&quot;
            </p>
            <p className="text-sm text-gray-500 mb-6">
              클릭 →{" "}
              <code className="font-mono text-purple-300 text-xs">
                location: &quot;demo-b&quot;
              </code>
            </p>
            <ActionButtons
              isLoggedIn={isLoggedInB}
              onToggleLogin={() => setIsLoggedInB((prev) => !prev)}
            />
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="font-mono text-xs text-gray-400">
            amplitude-auto-tracker · MIT
          </span>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-gray-400 hover:text-indigo-500 transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </footer>

      <EventLogPanel
        events={eventLog}
        isOpen={panelOpen}
        onToggle={() => setPanelOpen((p) => !p)}
        flashId={flashId}
      />
    </div>
  );
}
