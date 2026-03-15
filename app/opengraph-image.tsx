import { ImageResponse } from "next/og";

export const alt = "Amplitude 자동 추적";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            marginBottom: 24,
            letterSpacing: "-0.02em",
          }}
        >
          Amplitude 자동 추적
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            opacity: 0.95,
            maxWidth: 800,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          한국어 버튼/링크 자동 추적 · 빌드 타임 이벤트 이름 생성 · Amplitude 전송
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 20,
            opacity: 0.85,
          }}
        >
          Next.js · Amplitude Analytics
        </div>
      </div>
    ),
    { ...size }
  );
}
