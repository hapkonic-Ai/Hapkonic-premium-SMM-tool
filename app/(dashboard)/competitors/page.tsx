"use client";

import { motion } from "framer-motion";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { DonutChart } from "@/components/charts/DonutChart";
import { BarChart } from "@/components/charts/BarChart";
import { useCompetitors } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  Trophy, TrendingUp, Users, Target, 
  ExternalLink, Zap, ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CompetitorsPage() {

  const { data, isLoading } = useCompetitors();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Competitor Intelligence</h1>
          <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Benchmarking and strategic market positioning</p>
        </div>
        <div className="flex items-center gap-2 max-w-md w-full">
           <div className="relative flex-1">
             <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
             <input 
               type="text" 
               placeholder="Add competitor handle (e.g. @nike)..." 
               className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-accent-cyan/50"
             />
           </div>
           <Button className="h-11 px-6 uppercase font-black tracking-widest text-[10px]">
              Track Handle
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartContainer title="Market Share" subtitle="Audience share vs key competitors" isLoading={isLoading}>
          <DonutChart 
            data={data?.competitorShare || []} 
            colors={["#00F0FF", "#A855F7", "#EC4899", "#10B981"]}
            valueFormatter={(v) => `${v}%`}
          />
        </ChartContainer>

        <ChartContainer title="Strategic Benchmarking" subtitle="Your performance vs market average" className="lg:col-span-2" isLoading={isLoading}>
          <BarChart 
            data={data?.metrics || []} 
            index="metric" 
            categories={["you", "avg", "best"]} 
            colors={["#00F0FF", "#A855F7", "rgba(255,255,255,0.1)"]}
          />
        </ChartContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Competitor Viral Content" subtitle="Top performing posts from tracked accounts" isLoading={isLoading}>
          <div className="space-y-4">
            {data?.topPosts.map((post: any) => (
              <div key={post.id} className="p-4 rounded-xl glass border-white/5 space-y-3 group hover:bg-white/5 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase text-accent-cyan tracking-widest">{post.competitor}</span>
                    <span className="text-[10px] text-text-muted">{post.platform}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs text-white leading-relaxed">{post.text}</p>
                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-text-muted uppercase font-bold">Engagement Rate</span>
                  <span className="text-sm font-black text-accent-cyan">{post.engagement}</span>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        <div className="space-y-6">
          <GlassCard className="border-accent-cyan/20 bg-accent-cyan/5">
             <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20">
                  <Zap className="w-6 h-6 text-accent-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">AI Opportunity Alert</h3>
                  <p className="text-sm text-text-muted mt-1 leading-relaxed">
                    Competitor A is getting high engagement on "Behind the Scenes" reels. You currently have 0 posts in this category. Consider creating similar content to bridge the gap.
                  </p>
                </div>
             </div>
          </GlassCard>

          <ChartContainer title="Sentiment Comparison" subtitle="How users perceive you vs rivals">
            <div className="space-y-6 py-2">
               {[
                 { brand: "Your Brand", score: 85, color: "bg-accent-cyan" },
                 { brand: "Competitor A", score: 72, color: "bg-accent-purple" },
                 { brand: "Competitor B", score: 64, color: "bg-white/20" },
               ].map((brand) => (
                 <div key={brand.brand} className="space-y-2">
                   <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest">
                     <span className="text-white">{brand.brand}</span>
                     <span className="text-text-muted">{brand.score}/100</span>
                   </div>
                   <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${brand.score}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={cn("h-full rounded-full", brand.color)}
                      />
                   </div>
                 </div>
               ))}
            </div>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
