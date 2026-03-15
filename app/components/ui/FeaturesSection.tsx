"use client";

import { Zap, MapPin, Code2 } from "lucide-react";

const LOCATION_EXAMPLES = [
  { selector: "#hero", location: "hero" },
  { selector: "#pricing", location: "pricing" },
  { selector: "#cta", location: "cta" },
] as const;

export function FeaturesSection() {
  return (
    <section id="features" className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          자동 추적, 코드 없이
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          버튼·링크 텍스트만 있으면 이벤트 이름, 위치, 섹션을 DOM에서 자동으로
          유추해 Amplitude에 전송합니다.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 p-7 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">
            코드 한 줄 없이 자동 추적
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            <code className="bg-gray-100 text-indigo-600 px-1 rounded text-xs">
              &lt;button&gt;로그인&lt;/button&gt;
            </code>
            만 있으면 클릭 이벤트가 자동으로{" "}
            <code className="bg-gray-100 text-indigo-600 px-1 rounded text-xs">
              login_clicked
            </code>
            로 전송됩니다.
          </p>
        </div>
        <div className="bg-white rounded-xl border border-indigo-200 p-7 hover:shadow-md transition-shadow ring-1 ring-indigo-100">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <MapPin className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">
            중복 버튼 자동 위치 구분
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-3">
            같은 텍스트의 버튼이 여러 섹션에 있어도 DOM 컨텍스트에서 위치를
            자동 유추합니다.
          </p>
          <div className="bg-gray-50 rounded-md p-3 text-xs font-mono space-y-1">
            {LOCATION_EXAMPLES.map(({ selector, location }) => (
              <div key={selector}>
                <span className="text-green-600">{selector}</span> →{" "}
                <span className="text-indigo-500">
                  location: &quot;{location}&quot;
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-7 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <Code2 className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">
            빌드 타임 이벤트 이름 생성
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            OpenAI가 빌드 시 1회 호출되어 한국어 텍스트를 영문 이벤트 이름으로
            변환,{" "}
            <code className="bg-gray-100 text-indigo-600 px-1 rounded text-xs">
              event-names.json
            </code>
            에 저장합니다.
          </p>
        </div>
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 flex items-start gap-3">
        <span className="text-amber-500 text-lg mt-0.5">💡</span>
        <p className="text-amber-800 text-sm">
          <span className="font-semibold">데모:</span> 이 페이지의{" "}
          <span className="font-mono bg-amber-100 px-1 rounded">
            &quot;무료 체험 시작&quot;
          </span>{" "}
          버튼은 <strong>hero · pricing · cta</strong> 세 곳에 있습니다. 각각
          클릭하면 오른쪽 패널에서{" "}
          <span className="font-mono bg-amber-100 px-1 rounded">
            location
          </span>{" "}
          값이 다르게 자동 유추되는 것을 확인하세요.
        </p>
      </div>
    </section>
  );
}
