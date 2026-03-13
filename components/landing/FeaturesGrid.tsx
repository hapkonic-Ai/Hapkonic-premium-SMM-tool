"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  BarChart3, Users, MessageSquare, TrendingUp, Shield, 
  Target, Globe, Layers, Zap, PenTool, Layout, Bell, 
  Cpu, HeartPulse, Wallet 
} from "lucide-react";

export const FeaturesGrid = () => {
  const features = [
    { icon: BarChart3, title: "Overview", desc: "A high-level view of your entire social media presence." },
    { icon: Layout, title: "Content Analysis", desc: "Deep dive into post performance and content strategy." },
    { icon: Users, title: "Audience Insights", desc: "Understand your demographics and growth trends." },
    { icon: MessageSquare, title: "Engagement", desc: "Track interactions and community health." },
    { icon: Target, title: "Competitors", desc: "Benchmarking against industry leaders." },
    { icon: HeartPulse, title: "Sentiment", desc: "AI-driven emotional analysis of mentions." },
    { icon: TrendingUp, title: "Campaigns", desc: "Manage and measure multi-platform campaigns." },
    { icon: Globe, title: "Influencers", desc: "Identify and track key opinion leaders." },
    { icon: Wallet, title: "Revenue", desc: "Conversion tracking and ROI measurement." },
    { icon: PenTool, title: "Scheduler", desc: "Advanced post planning and automation." },
    { icon: Layers, title: "Unified Inbox", desc: "All communications in one central place." },
    { icon: Bell, title: "Alerts", desc: "Real-time monitoring and smart notifications." },
    { icon: Cpu, title: "AI Insights", desc: "Predictive analytics and strategic recommendations." },
    { icon: Shield, title: "Brand Health", desc: "Aggregate score of your overall digital presence." },
    { icon: Zap, title: "Real-time", desc: "Live data synchronization across all channels." },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-left mb-16">
        <h2 className="text-xs font-bold tracking-[0.3em] text-accent-cyan uppercase mb-4 font-mono">
          Powerful Intelligence
        </h2>
        <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
          Everything you need to <br />
          <span className="text-text-secondary">master social media.</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <GlassCard variant="interactive" className="h-full border-white/5">
              <div className="w-12 h-12 rounded-xl glass bg-accent-cyan/10 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-accent-cyan" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-sm text-text-secondary font-light leading-relaxed">
                {feature.desc}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
