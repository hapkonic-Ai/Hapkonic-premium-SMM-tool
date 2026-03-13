"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { Button } from "@/components/ui/Button";
import { AreaChart } from "@/components/charts/AreaChart";
import { 
  ShieldCheck, HeartPulse, ShieldAlert,
  Search, Shield, AlertCircle, Info, Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BrandHealthPage() {
  const brandMetrics = [
    { label: "Trust Score", value: 94, sub: "+2.4%", color: "text-accent-cyan" },
    { label: "Mention Volume", value: "1.2K", sub: "+12%", color: "text-accent-purple" },
    { label: "Sentiment Index", value: 82, sub: "-1.2%", color: "text-accent-pink" },
    { label: "Brand Equity", value: "A+", sub: "Stable", color: "text-accent-green" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Brand Health Index</h1>
        <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Comprehensive monitoring of brand perception and trust</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {brandMetrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="p-6 border-white/5">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{m.label}</span>
                <span className={cn("text-[10px] font-black", m.sub.startsWith("+") ? "text-accent-green" : "text-accent-pink")}>
                   {m.sub}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className={cn("text-3xl font-black tracking-tighter text-white")}>{m.value}</span>
                {typeof m.value === 'number' && <span className="text-xs text-text-muted font-bold">/100</span>}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartContainer title="Sentiment Trajectory" subtitle="Net brand perception over 90 days" className="lg:col-span-2">
          <AreaChart 
            data={[
              { date: "Jan", positive: 65, negative: 12, neutral: 23 },
              { date: "Feb", positive: 72, negative: 10, neutral: 18 },
              { date: "Mar", positive: 82, negative: 8, neutral: 10 },
            ]} 
            index="date" 
            categories={["positive", "neutral", "negative"]} 
            colors={["#10B981", "#A855F7", "#EC4899"]}
            stacked
          />
        </ChartContainer>

        <div className="space-y-6">
          <GlassCard className="p-6 border-accent-cyan/20 bg-accent-cyan/5">
             <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-6 h-6 text-accent-cyan" />
                <h3 className="font-bold text-white text-lg tracking-tight">System Integrity</h3>
             </div>
             <div className="space-y-4">
                {[
                  { label: "IP Protection", status: "Active", color: "text-accent-green" },
                  { label: "Impersonation Monitoring", status: "Enabled", color: "text-accent-green" },
                  { label: "Domain Safety", status: "Secure", color: "text-accent-green" },
                  { label: "Social Hijack Guard", status: "Warning", color: "text-accent-pink" },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 text-[10px] uppercase font-bold tracking-widest">
                    <span className="text-text-muted">{item.label}</span>
                    <span className={item.color}>{item.status}</span>
                  </div>
                ))}
             </div>
          </GlassCard>

          <GlassCard className="p-6 border-white/5">
             <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-[2px]">Crisis Probability</h3>
             <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "12%" }}
                  className="h-full bg-accent-cyan rounded-full"
                />
             </div>
             <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                <span className="text-accent-cyan">Low Risk</span>
                <span className="text-text-muted">12/100</span>
             </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-8 border-white/5">
           <div className="flex items-center gap-4 mb-8">
              <Search className="w-6 h-6 text-accent-purple" />
              <h3 className="text-xl font-black gradient-text uppercase tracking-tight">Public Perception Keywords</h3>
           </div>
           <div className="flex flex-wrap gap-2">
             {[
               { tag: "Innovative", size: "text-lg", op: "opacity-100" },
               { tag: "Reliable", size: "text-base", op: "opacity-80" },
               { tag: "Premium", size: "text-xl", op: "opacity-100" },
               { tag: "Complex", size: "text-xs", op: "opacity-40" },
               { tag: "Fast", size: "text-sm", op: "opacity-60" },
               { tag: "Quality", size: "text-lg", op: "opacity-90" },
               { tag: "Expensive", size: "text-sm", op: "opacity-50" },
             ].map(t => (
               <span key={t.tag} className={cn("font-bold text-white px-3 py-1 bg-white/5 rounded-lg border border-white/5", t.size, t.op)}>
                 {t.tag}
               </span>
             ))}
           </div>
        </GlassCard>

        <GlassCard className="p-8 border-accent-pink/20 bg-accent-pink/5">
           <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent-pink/10 border border-accent-pink/20">
                 <ShieldAlert className="w-6 h-6 text-accent-pink" />
              </div>
              <div>
                 <h3 className="text-lg font-bold text-white tracking-tight">Active Brand Threats</h3>
                 <p className="text-sm text-text-muted mt-1 leading-relaxed">
                   Detected 2 suspicious accounts attempting to impersonate your brand on Twitter and Instagram. Our AI has flagged them for manual review.
                 </p>
                 <div className="mt-6 flex gap-3">
                    <Button variant="danger" size="sm" className="h-9 text-[10px] uppercase font-black">
                       REVIEW THREATS
                    </Button>
                    <Button variant="ghost" size="sm" className="h-9 text-[10px] uppercase font-black border border-white/10">
                       WHITELIST DOMAINS
                    </Button>
                 </div>
              </div>
           </div>
        </GlassCard>
      </div>
    </div>
  );
}
