"use client";

export function CTASection() {
  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">시작할 준비가 되셨나요?</h2>
        <p className="text-lg mb-8 opacity-90">
          우리를 신뢰하는 수천 개의 팀과 함께하세요
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
      </div>
    </section>
  );
}
