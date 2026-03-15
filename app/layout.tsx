import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_TITLE } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description:
    "한국어 버튼/링크를 자동으로 추적하고, 빌드 타임에 생성된 이벤트 이름으로 Amplitude에 전송하는 Next.js 라이브러리입니다. 코드 한 줄 없이 자동 추적, 중복 버튼 위치 구분.",
  keywords: [
    "Amplitude",
    "analytics",
    "Next.js",
    "자동 추적",
    "이벤트 추적",
    "한국어",
  ],
  authors: [{ name: "Amplitude Automation" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description:
      "한국어 버튼/링크를 자동으로 추적하고, 빌드 타임에 생성된 이벤트 이름으로 Amplitude에 전송하는 Next.js 라이브러리입니다.",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: SITE_TITLE },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description:
      "한국어 버튼/링크 자동 추적 · 빌드 타임 이벤트 이름 생성 · Amplitude 전송",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: "/apple-icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
