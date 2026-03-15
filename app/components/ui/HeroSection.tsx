"use client";

interface HeroSectionProps {
  isYearly: boolean;
  onBillingToggle: () => void;
}

export function HeroSection({ isYearly, onBillingToggle }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          간단하고 투명한 요금제
        </h1>
        <p className="text-lg mb-8 opacity-90">
          필요에 맞는 완벽한 플랜을 선택하세요. 숨겨진 수수료 없음, 놀람 없음.
          <br />
          언제든지 취소 가능.{" "}
          <span className="underline cursor-pointer">
            자주 묻는 질문 보기
          </span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            type="button"
            className="bg-white text-indigo-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            무료 체험 시작
          </button>
          <button
            type="button"
            className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors cursor-pointer"
          >
            영업팀에 문의
          </button>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <span className={!isYearly ? "font-semibold" : "opacity-70"}>
            월간
          </span>
          <button
            type="button"
            onClick={onBillingToggle}
            className="relative inline-flex h-8 w-14 items-center rounded-full bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"
            aria-pressed={isYearly}
          >
            <span
              className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isYearly ? "translate-x-7" : "translate-x-1"}`}
            />
          </button>
          <span className={isYearly ? "font-semibold" : "opacity-70"}>
            연간
          </span>
          <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-medium">
            최대 20% 할인
          </span>
        </div>
      </div>
    </section>
  );
}
