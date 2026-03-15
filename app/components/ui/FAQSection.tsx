"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import type { FAQ } from "../../types";

interface FAQSectionProps {
  faqs: FAQ[];
  openIndex: number | null;
  onToggle: (index: number | null) => void;
}

export function FAQSection({ faqs, openIndex, onToggle }: FAQSectionProps) {
  return (
    <section id="faq" className="max-w-4xl mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">
        자주 묻는 질문
      </h2>
      <p className="text-gray-500 text-center mb-12">
        요금제에 대해 알아야 할 모든 것
      </p>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <button
              type="button"
              className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onToggle(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-gray-900">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
