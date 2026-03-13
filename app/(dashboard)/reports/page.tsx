"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  Plus, FileText, Download, Share2, 
  BarChart3, PieChart, Users, MessageSquare,
  Search, Filter, MoreVertical, Loader2, Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const reportIcons: any = {
  EXECUTIVE: <BarChart3 className="w-5 h-5 text-accent-cyan" />,
  SENTIMENT: <MessageSquare className="w-5 h-5 text-accent-pink" />,
  COMPETITIVE: <Users className="w-5 h-5 text-accent-purple" />,
};

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reports")
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Intelligence Archives</h1>
          <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Generate and manage presentation-ready insights</p>
        </div>
        <Button className="h-12 px-6 text-xs font-black uppercase tracking-widest bg-accent-cyan text-black hover:bg-accent-cyan/80 shadow-[0_0_20px_rgba(0,255,242,0.3)]">
          <Plus className="w-4 h-4 mr-2" /> CREATE NEW REPORT
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
           <h3 className="text-[10px] font-black uppercase tracking-[5px] text-white">Rapid Templates</h3>
           <div className="grid grid-cols-1 gap-4">
              {[
                { name: "Executive Summary", desc: "Highest-level KPI performance review", icon: BarChart3, color: "text-accent-cyan bg-accent-cyan/10" },
                { name: "Audience Deep Dive", desc: "Detailed demographics and geographics", icon: Users, color: "text-accent-purple bg-accent-purple/10" },
                { name: "Sentiment Analysis", desc: "Brand health and reputation tracking", icon: MessageSquare, color: "text-accent-pink bg-accent-pink/10" }
              ].map((template) => (
                <motion.div key={template.name} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <GlassCard className="p-5 border-white/5 cursor-pointer hover:border-white/20 transition-all flex items-start gap-4">
                     <div className={cn("p-3 rounded-2xl shrink-0", template.color)}>
                        <template.icon className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="text-sm font-black text-white uppercase tracking-tight">{template.name}</h4>
                        <p className="text-[10px] text-text-muted mt-1 uppercase font-bold tracking-wider">{template.desc}</p>
                     </div>
                  </GlassCard>
                </motion.div>
              ))}
           </div>

           <GlassCard className="p-6 border-accent-purple/20 bg-accent-purple/5">
              <div className="flex items-center gap-3 mb-4">
                 <Sparkles className="w-5 h-5 text-accent-purple" />
                 <h4 className="text-[10px] font-black uppercase tracking-[3px] text-white">AI Automation</h4>
              </div>
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                 Schedule weekly automated reports to be sent directly to your stakeholders.
              </p>
              <Button variant="outline" size="sm" className="w-full h-10 text-[9px] font-black uppercase tracking-widest border-accent-purple/30 text-accent-purple">
                 CONFIGURE SCHEDULE
              </Button>
           </GlassCard>
        </div>

        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black uppercase tracking-[5px] text-white">Recent Archive</h3>
              <div className="flex gap-2">
                 <Button variant="ghost" size="sm" className="w-8 h-8 p-0"><Search className="w-4 h-4 text-text-muted" /></Button>
                 <Button variant="ghost" size="sm" className="w-8 h-8 p-0"><Filter className="w-4 h-4 text-text-muted" /></Button>
              </div>
           </div>

           <div className="space-y-4">
              {isLoading ? (
                 [1,2,3].map(i => <div key={i} className="h-24 bg-white/5 animate-pulse rounded-2xl border border-white/5" />)
              ) : (
                reports.map((report, i) => (
                  <motion.div
                    key={report.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <GlassCard className="p-5 border-white/5 group hover:border-white/20 transition-all">
                       <div className="flex items-center gap-6">
                          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                             {reportIcons[report.type]}
                          </div>
                          <div className="flex-1 min-w-0">
                             <h4 className="text-md font-black text-white uppercase tracking-tight truncate">{report.name}</h4>
                             <div className="flex items-center gap-4 mt-1">
                                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">
                                   {format(new Date(report.createdAt), "MMM dd, yyyy")}
                                </span>
                                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">•</span>
                                <span className="text-[9px] font-bold text-text-muted uppercase tracking-widest">{report.fileSize}</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-3">
                             {report.status === 'READY' ? (
                                <>
                                  <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full hover:bg-white/10">
                                     <Download className="w-5 h-5 text-accent-cyan" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full hover:bg-white/10">
                                     <Share2 className="w-5 h-5 text-accent-purple" />
                                  </Button>
                                </>
                             ) : (
                               <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-accent-orange/10 border border-accent-orange/20">
                                  <Loader2 className="w-4 h-4 text-accent-orange animate-spin" />
                                  <span className="text-[9px] font-black text-accent-orange uppercase tracking-[2px]">ORCHESTRATING...</span>
                               </div>
                             )}
                             <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full hover:bg-white/10">
                                <MoreVertical className="w-5 h-5 text-text-muted" />
                             </Button>
                          </div>
                       </div>
                    </GlassCard>
                  </motion.div>
                ))
              )}
           </div>
        </div>
      </div>

      <GlassCard className="p-12 border-accent-cyan/20 bg-accent-cyan/5 relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-cyan/10 to-transparent flex items-center justify-end pr-24 opacity-30 group-hover:opacity-100 transition-opacity">
            <FileText className="w-64 h-64 text-accent-cyan blur-sm rotate-12" />
         </div>
         <div className="max-w-2xl relative z-10">
            <h2 className="text-3xl font-black text-white tracking-widest uppercase mb-4">Precision Analytics Export</h2>
            <p className="text-text-secondary leading-relaxed mb-8">
               Our reports are designed for the modern executive. High-density data visualization, combined with AI-driven narrative summaries, ensures your stakeholders clear oversight of the Hapkonic growth engine.
            </p>
            <div className="flex gap-4">
               <Button className="h-12 px-8 bg-accent-cyan text-black font-black uppercase text-xs tracking-[3px] shadow-[0_0_30px_rgba(0,255,242,0.4)] hover:scale-105 active:scale-95 transition-all">
                  PREVIEW SAMPLES
               </Button>
               <Button variant="outline" className="h-12 px-8 border-white/10 bg-white/5 text-white font-black uppercase text-xs tracking-[3px]">
                  VIEW VIDEO GUIDE
               </Button>
            </div>
         </div>
      </GlassCard>
    </div>
  );
}
