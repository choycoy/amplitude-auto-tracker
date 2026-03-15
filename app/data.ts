import type { Plan, FAQ } from "./types";

export const plans: Plan[] = [
  {
    name: "베이직",
    description: "개인 및 소규모 팀을 위한",
    monthlyPrice: 10000,
    yearlyPrice: 86000,
    buttonText: "시작하기",
    buttonStyle: "primary",
    features: [
      "최대 10개 프로젝트",
      "100GB 저장공간",
      "이메일 지원",
      "기본 분석",
    ],
  },
  {
    name: "프로",
    description: "성장하는 조직을 위한",
    monthlyPrice: 30000,
    yearlyPrice: 280000,
    buttonText: "무료 체험 시작",
    buttonStyle: "primary",
    featured: true,
    features: [
      "무제한 프로젝트",
      "500GB 저장공간",
      "우선 지원",
      "고급 분석",
      "팀 협업",
      "API 접근",
    ],
  },
  {
    name: "엔터프라이즈",
    description: "대규모 배포를 위한",
    monthlyPrice: 100000,
    yearlyPrice: 950000,
    buttonText: "영업팀에 문의",
    buttonStyle: "secondary",
    features: [
      "프로 플랜의 모든 기능",
      "70TB 저장공간",
      "24/7 우선 지원",
      "커스텀 통합",
      "전담 매니저",
      "SLA 보장",
    ],
  },
];

export const faqs: FAQ[] = [
  {
    question: "언제든지 플랜을 변경할 수 있나요?",
    answer:
      "네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경 사항은 다음 청구 주기에 반영됩니다.",
  },
  {
    question: "무료 체험이 있나요?",
    answer:
      "네, 프로 플랜의 14일 무료 체험을 제공합니다. 신용카드 등록 불필요하며, 언제든지 취소 가능합니다.",
  },
  {
    question: "어떤 결제 방법을 지원하나요?",
    answer:
      "모든 주요 신용카드(Visa, MasterCard, Amex)를 지원하며, 엔터프라이즈 고객의 경우 PayPal도 지원합니다.",
  },
];
