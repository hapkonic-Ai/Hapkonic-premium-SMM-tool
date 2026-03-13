"use client";

import { motion } from "framer-motion";
import { useAlerts } from "@/hooks/useAnalytics";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Bell, AlertTriangle, Lightbulb, Trophy, 
  Clock, ArrowRight, ShieldAlert, CheckCircle2 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AlertsPage() {
  const { data, isLoading } = useAlerts();

  const getIcon = (type: string) => {
    switch (type) {
      case "ANOMALY": return <ShieldAlert className="w-5 h-5 text-accent-pink" />;
      case "OPPORTUNITY": return <Lightbulb className="w-5 h-5 text-accent-cyan" />;
      case "MILESTONE": return <Trophy className="w-5 h-5 text-accent-green" />;
      default: return <Bell className="w-5 h-5 text-accent-purple" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "HIGH": return "border-accent-pink/20 bg-accent-pink/5";
      case "MEDIUM": return "border-accent-cyan/20 bg-accent-cyan/5";
      default: return "border-white/5 bg-white/5";
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Alerts & Intel</h1>
          <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Real-time anomalies and strategic triggers</p>
        </div>
        <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest h-9 hover:bg-white/5">
          <CheckCircle2 className="w-4 h-4 mr-2" /> Mark all as read
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <GlassCard key={i} className="h-32 border-white/5 animate-pulse" />
          ))
        ) : (
          data?.alerts.map((alert: any, i: number) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className={cn("p-6 flex items-start gap-6 group hover:translate-x-1 transition-all border-l-4", 
                getSeverityColor(alert.severity),
                alert.severity === "HIGH" ? "border-l-accent-pink" : "border-l-accent-cyan"
              )}>
                <div className="p-3 rounded-xl glass border-white/10 shrink-0">
                  {getIcon(alert.type)}
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-lg">{alert.title}</h3>
                      <span className={cn("text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-widest",
                        alert.severity === "HIGH" ? "border-accent-pink/30 text-accent-pink bg-accent-pink/10" : "border-accent-cyan/30 text-accent-cyan bg-accent-cyan/10"
                      )}>
                        {alert.severity} PRIORITY
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-text-muted text-[10px] font-bold uppercase tracking-widest">
                      <Clock className="w-3 h-3" />
                      {alert.date}
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-3xl">
                    {alert.description}
                  </p>
                  
                  <div className="pt-4 flex items-center gap-4">
                     <button className="text-[10px] font-black uppercase tracking-widest text-accent-cyan hover:text-white flex items-center gap-1.5 transition-colors">
                        Investigate Now <ArrowRight className="w-3 h-3" />
                     </button>
                     <button className="text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-white transition-colors">
                        Archive Alert
                     </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))
        )}
      </div>

      <GlassCard className="p-8 border-accent-purple/20 bg-accent-purple/5">
         <div className="flex items-start gap-6">
            <div className="p-4 rounded-2xl bg-accent-purple/10 border border-accent-purple/20">
               <AlertTriangle className="w-8 h-8 text-accent-purple" />
            </div>
            <div>
               <h2 className="text-xl font-bold text-white tracking-tight uppercase">Custom Thresholds</h2>
               <p className="text-sm text-text-muted mt-2 leading-relaxed">
                 Hapkonic AI monitors your metrics 24/7. You can configure custom triggers for engagement drops, competitor surges, or viral opportunities in your notification settings.
               </p>
               <Button variant="secondary" className="mt-6 h-10 text-[10px] uppercase font-black tracking-widest">
                  Configure Alerts Settings
               </Button>
            </div>
         </div>
      </GlassCard>
    </div>
  );
}
