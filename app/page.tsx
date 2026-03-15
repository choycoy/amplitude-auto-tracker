"use client";

import { useState, useEffect } from "react";
import { initAmplitude } from "amplitude-auto-track";
import { useAmplitudeEventLog } from "./hooks/useAmplitudeEventLog";
import { FeaturesSection, EventLogPanel, ActionButtons } from "./components/ui";
import eventNames from "../lib/event-names.json";

export default function FeatureIntroPage() {
  const [panelOpen, setPanelOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const { eventLog, flashId } = useAmplitudeEventLog();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) {
      initAmplitude({ eventNames: eventNames as Record<string, string> });
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install amplitude-auto-track");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <span className="font-mono font-semibold text-gray-900 text-sm">
            amplitude-auto-track
          </span>
          <div className="flex items-center gap-4">
            <a
              href={process.env.NEXT_PUBLIC_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/amplitude-auto-track"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
            >
              npm
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header
        id="hero"
        className="max-w-3xl mx-auto px-4 pt-20 pb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          v0.1.0 · MIT
        </div>

        <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-4">
          amplitude-auto-track
        </h1>
        <p className="text-lg text-gray-500 mb-10 break-keep leading-relaxed max-w-xl mx-auto">
          버튼·링크 텍스트만으로 Amplitude 이벤트를 자동 추적합니다.
          <br />
          이벤트 이름은 빌드 시 생성, 위치는 DOM에서 자동 유추.
        </p>

        {/* Install command */}
        <div className="inline-flex items-center gap-3 bg-gray-950 text-gray-100 pl-5 pr-3 py-3 rounded-xl font-mono text-sm mb-8 shadow-lg">
          <span className="text-gray-500 select-none">$</span>
          <span>npm install amplitude-auto-track</span>
          <button
            type="button"
            onClick={handleCopy}
            className="ml-2 text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10 text-xs cursor-pointer"
          >
            {copied ? "✓ copied" : "copy"}
          </button>
        </div>

        <div className="flex items-center justify-center gap-3">
          <a
            href="https://www.npmjs.com/package/amplitude-auto-track"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            View on npm
          </a>
          <a
            href={process.env.NEXT_PUBLIC_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            GitHub
          </a>
        </div>
      </header>

      {/* Quick start code block */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <div className="bg-gray-950 rounded-2xl p-6 font-mono text-sm leading-7 overflow-x-auto shadow-xl">
          <p className="text-gray-500 text-xs font-sans mb-4">Quick start</p>
          <p>
            <span className="text-purple-400">import</span>{" "}
            <span className="text-gray-100">{"{ initAmplitude }"}</span>{" "}
            <span className="text-purple-400">from</span>{" "}
            <span className="text-green-400">
              &apos;amplitude-auto-track&apos;
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
          <p className="mt-4 text-gray-600 text-xs font-sans">
            {"// Done. Every button & link click is now tracked automatically."}
          </p>
        </div>
      </section>

      {/* Features */}
      <FeaturesSection />

      {/* Live Demo */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">라이브 데모</h2>
          <p className="text-gray-500 text-sm break-keep max-w-lg mx-auto">
            같은 텍스트 버튼이라도 섹션에 따라{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-indigo-600 text-xs font-mono">
              location
            </code>{" "}
            이 다르게 찍힙니다. 우측 패널에서 확인해 보세요.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <section
            id="demo-a"
            className="border-2 border-dashed border-indigo-200 rounded-2xl p-8 text-center bg-indigo-50/40"
          >
            <p className="text-xs font-mono text-indigo-400 mb-1">
              section id=&quot;demo-a&quot;
            </p>
            <p className="text-sm text-gray-500 mb-5">
              클릭 →{" "}
              <code className="font-mono text-indigo-600 text-xs">
                location: &quot;demo-a&quot;
              </code>
            </p>
            <ActionButtons />
          </section>

          <section
            id="demo-b"
            className="border-2 border-dashed border-purple-200 rounded-2xl p-8 text-center bg-purple-50/40"
          >
            <p className="text-xs font-mono text-purple-400 mb-1">
              section id=&quot;demo-b&quot;
            </p>
            <p className="text-sm text-gray-500 mb-5">
              클릭 →{" "}
              <code className="font-mono text-purple-600 text-xs">
                location: &quot;demo-b&quot;
              </code>
            </p>
            <ActionButtons />
          </section>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center">
        <p className="text-sm text-gray-400">
          <a
            href={process.env.NEXT_PUBLIC_GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:underline"
          >
            amplitude-auto-track
          </a>{" "}
          · MIT License
        </p>
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
