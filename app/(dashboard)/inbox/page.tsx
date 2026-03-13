"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  Search, Filter, Inbox, Send, 
  MoreHorizontal, Instagram, Facebook, Twitter,
  MessageSquare, User2, Trash2, Check,
  Sparkles, CornerUpLeft, ThumbsUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

export default function InboxPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/inbox")
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        if (data.length > 0) setSelectedId(data[0].id);
        setIsLoading(false);
      });
  }, []);

  const selectedMessage = messages.find(m => m.id === selectedId);

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Unified Stream</h1>
          <p className="text-text-muted text-[10px] uppercase tracking-[3px] font-black">Consolidated Omnichannel Communication</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white/5 border-white/5 uppercase text-[10px] font-black tracking-widest">
               <Sparkles className="w-3 h-3 mr-2" /> AI PRIORITY
            </Button>
            <Button variant="outline" size="sm" className="bg-white/5 border-white/5 uppercase text-[10px] font-black tracking-widest">
               <Check className="w-3 h-3 mr-2" /> MARK ALL READ
            </Button>
        </div>
      </div>

      {/* Main Inbox Interface */}
      <GlassCard className="flex-1 border-white/5 overflow-hidden flex flex-col md:flex-row p-0">
        
        {/* Sidebar: Message List */}
        <div className="w-full md:w-96 border-r border-white/5 flex flex-col">
          <div className="p-4 border-b border-white/5">
            <div className="relative group">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-muted group-focus-within:text-accent-cyan transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search communications..." 
                 className="w-full h-9 bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 text-[10px] font-bold uppercase tracking-wider focus:outline-none focus:border-accent-cyan/50 transition-all"
               />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {messages.map((message) => (
              <button
                key={message.id}
                onClick={() => setSelectedId(message.id)}
                className={cn(
                  "w-full p-4 flex gap-4 text-left transition-all border-b border-white/5 relative group",
                  selectedId === message.id ? "bg-accent-cyan/10" : "hover:bg-white/5"
                )}
              >
                {selectedId === message.id && (
                  <motion.div 
                    layoutId="active-msg"
                    className="absolute left-0 top-0 w-1 h-full bg-accent-cyan shadow-[0_0_10px_rgba(0,255,242,0.5)]"
                  />
                )}
                <div className="relative shrink-0">
                   <img src={message.author.avatar} alt="" className="w-10 h-10 rounded-xl bg-white/10 p-0.5" />
                   <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-black border border-white/10">
                      {message.platform === 'instagram' && <Instagram className="w-2.5 h-2.5 text-pink-500" />}
                      {message.platform === 'facebook' && <Facebook className="w-2.5 h-2.5 text-blue-500" />}
                      {message.platform === 'twitter' && <Twitter className="w-2.5 h-2.5 text-cyan-400" />}
                   </div>
                </div>
                <div className="min-w-0 flex-1">
                   <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-black text-white truncate">{message.author.name}</span>
                      <span className="text-[9px] text-text-muted font-bold whitespace-nowrap">
                         {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                      </span>
                   </div>
                   <p className={cn(
                     "text-[11px] leading-tight truncate",
                     message.status === 'UNREAD' ? "text-text-secondary font-bold" : "text-text-muted font-medium"
                   )}>
                     {message.body}
                   </p>
                   <div className="mt-2 flex items-center gap-2">
                       <div className={cn(
                         "h-1.5 w-1.5 rounded-full",
                         message.sentiment === 'POSITIVE' ? "bg-accent-green" :
                         message.sentiment === 'NEGATIVE' ? "bg-accent-pink" : "bg-text-muted"
                       )} />
                       <span className="text-[8px] font-black uppercase tracking-widest text-text-muted">
                         {message.sentiment} ({Math.round(message.sentimentScore * 100)}%)
                       </span>
                   </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area: Conversation Thread */}
        <div className="flex-1 flex flex-col bg-black/20">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div 
                key={selectedMessage.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col h-full"
              >
                {/* Thread Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/40">
                   <div className="flex items-center gap-4">
                      <img src={selectedMessage.author.avatar} alt="" className="w-12 h-12 rounded-2xl bg-white/10" />
                      <div>
                         <h2 className="text-lg font-black text-white uppercase tracking-tight">{selectedMessage.author.name}</h2>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase">
                            <span className="text-accent-cyan">VIEW PROFILE</span>
                            <span className="text-white/20">•</span>
                            <span>{selectedMessage.platform}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full hover:bg-white/10">
                         <Trash2 className="w-4 h-4 text-accent-pink" />
                      </Button>
                      <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full hover:bg-white/10 text-white">
                         <MoreHorizontal className="w-5 h-5" />
                      </Button>
                   </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-80">
                   <div className="max-w-3xl mx-auto space-y-8">
                      {/* User Message */}
                      <div className="flex gap-4">
                         <div className="shrink-0 pt-1">
                            <img src={selectedMessage.author.avatar} alt="" className="w-8 h-8 rounded-lg" />
                         </div>
                         <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                               <span className="font-black text-xs text-white uppercase">{selectedMessage.author.name}</span>
                               <span className="text-[10px] font-bold text-text-muted">{formatDistanceToNow(new Date(selectedMessage.timestamp))} ago</span>
                            </div>
                            <GlassCard className="p-4 bg-white/5 border-white/10 rounded-2xl rounded-tl-none">
                               <p className="text-sm text-text-secondary leading-relaxed">{selectedMessage.body}</p>
                            </GlassCard>
                            
                            {selectedMessage.postContext && (
                              <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/5 group hover:border-accent-cyan/30 transition-all cursor-pointer">
                                 <img src={selectedMessage.postContext.thumbnail} alt="" className="w-10 h-10 rounded-lg object-cover" />
                                 <div>
                                    <div className="text-[8px] font-black uppercase tracking-widest text-text-muted">RE: POST PERFORMANCE</div>
                                    <div className="text-[10px] font-bold text-accent-cyan">SUMMER COLLOCTION #24</div>
                                 </div>
                              </div>
                            )}
                         </div>
                      </div>

                      {/* AI Interpretation Suggestion */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-accent-purple/5 border border-accent-purple/20 p-6 rounded-2xl"
                      >
                         <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="w-5 h-5 text-accent-purple" />
                            <h4 className="text-[10px] font-black uppercase tracking-[3px] text-white">AI Intel Interpretation</h4>
                         </div>
                         <p className="text-xs text-text-muted leading-relaxed">
                            Sentiment analysis identifies this as a <span className="text-accent-green font-bold uppercase tracking-widest">High-Intent Support Query</span>. Recommending priority escalation. The user has 450K followers on Twitter, making this a <span className="text-accent-cyan font-bold underline decoration-accent-cyan/30">Tier-1 Interaction</span>.
                         </p>
                         <div className="mt-4 flex gap-2">
                             <Button variant="outline" size="sm" className="h-8 text-[9px] border-accent-purple/20 bg-accent-purple/10 text-white uppercase font-black">
                                GENERATE RESPONSE
                             </Button>
                             <Button variant="ghost" size="sm" className="h-8 text-[9px] text-text-muted uppercase font-black">
                                DISMISS
                             </Button>
                         </div>
                      </motion.div>
                   </div>
                </div>

                {/* Reply Area */}
                <div className="p-4 border-t border-white/5 bg-black/40">
                   <div className="max-w-3xl mx-auto">
                      <div className="relative glass border-white/10 rounded-2xl focus-within:border-accent-cyan/50 transition-all">
                         <textarea 
                           placeholder="Type your response to excel with premium precision..."
                           className="w-full bg-transparent p-4 text-xs font-medium text-white min-h-[100px] focus:outline-none placeholder:text-text-muted/50 no-scrollbar"
                         />
                         <div className="absolute bottom-3 right-3 flex items-center gap-3">
                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-text-muted hover:text-white">
                               <ThumbsUp className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-text-muted hover:text-white">
                               <CornerUpLeft className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="h-9 px-4 bg-accent-cyan text-black font-black uppercase text-[10px] tracking-widest shadow-[0_0_15px_rgba(0,255,242,0.3)] hover:scale-105 active:scale-95 transition-all">
                               <Send className="w-3.5 h-3.5 mr-2" /> DISPATCH
                            </Button>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center opacity-30">
                 <Inbox className="w-20 h-20 mb-6 text-text-muted stroke-[1px]" />
                 <h3 className="text-xl font-black uppercase tracking-[5px] text-white">Select a Stream</h3>
                 <p className="text-text-muted text-xs uppercase tracking-widest mt-2 font-bold">Your unified intelligence wait for selection</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
}
