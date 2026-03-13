"use client";

import { motion } from "framer-motion";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { DonutChart } from "@/components/charts/DonutChart";
import { useSentiment, useAlerts, useCompetitors } from "@/hooks/useAnalytics";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  BrainCircuit, ShieldAlert, Zap, 
  TrendingUp, MessageSquare, Target,
  Bell, ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function IntelligenceHubPage() {
  const { data: sentiment } = useSentiment();
  const { data: alerts } = useAlerts();
  const { data: competitors } = useCompetitors();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Intelligence Hub</h1>
        <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Unified AI Monitoring & Strategic Planning</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column - Main Insights */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartContainer title="Current Brand Perception" subtitle="Combined sentiment score" className="h-[300px]">
               <DonutChart 
                 data={sentiment?.sentimentStats || []} 
                 colors={["#10B981", "#F97316", "#EC4899"]}
                 valueFormatter={(v) => `${v}%`}
               />
            </ChartContainer>

            <ChartContainer title="Market Positioning" subtitle="Your share vs rivals" className="h-[300px]">
               <DonutChart 
                 data={competitors?.competitorShare || []} 
                 colors={["#00F0FF", "#A855F7", "#EC4899", "#10B981"]}
                 valueFormatter={(v) => `${v}%`}
               />
            </ChartContainer>
          </div>

          <ChartContainer title="Live Strategic Feed" subtitle="Real-time opportunities and threats">
            <div className="space-y-4">
               {alerts?.alerts.map((alert: any) => (
                 <div key={alert.id} className={cn(
                   "p-4 rounded-xl glass border-white/5 flex items-start gap-4 transition-all hover:bg-white/5",
                   alert.severity === "HIGH" ? "border-l-4 border-l-accent-pink" : "border-l-4 border-l-accent-cyan"
                 )}>
                    <div className={cn(
                      "p-2 rounded-lg",
                      alert.severity === "HIGH" ? "bg-accent-pink/10" : "bg-accent-cyan/10"
                    )}>
                       {alert.type === "ANOMALY" && <ShieldAlert className="w-5 h-5 text-accent-pink" />}
                       {alert.type === "OPPORTUNITY" && <Zap className="w-5 h-5 text-accent-cyan" />}
                       {alert.type === "MILESTONE" && <TrendingUp className="w-5 h-5 text-accent-green" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-white">{alert.title}</h4>
                        <span className="text-[10px] text-text-muted uppercase font-bold">{alert.date}</span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">{alert.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted mt-1" />
                 </div>
               ))}
            </div>
          </ChartContainer>
        </div>

        {/* Right Column - AI Recommendations */}
        <div className="lg:col-span-4 space-y-6">
          <AIInsightsPanel />
          
          <GlassCard className="bg-gradient-to-br from-accent-purple/10 to-transparent border-accent-purple/20">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-accent-purple" />
                <h4 className="text-sm font-bold text-white uppercase tracking-tight">Strategy Optimizer</h4>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Your content mix is currently heavy on static images. The AI predicts a 25% lift in engagement if you increase video frequency by 2 posts per week.
              </p>
              <div className="pt-4 border-t border-white/5">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-[10px] text-text-muted uppercase font-bold">Optimization Score</span>
                   <span className="text-xs font-black text-accent-purple">78%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-accent-purple w-[78%]" />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
