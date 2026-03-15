"use client";
import Link from "next/link";

export function ActionButtons({ className = "" }: { className?: string }) {
  const docsUrl = process.env.NEXT_PUBLIC_GITHUB_URL!;

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-4 ${className}`.trim()}
    >
      <Link
        href={docsUrl}
        target="_blank"
        className="text-indigo-600 hover:text-indigo-700 hover:underline text-sm font-medium"
        rel="noopener noreferrer"
      >
        문서 보기
      </Link>
      <button
        type="button"
        className="text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-sm font-medium"
      >
        로그인
      </button>
      <button
        type="button"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium"
      >
        회원가입
      </button>
    </div>
  );
}
