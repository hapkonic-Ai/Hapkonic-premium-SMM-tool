"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  Plus, Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight,
  Instagram, Facebook, Twitter, Image as ImageIcon, Video, 
  FileText, Layers, MoreVertical, Eye, Trash2, Send,
  Filter, Sparkles
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns";

const platformIcons: any = {
  instagram: <Instagram className="w-4 h-4 text-pink-500" />,
  facebook: <Facebook className="w-4 h-4 text-blue-500" />,
  twitter: <Twitter className="w-4 h-4 text-cyan-400" />,
};

export default function SchedulerPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetch("/api/posts/scheduler")
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setIsLoading(false);
      });
  }, []);

  const weekStart = startOfWeek(currentDate);
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Content Orchestrator</h1>
          <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Synchronize your brand's digital narrative</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 border-white/10 bg-white/5 uppercase text-xs font-black tracking-widest text-white px-6">
             <CalendarIcon className="w-4 h-4 mr-2" /> MONTH VIEW
          </Button>
          <Button className="h-12 px-6 text-xs font-black uppercase tracking-widest bg-accent-purple text-white hover:bg-accent-purple/80 shadow-[0_0_20px_rgba(147,51,234,0.3)]">
            <Plus className="w-4 h-4 mr-2" /> NEW DRAFT
          </Button>
        </div>
      </div>

      <GlassCard className="p-4 border-white/5 flex flex-col md:flex-row gap-6 items-center justify-between">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
               <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-xl hover:bg-white/10" onClick={() => setCurrentDate(addDays(currentDate, -7))}>
                  <ChevronLeft className="w-5 h-5 text-white" />
               </Button>
               <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-xl hover:bg-white/10" onClick={() => setCurrentDate(addDays(currentDate, 7))}>
                  <ChevronRight className="w-5 h-5 text-white" />
               </Button>
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight w-48 text-center">
               {format(currentDate, "MMMM yyyy")}
            </h2>
         </div>
         
         <div className="flex gap-4 items-center">
            <div className="flex -space-x-2">
               {['instagram', 'facebook', 'twitter'].map(p => (
                 <div key={p} className="w-8 h-8 rounded-full border border-white/10 bg-black/40 flex items-center justify-center p-1.5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 cursor-pointer transition-all">
                    {platformIcons[p]}
                 </div>
               ))}
            </div>
            <div className="w-px h-6 bg-white/10 mx-2" />
            <Button variant="outline" size="sm" className="h-10 border-white/10 bg-white/5 uppercase text-[10px] tracking-widest font-black">
               <Filter className="w-3.5 h-3.5 mr-2" /> ALL CHANNELS
            </Button>
         </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        {weekDays.map((day, i) => {
          const dayPosts = posts.filter(p => isSameDay(new Date(p.scheduledAt), day));
          const isToday = isSameDay(day, new Date());

          return (
            <div key={day.toString()} className="flex flex-col gap-4">
              <div className={cn(
                "p-3 rounded-2xl flex flex-col items-center justify-center border transition-all",
                isToday ? "bg-accent-cyan/10 border-accent-cyan/30" : "bg-white/5 border-white/5"
              )}>
                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{format(day, "EEE")}</span>
                <span className={cn(
                  "text-lg font-black mt-1",
                  isToday ? "text-accent-cyan" : "text-white"
                )}>{format(day, "d")}</span>
              </div>

              <div className="flex flex-col gap-3 min-h-[300px]">
                {dayPosts.map((post, pi) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i + pi) * 0.05 }}
                  >
                    <GlassCard className="p-3 border-white/5 hover:border-white/20 cursor-pointer group relative overflow-hidden">
                       <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1.5">
                             {platformIcons[post.platform]}
                             <span className="text-[8px] font-black text-text-muted uppercase tracking-tighter">
                                {format(new Date(post.scheduledAt), "HH:mm")}
                             </span>
                          </div>
                          <MoreVertical className="w-3 h-3 text-text-muted group-hover:text-white transition-colors" />
                       </div>
                       
                       {post.mediaUrl && (
                         <div className="aspect-square rounded-lg overflow-hidden mb-3 border border-white/10">
                            <img src={post.mediaUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                         </div>
                       )}

                       <p className="text-[10px] text-text-secondary leading-tight line-clamp-2 mb-3">
                          {post.content}
                       </p>

                       <Badge variant={post.status === 'PUBLISHED' ? 'active' : 'default'} className="text-[8px] px-1.5 py-0">
                          {post.status}
                       </Badge>

                       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full bg-white/10 hover:bg-accent-cyan hover:text-black">
                            <Eye className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full bg-white/10 hover:bg-accent-purple hover:text-white">
                            <Plus className="w-3.5 h-3.5" />
                          </Button>
                       </div>
                    </GlassCard>
                  </motion.div>
                ))}
                
                <button className="flex-1 rounded-2xl border border-dashed border-white/10 hover:border-white/20 hover:bg-white/5 flex items-center justify-center transition-all group py-8">
                   <Plus className="w-6 h-6 text-white/10 group-hover:text-accent-cyan transition-colors" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <GlassCard className="p-6 border-accent-purple/20 bg-accent-purple/5">
         <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="p-4 rounded-3xl bg-accent-purple/10 border border-accent-purple/20 animate-pulse">
               <Sparkles className="w-10 h-10 text-accent-purple" />
            </div>
            <div className="flex-1">
               <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Omni-Channel Optimization</h3>
               <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
                 Your content pipeline is currently optimized for <span className="text-accent-cyan font-black italic">Peak Engagement (Tues-Thurs)</span>. AI suggests shifting visual assets to Instagram Saturday morning for targeted B2C demographic reach.
               </p>
            </div>
            <Button className="h-11 px-8 text-[10px] font-black uppercase tracking-widest bg-white/5 border border-accent-purple/30 text-accent-purple hover:bg-accent-purple/10">
               OPTIMIZE QUEUE
            </Button>
         </div>
      </GlassCard>
    </div>
  );
}
