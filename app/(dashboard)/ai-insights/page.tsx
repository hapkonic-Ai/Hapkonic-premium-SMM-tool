"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Cpu, Sparkles, BrainCircuit, Zap, 
  Lightbulb, TrendingUp, Target, MessageSquare,
  RefreshCw, ChevronRight, Wand2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AIInsightsPage() {
  const insights = [
    {
      title: "Content Strategy Optimization",
      category: "CONTENT",
      description: "Based on 30-day performance data, your audience engagement peaks between 6 PM and 9 PM EST. Reels with educational hooks are outperforming static posts by 142%.",
      impact: "HIGH",
      action: "Schedule 3 Reels/week in the 18:00 - 21:00 slot",
      icon: <Sparkles className="w-5 h-5 text-accent-cyan" />
    },
    {
      title: "Audience Sentiment Shift",
      category: "SENTIMENT",
      description: "We've detected a positive trend in comments related to your 'Sustainability' initiative. Sentiment volume for this topic has increased by 18% since last Monday.",
      impact: "MEDIUM",
      action: "Double down on eco-friendly content narratives",
      icon: <BrainCircuit className="w-5 h-5 text-accent-purple" />
    },
    {
      title: "Competitor Vulnerability",
      category: "COMPETITIVE",
      description: "Competitor B's engagement on LinkedIn has dipped following their recent UX change. There is an active conversation gap in professional workflow tools.",
      impact: "HIGH",
      action: "Deploy LinkedIn thought-leadership campaign",
      icon: <Target className="w-5 h-5 text-accent-pink" />
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase leading-none">Cognitive Insights</h1>
          <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">AI-driven predictive analytics & strategic modeling</p>
        </div>
        <Button className="h-11 px-6 text-[10px] uppercase font-black tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.3)]">
          <RefreshCw className="w-4 h-4 mr-2" /> REGENERATE ANALYSIS
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <GlassCard className="lg:col-span-3 p-8 border-white/5 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/10 blur-[100px] -mr-32 -mt-32 rounded-full transition-all group-hover:bg-accent-cyan/20" />
           
           <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <Wand2 className="w-8 h-8 text-accent-cyan" />
                 </div>
                 <div>
                    <h2 className="text-2xl font-black text-white tracking-tight uppercase">Executive AI Summary</h2>
                    <p className="text-sm text-text-muted font-bold uppercase tracking-widest">Global Brand Performance: <span className="text-accent-green">Outperforming</span></p>
                 </div>
              </div>

              <p className="text-lg text-text-secondary leading-relaxed font-medium">
                "Hapkonic AI has processed over 24,000 data points across your connected channels. The overall brand trajectory is <span className="text-white font-bold underline decoration-accent-cyan underline-offset-4">strongly bullish</span>. Your current bottleneck is LinkedIn conversion, while Instagram reach is at a 6-month high. We recommend a 20% shift in ad-spend towards video content to maintain this momentum."
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                 {[
                   { label: "Confidence", value: "92%", color: "text-accent-cyan" },
                   { label: "Data Quality", value: "High", color: "text-accent-green" },
                   { label: "Predictive Power", value: "A+", color: "text-accent-purple" },
                 ].map(stat => (
                   <div key={stat.label} className="p-4 rounded-xl glass border-white/5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-1">{stat.label}</div>
                      <div className={cn("text-xl font-black", stat.color)}>{stat.value}</div>
                   </div>
                 ))}
              </div>
           </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard className="p-6 border-accent-purple/20 bg-accent-purple/5 h-full flex flex-col justify-between">
             <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-accent-purple" />
                  <h3 className="font-bold text-white uppercase tracking-wider text-sm">Real-time Intel</h3>
               </div>
               <div className="space-y-3">
                  <p className="text-xs text-text-muted leading-relaxed">
                    AI detected a 400% surge in mentions of "Hapkonic" in the London region.
                  </p>
                  <Button variant="ghost" size="sm" className="w-full text-[9px] font-black uppercase tracking-widest h-8 border border-white/10">
                    OPEN REGIONAL MAP
                  </Button>
               </div>
             </div>
             <div className="mt-8 pt-8 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[2px] text-accent-purple">
                   <span>AI Engine</span>
                   <span>v4.2-Turbo</span>
                </div>
             </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
         <h3 className="text-[10px] font-black uppercase tracking-[4px] text-text-muted ml-2">Strategic Intelligence Deck</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {insights.map((insight, i) => (
             <motion.div
               key={insight.title}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1 }}
             >
               <GlassCard className="p-8 border-white/5 h-full flex flex-col gap-6 group hover:border-accent-cyan/30 transition-all duration-500">
                 <div className="flex justify-between items-start">
                    <div className="p-3 rounded-xl glass border-white/10 group-hover:bg-white/10 transition-colors">
                       {insight.icon}
                    </div>
                    <span className={cn("text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-[2px]", 
                      insight.impact === "HIGH" ? "border-accent-pink/30 text-accent-pink bg-accent-pink/10" : "border-accent-cyan/30 text-accent-cyan bg-accent-cyan/10"
                    )}>
                      {insight.impact} IMPACT
                    </span>
                 </div>

                 <div className="space-y-3">
                    <span className="text-[9px] font-black text-text-muted tracking-[3px] uppercase">{insight.category} Layer</span>
                    <h4 className="text-lg font-bold text-white tracking-tight">{insight.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                       {insight.description}
                    </p>
                 </div>

                 <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                    <div className="space-y-2">
                       <span className="text-[9px] font-black text-accent-cyan tracking-widest uppercase">Recommended Action</span>
                       <p className="text-xs text-white font-medium italic">"{insight.action}"</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full h-9 text-[10px] uppercase font-black tracking-widest group-hover:bg-accent-cyan group-hover:text-black transition-all">
                       EXECUTE STRATEGY <ChevronRight className="w-3 h-3 ml-2" />
                    </Button>
                 </div>
               </GlassCard>
             </motion.div>
           ))}
         </div>
      </div>
    </div>
  );
}
