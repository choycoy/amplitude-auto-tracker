"use client";

import { Check } from "lucide-react";
import type { Plan } from "../../types";

interface PricingSectionProps {
  plans: Plan[];
  isYearly: boolean;
  getCurrentPrice: (plan: Plan) => number;
  getYearlySavings: (plan: Plan) => number;
}

export function PricingSection({
  plans,
  isYearly,
  getCurrentPrice,
  getYearlySavings,
}: PricingSectionProps) {
  return (
    <section id="pricing" className="max-w-7xl mx-auto px-4 pb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">요금제</h2>
        <p className="text-gray-500">팀 규모와 필요에 맞는 플랜을 선택하세요</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-sm border p-8 transition-transform hover:-translate-y-1 ${
              plan.featured
                ? "border-indigo-400 shadow-indigo-100 shadow-lg md:scale-105"
                : "border-gray-200"
            }`}
          >
            {plan.featured && (
              <div className="text-center mb-3">
                <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  가장 인기
                </span>
              </div>
            )}
            <h3 className="text-2xl font-bold mb-1 text-gray-900">
              {plan.name}
            </h3>
            <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

            <div className="mb-2">
              <span className="text-5xl font-bold text-gray-900">
                {getCurrentPrice(plan).toLocaleString()}원
              </span>
              <span className="text-gray-400 ml-2 text-sm">/월</span>
            </div>
            {isYearly ? (
              <p className="text-green-600 text-sm font-medium mb-4">
                연간 결제 시 {getYearlySavings(plan).toLocaleString()}원 절약
              </p>
            ) : (
              <div className="mb-4" />
            )}

            <button
              type="button"
              className={`w-full py-3 rounded-lg font-semibold mb-6 transition cursor-pointer ${
                plan.buttonStyle === "primary"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {plan.buttonText}
            </button>

            <ul className="space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
