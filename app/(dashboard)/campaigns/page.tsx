"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  Plus, Search, Filter, MoreHorizontal, 
  Calendar, Target, CreditCard, TrendingUp,
  Instagram, Facebook, Twitter, CheckCircle2,
  Clock, PauseCircle, CheckCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const statusIcons: any = {
  ACTIVE: <Clock className="w-3 h-3 mr-1" />,
  PLANNED: <Calendar className="w-3 h-3 mr-1" />,
  COMPLETED: <CheckCircle className="w-3 h-3 mr-1" />,
  PAUSED: <PauseCircle className="w-3 h-3 mr-1" />,
};

const statusVariants: any = {
  ACTIVE: "info",
  PLANNED: "planned",
  COMPLETED: "active",
  PAUSED: "pending",
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/campaigns")
      .then(res => res.json())
      .then(data => {
        setCampaigns(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Market Strategies</h1>
          <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Orchestrate and track multi-channel campaigns</p>
        </div>
        <Button className="h-12 px-6 text-xs font-black uppercase tracking-widest bg-accent-cyan text-black hover:bg-accent-cyan/80 shadow-[0_0_20px_rgba(0,255,242,0.3)]">
          <Plus className="w-4 h-4 mr-2" /> CREATE CAMPAIGN
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <GlassCard className="p-4 border-white/5 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent-cyan transition-colors" />
          <input 
            type="text" 
            placeholder="SEARCH CAMPAIGNS..." 
            className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-xs font-bold uppercase tracking-wider focus:outline-none focus:border-accent-cyan/50 focus:bg-white/10 transition-all placeholder:text-text-muted/50"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="h-11 border-white/10 bg-white/5 flex-1 md:flex-none uppercase text-[10px] tracking-widest font-bold">
            <Filter className="w-3.5 h-3.5 mr-2" /> FILTER
          </Button>
          <Button variant="outline" size="sm" className="h-11 border-white/10 bg-white/5 flex-1 md:flex-none uppercase text-[10px] tracking-widest font-bold">
            SORT BY: DATE
          </Button>
        </div>
      </GlassCard>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          [1,2,3].map(i => (
            <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse border border-white/10" />
          ))
        ) : (
          campaigns.map((campaign, i) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6 border-white/5 hover:border-accent-cyan/20 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-accent-cyan/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col lg:flex-row gap-8 items-start relative z-10">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                       <Badge variant={statusVariants[campaign.status]} className="font-black text-[9px] py-0.5 px-2">
                         {statusIcons[campaign.status]}{campaign.status}
                       </Badge>
                       <div className="flex -space-x-1.5">
                         {campaign.platforms.map((p: string) => (
                           <div key={p} className="p-1 rounded-full bg-black/40 border border-white/10 flex items-center justify-center">
                             {p === 'instagram' && <Instagram className="w-2.5 h-2.5 text-pink-500" />}
                             {p === 'facebook' && <Facebook className="w-2.5 h-2.5 text-blue-500" />}
                             {p === 'twitter' && <Twitter className="w-2.5 h-2.5 text-cyan-400" />}
                           </div>
                         ))}
                       </div>
                    </div>
                    <h3 className="text-xl font-black text-white tracking-tight truncate group-hover:text-accent-cyan transition-colors uppercase">{campaign.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-[10px] font-bold text-text-muted uppercase tracking-widest">
                       <div className="flex items-center gap-1.5">
                         <Calendar className="w-3 h-3" /> {campaign.startDate} — {campaign.endDate || 'Ongoing'}
                       </div>
                       <div className="flex items-center gap-1.5">
                         <Target className="w-3 h-3" /> {campaign.postCount} POSTS
                       </div>
                    </div>
                  </div>

                  <div className="w-full lg:w-72">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Budget Utilized</span>
                      <span className="text-xs font-black text-white">{campaign.spentPercentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: `${campaign.spentPercentage}%` }}
                         transition={{ duration: 1, ease: "easeOut" }}
                         className={cn(
                           "h-full rounded-full",
                           campaign.status === 'COMPLETED' ? "bg-accent-green" : "bg-accent-cyan shadow-[0_0_10px_rgba(0,255,242,0.5)]"
                         )}
                       />
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-bold text-text-muted tracking-widest">Spent</span>
                        <span className="text-sm font-black text-white">${campaign.spent.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col items-end text-right">
                        <span className="text-[9px] uppercase font-bold text-text-muted tracking-widest">Total Budget</span>
                        <span className="text-sm font-black text-text-secondary">${campaign.budget.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 lg:w-48">
                    <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-center">
                       <div className="flex items-center gap-2 mb-1">
                         <TrendingUp className="w-3 h-3 text-accent-cyan" />
                         <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Reach</span>
                       </div>
                       <span className="text-sm font-black text-white tracking-tighter">{(campaign.reach / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-center">
                       <div className="flex items-center gap-2 mb-1">
                         <HeartPulse className="w-3 h-3 text-accent-pink" />
                         <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">Eng. Rate</span>
                       </div>
                       <span className="text-sm font-black text-white tracking-tighter">{campaign.engagementRate}%</span>
                    </div>
                  </div>

                  <div className="flex items-center lg:ml-auto">
                    <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full hover:bg-accent-cyan/10 hover:text-accent-cyan">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))
        )}
      </div>

      <GlassCard className="p-8 border-accent-cyan/20 bg-accent-cyan/5 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-accent-cyan/10 to-transparent flex items-center justify-end pr-12 opacity-50 group-hover:opacity-100 transition-opacity">
            <CheckCircle2 className="w-32 h-32 text-accent-cyan blur-sm" />
         </div>
         <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl font-black text-white tracking-tight uppercase mb-4">Master Campaign Analytics</h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Track your brand's presence across the triple-threat social landscape. Our platform consolidates Instagram visual aesthetics, Twitter conversational depth, and Facebook demographic reach into a single unified performance vector.
            </p>
            <div className="flex flex-wrap gap-8">
               <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black tracking-[3px] text-accent-cyan mb-1 underline underline-offset-4">AVG REACH</span>
                  <span className="text-3xl font-black text-white tracking-tighter">2.4M</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black tracking-[3px] text-accent-purple mb-1 underline underline-offset-4">CAMPAIGN ROI</span>
                  <span className="text-3xl font-black text-white tracking-tighter">+124%</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black tracking-[3px] text-accent-pink mb-1 underline underline-offset-4">AD CONVERSION</span>
                  <span className="text-3xl font-black text-white tracking-tighter">18.2%</span>
               </div>
            </div>
         </div>
      </GlassCard>
    </div>
  );
}

const HeartPulse = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
  </svg>
);
