"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

const phases = [
  {
    id: "01",
    title: "Foundation & Core UI",
    duration: "Weeks 1–4 · Design System + Landing Page + Auth",
    desc: "Establish the glassmorphic design system, 3D-enhanced landing page with scroll animations, authentication flows, and the base dashboard shell with responsive layout.",
    color: "var(--accent-cyan)",
    tasks: [
      {
        icon: "◎",
        title: "Design System & Tokens",
        desc: "Glassmorphic component library — glass cards, frosted panels, gradient borders, depth layers.",
        tags: ["Figma", "CSS Variables", "Storybook"]
      },
      {
        icon: "▲",
        title: "3D Landing Page",
        desc: "Three.js scene with floating geometric objects, GSAP scroll-triggered animations.",
        tags: ["Three.js", "GSAP", "WebGL"]
      },
      {
        icon: "⬡",
        title: "Auth & Onboarding",
        desc: "OAuth integration for social platforms, multi-step onboarding wizard.",
        tags: ["NextAuth", "OAuth 2.0", "JWT"]
      },
      {
        icon: "◧",
        title: "Dashboard Shell",
        desc: "Responsive sidebar nav, glass-panel layouts, widget grid system.",
        tags: ["Next.js 14", "Tailwind", "Framer Motion"]
      }
    ]
  },
  {
    id: "02",
    title: "Analytics Engine & Data Layer",
    duration: "Weeks 5–10 · API Integrations + Core Dashboards",
    desc: "Build the data pipeline connecting all social platforms, implement the Account Overview, Content Performance, Audience Analytics, and Engagement dashboards.",
    color: "var(--accent-purple)",
    tasks: [
      {
        icon: "⟐",
        title: "Multi-Platform API Layer",
        desc: "Unified data ingestion from Instagram, Facebook, LinkedIn, YouTube, X, TikTok — normalized schema.",
        tags: ["REST APIs", "GraphQL", "Redis"]
      },
      {
        icon: "📊",
        title: "Account Overview Dashboard",
        desc: "KPI cards with sparklines, platform comparison charts, follower growth timelines.",
        tags: ["Recharts", "D3.js", "WebSocket"]
      },
      {
        icon: "📈",
        title: "Content Performance Module",
        desc: "Post-level analytics with reach, impressions, CTR. Top/worst performer rankings.",
        tags: ["Data Grid", "Heatmap", "Filters"]
      },
      {
        icon: "👥",
        title: "Audience & Engagement",
        desc: "Demographics breakdown (age, gender, location, device), audience interest clusters.",
        tags: ["Geo Maps", "Clustering", "Segments"]
      }
    ]
  },
  {
    id: "03",
    title: "Intelligence & Competitive Layer",
    duration: "Weeks 11–16 · AI Insights + Sentiment + Competitor",
    desc: "Deploy the AI inference engine for predictive analytics, implement sentiment analysis on brand mentions, and build the competitor benchmarking suite.",
    color: "var(--accent-pink)",
    tasks: [
      {
        icon: "🧠",
        title: "AI Insights Engine",
        desc: "ML-powered best posting time predictor, virality probability scorer, content theme recommender.",
        tags: ["Python ML", "TensorFlow", "LLM API"]
      },
      {
        icon: "💬",
        title: "Sentiment Analysis",
        desc: "NLP-driven comment and mention analysis — positive/neutral/negative scoring.",
        tags: ["NLP", "BERT", "Real-time"]
      },
      {
        icon: "⚔️",
        title: "Competitor Analytics",
        desc: "Track competitor follower growth, engagement rates, top posts, share of voice.",
        tags: ["Benchmarking", "SOV", "Gap Analysis"]
      },
      {
        icon: "🔔",
        title: "Alerts & Monitoring",
        desc: "Real-time alert system — viral post detection, sudden follower drops, negative sentiment spikes.",
        tags: ["WebSocket", "Push Notify", "Thresholds"]
      }
    ]
  },
  {
    id: "04",
    title: "Campaign & Revenue Module",
    duration: "Weeks 17–22 · Campaigns + Influencer + Conversions",
    desc: "Build campaign performance tracking with ROI analysis, influencer collaboration analytics with authenticity scoring, and conversion/revenue tracking.",
    color: "var(--accent-orange)",
    tasks: [
      {
        icon: "🎯",
        title: "Campaign Performance Hub",
        desc: "Campaign-level reach, engagement, hashtag tracking, influencer contribution metrics.",
        tags: ["ROI Tracking", "Attribution", "UTMs"]
      },
      {
        icon: "🤝",
        title: "Influencer Analytics",
        desc: "Reach, audience overlap, authenticity scoring, fake follower detection.",
        tags: ["Scoring", "Detection", "Match AI"]
      },
      {
        icon: "💰",
        title: "Conversion & Revenue",
        desc: "Link click tracking, landing page conversion rates, leads generated, revenue from social traffic.",
        tags: ["GA4", "Shopify", "Pixel"]
      },
      {
        icon: "🏆",
        title: "Brand Health Score",
        desc: "Composite score from engagement, sentiment, growth, share of voice — radial gauge rendering.",
        tags: ["Composite", "Radial Chart", "Scoring"]
      }
    ]
  }
];

export const PhaseTimeline = () => {
  return (
    <section id="phases" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <span className="font-mono text-[10px] uppercase tracking-[4px] text-accent-cyan block mb-4">
          // Implementation Roadmap
        </span>
        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]">
          Multi-Phase<br />Build Plan
        </h2>
        <p className="text-text-secondary max-w-xl text-lg font-light">
          A structured approach to building Hapkonic's complete social media analytics ecosystem — from foundation to AI intelligence.
        </p>
      </motion.div>

      <div className="relative pl-8 md:pl-12 border-l border-white/5 space-y-24">
        {phases.map((phase, idx) => (
          <div key={phase.id} className="relative group/phase">
            {/* Timeline Dot */}
            <div 
              className="absolute -left-[41px] md:-left-[57px] top-2 w-4 h-4 rounded-full border-4 border-background z-10"
              style={{ backgroundColor: phase.color }}
            >
              <div 
                className="absolute inset-[-4px] rounded-full border border-current opacity-30 animate-ping"
                style={{ borderColor: phase.color }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[2px] font-bold mb-2 block" style={{ color: phase.color }}>
                  Phase {phase.id}
                </span>
                <h3 className="text-2xl md:text-4xl font-black mb-2 text-white">
                  {phase.title}
                </h3>
                <div className="font-mono text-[10px] text-text-muted mb-4 uppercase tracking-widest">
                  {phase.duration}
                </div>
                <p className="text-text-secondary text-sm md:text-base max-w-3xl leading-relaxed">
                  {phase.desc}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {phase.tasks.map((task, tIdx) => (
                  <GlassCard key={tIdx} className="p-6 border-white/5 hover:border-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4" style={{ backgroundColor: `${phase.color}10`, color: phase.color }}>
                      {task.icon}
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2">{task.title}</h4>
                    <p className="text-[11px] text-text-muted leading-relaxed mb-4">
                      {task.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {task.tags.map(tag => (
                        <span key={tag} className="text-[8px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
        
        {/* Connection Line with Gradient */}
        <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-green" />
      </div>
    </section>
  );
};
