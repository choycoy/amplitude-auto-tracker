"use client";

import { useState, useEffect } from "react";
import { initAmplitude } from "../lib/amplitude";
import { plans, faqs } from "./data";
import { useAmplitudeEventLog } from "./hooks/useAmplitudeEventLog";
import {
  Navbar,
  HeroSection,
  FeaturesSection,
  PricingSection,
  FAQSection,
  CTASection,
  Footer,
  EventLogPanel,
} from "./components/ui";

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [panelOpen, setPanelOpen] = useState(true);
  const { eventLog, flashId } = useAmplitudeEventLog();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY) {
      initAmplitude();
    }
  }, []);

  const getCurrentPrice = (plan: (typeof plans)[0]) =>
    isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  const getYearlySavings = (plan: (typeof plans)[0]) =>
    plan.monthlyPrice * 12 - plan.yearlyPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <HeroSection
        isYearly={isYearly}
        onBillingToggle={() => setIsYearly((v) => !v)}
      />

      <FeaturesSection />

      <PricingSection
        plans={plans}
        isYearly={isYearly}
        getCurrentPrice={getCurrentPrice}
        getYearlySavings={getYearlySavings}
      />

      <FAQSection faqs={faqs} openIndex={openFaq} onToggle={setOpenFaq} />

      <CTASection />

      <div className="bg-gray-800 text-white py-3 px-4 text-center text-sm">
        <a
          href="https://github.com/choycoy/amplitude-automation"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-300 hover:text-white underline"
        >
          View source on GitHub — amplitude-automation
        </a>
      </div>

      <Footer />

      <EventLogPanel
        events={eventLog}
        isOpen={panelOpen}
        onToggle={() => setPanelOpen((p) => !p)}
        flashId={flashId}
      />
    </div>
  );
};

export default PricingPage;
