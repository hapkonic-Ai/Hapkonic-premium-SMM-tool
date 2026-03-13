"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

const strategies = [
  {
    icon: "🎯",
    title: "Target Market",
    desc: "Mid-to-enterprise brands, marketing agencies, D2C brands scaling beyond 100K followers, and influencer management companies."
  },
  {
    icon: "💎",
    title: "Pricing Tiers",
    desc: "Starter ($49/mo), Professional ($149/mo — AI included), Enterprise (Custom — white-label + API access + dedicated support)."
  },
  {
    icon: "🚀",
    title: "Launch Strategy",
    desc: "Beta with agency partners → Product Hunt launch → Content flywheel → Agency partnerships → Phase 4 Enterprise sales."
  },
  {
    icon: "📣",
    title: "Marketing Channels",
    desc: "LinkedIn leadership, YouTube tutorials, SEO targeting 'social analytics', and agency referral program (20% commission)."
  },
  {
    icon: "🏅",
    title: "Competitive Edge",
    desc: "AI-first predictive analytics, superior glassmorphic UI, real-time alerts, and integrated strategic recommendations."
  },
  {
    icon: "📐",
    title: "Success Metrics",
    desc: "Year 1: 500 customers ($50K MRR). Year 2: 2,000 customers. Year 3: Series A and international expansion."
  }
];

export const StrategyGrid = () => {
  return (
    <section id="strategy" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="font-mono text-[10px] uppercase tracking-[4px] text-accent-cyan block mb-4">
          // Business & Marketing Strategy
        </span>
        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]">
          Go-to-Market<br />Strategy
        </h2>
        <p className="text-text-secondary max-w-xl text-lg font-light">
          Hapkonic's positioning, revenue model, and marketing playbook for capturing the premium social analytics market.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((s, i) => (
          <GlassCard key={i} className="p-8 border-white/5 hover:border-white/10 transition-all group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 pointer-events-none select-none">{s.icon}</div>
            <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{s.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed font-light">
              {s.desc}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
