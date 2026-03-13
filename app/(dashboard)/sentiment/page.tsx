"use client";

import { motion } from "framer-motion";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { DonutChart } from "@/components/charts/DonutChart";
import { AreaChart } from "@/components/charts/AreaChart";
import { useSentiment } from "@/hooks/useAnalytics";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Smile, Meh, Frown, MessageSquare, 
  Instagram, Facebook, Twitter, Linkedin, AlertTriangle
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SentimentPage() {
  const { data, isLoading } = useSentiment();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Sentiment Analysis</h1>
        <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Monitor brand perception and community health</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartContainer title="Sentiment Breakdown" subtitle="Overall perception across platforms" isLoading={isLoading}>
          <DonutChart 
            data={data?.sentimentStats || []} 
            colors={["#10B981", "#F97316", "#EC4899"]}
            valueFormatter={(v) => `${v}%`}
          />
        </ChartContainer>

        <ChartContainer title="Sentiment Timeline" subtitle="How brand perception fluctuates daily" className="lg:col-span-2" isLoading={isLoading}>
          <AreaChart 
            data={data?.timeline || []} 
            index="date" 
            categories={["positive", "neutral", "negative"]} 
            colors={["#10B981", "#F97316", "#EC4899"]}
            stacked
          />
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Social Mentions" subtitle="Recent conversations about your brand" isLoading={isLoading}>
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {data?.mentions.map((mention: any) => (
              <div key={mention.id} className="p-4 rounded-xl glass border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold font-mono">
                      {mention.user[0].toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">@{mention.user}</h4>
                      <p className="text-[10px] text-text-muted">{mention.date} via {mention.platform}</p>
                    </div>
                  </div>
                  <div className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                    mention.sentiment === "POSITIVE" ? "bg-accent-green/10 text-accent-green" : "bg-accent-pink/10 text-accent-pink"
                  )}>
                    {mention.sentiment}
                  </div>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed italic">"{mention.text}"</p>
              </div>
            ))}
          </div>
        </ChartContainer>

        <div className="space-y-6">
          <GlassCard className="border-accent-pink/20 bg-accent-pink/5">
             <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent-pink/10 border border-accent-pink/20">
                  <AlertTriangle className="w-6 h-6 text-accent-pink" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Anomalous Activity</h3>
                  <p className="text-sm text-text-muted mt-1 leading-relaxed">
                    We detected a 15% increase in negative mentions on LinkedIn compared to last week. Most mentions relate to "API connection issues".
                  </p>
                </div>
             </div>
          </GlassCard>

          <ChartContainer title="Key Sentiment Drivers" subtitle="Keywords driving current sentiment">
            <div className="flex flex-wrap gap-2 py-4">
              {[
                { word: "Mind-blowing", energy: 95, color: "text-accent-cyan" },
                { word: "Mind-blowing", energy: 95, color: "text-accent-cyan" },
                { word: "UX design", energy: 82, color: "text-accent-purple" },
                { word: "Analytics", energy: 75, color: "text-accent-green" },
                { word: "Reports", energy: 60, color: "text-white" },
                { word: "Timeout", energy: 45, color: "text-accent-pink" },
                { word: "API", energy: 40, color: "text-accent-pink" },
              ].map((tag, i) => (
                <div key={i} className={cn(
                  "px-4 py-2 rounded-lg glass-border bg-white/5 text-xs font-bold transition-all hover:scale-105 cursor-default",
                  tag.color
                )}>
                  {tag.word}
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
