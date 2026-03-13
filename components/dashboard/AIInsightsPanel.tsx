"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Sparkles, TrendingUp, Lightbulb, 
  ArrowRight, CheckCircle2, Zap 
} from "lucide-react";
import { motion } from "framer-motion";

interface Insight {
  id: string;
  type: "STRATEGY" | "CONTENT" | "GROWTH";
  title: string;
  description: string;
  impact: "HIGH" | "MEDIUM" | "LOW";
}

const insights: Insight[] = [
  {
    id: "1",
    type: "CONTENT",
    title: "Video Dominance",
    description: "Reels are generating 4.2x more engagement than static images this week. Pivot strategy towards short-form video.",
    impact: "HIGH",
  },
  {
    id: "2",
    type: "STRATEGY",
    title: "Peak Visibility",
    description: "Your audience is most active Tuesdays at 6 PM. Schedule your 'Product Spotlight' for this window.",
    impact: "MEDIUM",
  },
  {
    id: "3",
    type: "GROWTH",
    title: "Competitor Gap",
    description: "Competitor A is outperforming on LinkedIn. Focus on 'Thought Leadership' posts twice a week.",
    impact: "HIGH",
  },
];

export const AIInsightsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent-cyan" />
          <h3 className="text-xl font-black text-white uppercase tracking-tight">AI Insights</h3>
        </div>
        <div className="flex items-center gap-1 glass px-2 py-1 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          <span className="text-[10px] font-bold text-accent-green uppercase tracking-widest">Live Engine</span>
        </div>
      </div>

      <div className="grid gap-4">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="group border-white/5 hover:border-accent-cyan/30 hover:bg-white/5 transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/20">
                   {insight.type === "CONTENT" && <Zap className="w-4 h-4 text-accent-cyan" />}
                   {insight.type === "STRATEGY" && <Lightbulb className="w-4 h-4 text-accent-purple" />}
                   {insight.type === "GROWTH" && <TrendingUp className="w-4 h-4 text-accent-green" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{insight.type}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      insight.impact === "HIGH" ? "text-accent-pink" : "text-text-muted"
                    }`}>{insight.impact} IMPACT</span>
                  </div>
                  <h4 className="text-sm font-bold text-white group-hover:text-accent-cyan transition-colors">{insight.title}</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">{insight.description}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <Button variant="outline" className="w-full border-white/5 bg-white/5 hover:bg-white/10 group">
        Full Strategic Audit
        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};
