"use client";

import { Zap, MapPin, Code2, RefreshCw } from "lucide-react";

const locationExamples = [
  { selector: "#hero", location: "hero" },
  { selector: "#pricing", location: "pricing" },
  { selector: "#cta", location: "cta" },
];

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="bg-gray-50 border-y border-gray-100 py-20"
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            어떻게 동작하나요?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed break-keep">
            버튼·링크 텍스트만 있으면 이벤트 이름, 위치, 섹션을 DOM에서 자동으로
            유추해 Amplitude에 전송합니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-5">
              <Zap className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">
              코드 한 줄 없이 자동 추적
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-mono">
                &lt;button&gt;로그인&lt;/button&gt;
              </code>{" "}
              만 있으면 클릭 이벤트가 자동으로{" "}
              <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-mono">
                login_clicked
              </code>{" "}
              으로 전송됩니다.
            </p>
          </div>

          {/* Card 2 — 동적 버튼 (토글) */}
          <div className="bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-5">
              <RefreshCw className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">
              동적 버튼 텍스트 (토글)
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-mono">
                &#123;isLoggedIn ? &quot;로그아웃&quot; : &quot;로그인&quot;&#125;
              </code>{" "}
              처럼 라벨이 바뀌는 버튼도 클릭 순간의 보이는 텍스트로{" "}
              <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-mono">
                login_clicked
              </code>
              /{" "}
              <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-mono">
                logout_clicked
              </code>{" "}
              를 구분해 전송합니다.
            </p>
          </div>

          {/* Card 3 — featured */}
          <div className="bg-white rounded-2xl p-7 ring-2 ring-indigo-500/20 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-5">
              <MapPin className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">
              중복 버튼 자동 위치 구분
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              같은 텍스트 버튼이 여러 섹션에 있어도 DOM 구조에서 위치를 자동
              유추해 서로 다른 location으로 전송합니다.
            </p>
            <div className="bg-gray-950 rounded-xl p-3.5 text-xs font-mono space-y-1.5">
              {locationExamples.map(({ selector, location }) => (
                <div key={selector}>
                  <span className="text-green-400">{selector}</span>
                  <span className="text-gray-600"> → </span>
                  <span className="text-indigo-400">
                    location: &quot;{location}&quot;
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-5">
              <Code2 className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 text-[15px]">
              빌드 타임 이벤트 이름 생성
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              OpenAI가 빌드 시 1회만 호출되어 한국어 텍스트를 영문 이벤트
              이름으로 변환합니다.{" "}
              <code className="bg-gray-100 text-indigo-600 px-1.5 py-0.5 rounded text-xs font-mono">
                event-names.json
              </code>{" "}
              으로 git 관리됩니다.
            </p>
          </div>
        </div>

        <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl px-6 py-4 flex items-start gap-3">
          <span className="text-amber-400 mt-0.5 text-base">💡</span>
          <p className="text-amber-800 text-sm break-keep">
            <span className="font-semibold">데모 안내:</span> 이 페이지의{" "}
            <code className="bg-amber-100 px-1 rounded font-mono text-xs">
              &quot;로그인&quot; / &quot;로그아웃&quot;
            </code>{" "}
            토글 버튼과{" "}
            <code className="bg-amber-100 px-1 rounded font-mono text-xs">
              &quot;회원가입&quot;
            </code>{" "}
            버튼은 <strong>demo-a · demo-b</strong> 두 섹션에 있습니다. 로그인
            버튼을 클릭하면 라벨이 로그아웃으로 바뀌며, 그때 다시 클릭하면{" "}
            <code className="bg-amber-100 px-1 rounded font-mono text-xs">
              logout_clicked
            </code>
            로 전송됩니다. 각 섹션별로{" "}
            <code className="bg-amber-100 px-1 rounded font-mono text-xs">
              location
            </code>{" "}
            값이 다르게 찍히는 것도 우측 패널에서 확인하세요.
          </p>
        </div>
      </div>
    </section>
  );
}
