"use client";

const SOCIAL_LINKS = [
  { href: "#", label: "𝕏" },
  { href: "#", label: "in" },
  { href: "#", label: "f" },
] as const;

const FOOTER_SECTIONS = [
  {
    title: "제품",
    links: [
      { href: "#features", label: "기능" },
      { href: "#pricing", label: "요금" },
      { href: "#", label: "보안" },
      { href: "#", label: "로드맵" },
    ],
  },
  {
    title: "회사",
    links: [
      { href: "#", label: "소개" },
      { href: "#", label: "채용" },
      { href: "#cta", label: "문의" },
      { href: "#", label: "블로그" },
    ],
  },
  {
    title: "지원",
    links: [
      { href: "#", label: "도움말 센터" },
      { href: "#", label: "문서" },
      { href: "#", label: "API 참조" },
      { href: "#", label: "상태" },
    ],
  },
] as const;

const LINK_CLASS = "text-gray-400 hover:text-white";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-xl font-bold mb-4">BluePlan</div>
            <p className="text-gray-400 text-sm mb-4">
              모든 사람을 위한 간단하고 효과적인 계획 수립
            </p>
            <div className="flex space-x-4">
              {SOCIAL_LINKS.map(({ href, label }) => (
                <a key={label} href={href} className={LINK_CLASS}>
                  {label}
                </a>
              ))}
            </div>
          </div>
          {FOOTER_SECTIONS.map(({ title, links }) => (
            <div key={title}>
              <h3 className="font-semibold mb-4">{title}</h3>
              <ul className="space-y-2 text-sm">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <a href={href} className={LINK_CLASS}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          © 2024 BluePlan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
