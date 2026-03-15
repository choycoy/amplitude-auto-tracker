"use client";

const NAV_LINKS = [
  { href: "#features", label: "기능" },
  { href: "#pricing", label: "요금" },
  { href: "#faq", label: "소개" },
  { href: "#cta", label: "문의" },
] as const;

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex justify-between items-center h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-2xl font-bold text-gray-900">BluePlan</div>
        <div className="hidden md:flex space-x-8">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            className="text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors cursor-pointer text-sm"
          >
            로그인
          </button>
          <button
            type="button"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer text-sm"
          >
            회원가입
          </button>
        </div>
      </div>
    </nav>
  );
}
