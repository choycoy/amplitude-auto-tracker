"use client";

import { useState } from "react";

export function ActionButtons({ className = "" }: { className?: string }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const docsUrl = process.env.NEXT_PUBLIC_GITHUB_URL!;

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-4 ${className}`.trim()}
    >
      <a
        href={docsUrl}
        target="_blank"
        className="text-indigo-400 hover:text-indigo-300 hover:underline text-sm font-medium transition-colors"
        rel="noopener noreferrer"
      >
        문서 보기
      </a>
      <button
        type="button"
        onClick={() => setIsLoggedIn((prev) => !prev)}
        className="text-gray-300 px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-sm font-medium transition-colors"
      >
        {isLoggedIn ? "로그아웃" : "로그인"}
      </button>
      <button
        type="button"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 text-sm font-medium transition-colors"
      >
        회원가입
      </button>
    </div>
  );
}
