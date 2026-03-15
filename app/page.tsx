"use client";

import { useState, useEffect } from "react";
import { initAmplitude } from "amplitude-auto-track";
import { useAmplitudeEventLog } from "./hooks/useAmplitudeEventLog";
import { FeaturesSection, EventLogPanel, ActionButtons } from "./components/ui";

export default function FeatureIntroPage() {
  const [panelOpen, setPanelOpen] = useState(true);
  const { eventLog, flashId } = useAmplitudeEventLog();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) {
      initAmplitude();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header
        id="hero"
        className="max-w-3xl mx-auto px-4 pt-16 pb-12 text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          amplitude-automation
        </h1>
        <p className="text-gray-600 mb-6 break-keep">
          버튼·링크만 있으면 이벤트 이름과 위치를 자동으로 유추해 Amplitude에
          전송합니다.
          <br />
          코드 한 줄 없이 추적할 수 있어요.
        </p>
      </header>

      <FeaturesSection />

      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4 text-center break-keep">
          같은 텍스트 링크, 다른 섹션 — 클릭 시 location 값이 달라집니다.
        </h2>
        <ActionButtons />
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-600 mb-4 text-sm break-keep">
            아래 링크도 같은 텍스트예요. 섹션이 다르면 location이 다르게 찍혀요.
          </p>
          <ActionButtons />
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-white py-4 text-center text-sm text-gray-500">
        <a
          href={process.env.NEXT_PUBLIC_GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          View source on GitHub — amplitude-automation
        </a>
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
