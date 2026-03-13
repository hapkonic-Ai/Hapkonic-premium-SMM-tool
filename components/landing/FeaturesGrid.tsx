"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

const features = [
  {
    icon: "📊",
    title: "Account Overview",
    desc: "Cross-platform summary with follower growth, reach, engagement rate, and KPI vs target tracking.",
    color: "var(--accent-cyan)"
  },
  {
    icon: "📈",
    title: "Content Performance",
    desc: "Post-level analytics, format comparisons, hashtag heat maps, and AI-ranked performance scoring.",
    color: "var(--accent-purple)"
  },
  {
    icon: "👥",
    title: "Audience Analytics",
    desc: "Demographics, interests, device usage, active hours, and loyal vs casual viewer segmentation.",
    color: "var(--accent-pink)"
  },
  {
    icon: "💬",
    title: "Engagement Analytics",
    desc: "Conversation rates with segment-level breakdowns, trend analysis, and story interaction tracking.",
    color: "var(--accent-orange)"
  },
  {
    icon: "⚔️",
    title: "Competitor Analytics",
    desc: "Follower growth benchmarking, engagement comparisons, and comparative glass-panel charts.",
    color: "var(--accent-green)"
  },
  {
    icon: "🧠",
    title: "Sentiment Analysis",
    desc: "NLP-powered scoring on all mentions, crisis detection, and brand perception dashboards.",
    color: "var(--accent-cyan)"
  },
  {
    icon: "🎯",
    title: "Campaign Tracking",
    desc: "ROI tracking, cost-per-engagement, cost-per-lead, and influencer contribution attribution.",
    color: "var(--accent-purple)"
  },
  {
    icon: "🤝",
    title: "Influencer Analytics",
    desc: "Reach, audience overlap, authenticity scoring, and fake follower detection metrics.",
    color: "var(--accent-pink)"
  },
  {
    icon: "💰",
    title: "Revenue Tracking",
    desc: "Link clicks, landing page conversions, and leads generated — integrated with GA4 & Shopify.",
    color: "var(--accent-orange)"
  },
  {
    icon: "📅",
    title: "Scheduling & Automation",
    desc: "Visual calendar, bulk publish, AI captions, smart hashtags, and unified inbox.",
    color: "var(--accent-green)"
  },
  {
    icon: "🔔",
    title: "Alerts & Monitoring",
    desc: "Real-time alerts for viral posts, follower drops, sentiment spikes, and brand mentions.",
    color: "var(--accent-cyan)"
  },
  {
    icon: "✨",
    title: "AI Inference Layer",
    desc: "Predictive analytics — virality scoring, audience churn prediction, and optimal timing.",
    color: "var(--accent-purple)"
  },
  {
    icon: "📄",
    title: "Custom Reporting",
    desc: "Automated PDF/PPTX reports, email scheduling, and branded client dashboards.",
    color: "var(--accent-pink)"
  },
  {
    icon: "🔗",
    title: "Multi-Platform Hub",
    desc: "Unified integration with Instagram, Facebook, LinkedIn, YouTube, X, and TikTok.",
    color: "var(--accent-orange)"
  },
  {
    icon: "🏆",
    title: "Brand Health Score",
    desc: "Composite score from engagement, sentiment, growth, and share of voice.",
    color: "var(--accent-green)"
  }
];

export const FeaturesGrid = () => {
  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="font-mono text-[10px] uppercase tracking-[4px] text-accent-cyan block mb-4">
          // Platform Capabilities
        </span>
        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]">
          15 Core<br />Modules
        </h2>
        <p className="text-text-secondary max-w-xl text-lg font-light">
          Every module maps to a professional-grade analytics capability — built with glassmorphic UI, real-time data, and AI-powered insights.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <GlassCard key={i} className="p-8 border-white/5 hover:border-white/10 transition-all group overflow-hidden">
             <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-white/[0.01] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 relative z-10" style={{ backgroundColor: `${feature.color}10`, color: feature.color }}>
              {feature.icon}
            </div>
            
            <h3 className="text-lg font-bold text-white mb-3 tracking-tight relative z-10">{feature.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed font-light relative z-10">
              {feature.desc}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
};
