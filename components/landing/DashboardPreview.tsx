"use client";

import React from "react";
import { motion } from "framer-motion";

export const DashboardPreview = () => {
  return (
    <section id="dashboard" className="py-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <span className="font-mono text-[10px] uppercase tracking-[4px] text-accent-cyan block mb-4">
          // UI Preview
        </span>
        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-[1.1]">
          Dashboard<br />Blueprint
        </h2>
        <p className="text-text-secondary max-w-xl text-lg font-light">
          A preview of the glassmorphic analytics dashboard — featuring live KPIs, interactive charts, and real-time data tables.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-white/[0.04] border border-white/[0.1] rounded-[32px] p-6 backdrop-blur-3xl overflow-hidden shadow-2xl"
      >
        {/* Dash Topbar */}
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-8">
          <div className="flex items-center gap-6">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="hidden md:flex gap-4">
              <span className="text-[11px] font-mono text-accent-cyan bg-accent-cyan/10 px-3 py-1 rounded-md">Overview</span>
              <span className="text-[11px] font-mono text-text-muted hover:text-white transition-colors cursor-pointer px-3 py-1">Content</span>
              <span className="text-[11px] font-mono text-text-muted hover:text-white transition-colors cursor-pointer px-3 py-1">Audience</span>
              <span className="text-[11px] font-mono text-text-muted hover:text-white transition-colors cursor-pointer px-3 py-1">AI Insights</span>
            </div>
          </div>
          <span className="text-[9px] font-mono text-text-muted tracking-widest uppercase">Last updated: 2 min ago</span>
        </div>

        {/* Dash Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* KPI 1 */}
          <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/10 blur-3xl rounded-full translate-x-12 -translate-y-12" />
            <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-3">Total Followers</div>
            <div className="text-4xl font-black text-white mb-2 tracking-tighter">2.4M</div>
            <div className="text-[11px] text-accent-green font-bold">▲ +12.3% this month</div>
          </div>
          {/* KPI 2 */}
          <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl relative group overflow-hidden">
            <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-3">Engagement Rate</div>
            <div className="text-4xl font-black text-white mb-2 tracking-tighter">4.7%</div>
            <div className="text-[11px] text-accent-cyan font-bold">▲ +0.8% vs avg</div>
          </div>
          {/* KPI 3 */}
          <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl relative group overflow-hidden">
            <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-3">Total Reach</div>
            <div className="text-4xl font-black text-white mb-2 tracking-tighter">18.2M</div>
            <div className="text-[11px] text-accent-purple font-bold">▲ +23.1%</div>
          </div>
          {/* KPI 4 */}
          <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl relative group overflow-hidden">
            <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-3">Conversions</div>
            <div className="text-4xl font-black text-white mb-2 tracking-tighter">8,431</div>
            <div className="text-[11px] text-accent-pink font-bold">▼ -2.1%</div>
          </div>

          {/* Main Chart Mockup */}
          <div className="lg:col-span-3 bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl overflow-hidden relative">
             <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-6">Engagement Over Time — Weekly</div>
             <div className="h-48 flex items-end gap-1.5">
               {Array.from({ length: 30 }).map((_, i) => (
                 <motion.div 
                   key={i}
                   initial={{ height: 0 }}
                   whileInView={{ height: `${20 + Math.random() * 80}%` }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.02, duration: 1 }}
                   className="flex-1 rounded-t-sm"
                   style={{ backgroundColor: i % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-purple)', opacity: 0.3 + (i/30) }}
                 />
               ))}
             </div>
          </div>

          {/* Stats Breakdown */}
          <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl">
            <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-6">Platform Data</div>
            <div className="space-y-4">
               {[
                 { name: "Instagram", val: "1.2M", color: "var(--accent-cyan)" },
                 { name: "YouTube", val: "890K", color: "var(--accent-purple)" },
                 { name: "LinkedIn", val: "340K", color: "var(--accent-green)" },
                 { name: "TikTok", val: "2.1M", color: "var(--accent-pink)" },
                 { name: "Twitter", val: "560K", color: "var(--accent-orange)" },
               ].map((p, i) => (
                 <div key={i} className="flex items-center justify-between group cursor-default">
                    <span className="text-[11px] text-text-secondary group-hover:text-white transition-colors">{p.name}</span>
                    <span className="text-[11px] font-bold font-mono group-hover:scale-110 transition-transform" style={{ color: p.color }}>{p.val}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Table Mockup */}
          <div className="lg:col-span-4 bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl mt-4">
             <div className="text-[10px] font-mono text-text-muted uppercase tracking-widest mb-6 px-1">Top Performing Content</div>
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                 <thead>
                   <tr className="border-b border-white/[0.05]">
                     <th className="pb-4 px-2 text-[10px] font-mono text-text-muted uppercase tracking-widest font-normal">Post</th>
                     <th className="pb-4 px-2 text-[10px] font-mono text-text-muted uppercase tracking-widest font-normal">Type</th>
                     <th className="pb-4 px-2 text-[10px] font-mono text-text-muted uppercase tracking-widest font-normal">Reach</th>
                     <th className="pb-4 px-2 text-[10px] font-mono text-text-muted uppercase tracking-widest font-normal text-right">Engagement</th>
                   </tr>
                 </thead>
                 <tbody className="text-[12px] text-text-secondary">
                   {[
                     { name: "Product Launch Reel", type: "Reel", reach: "2.4M", eng: "8.2%", color: "var(--accent-green)" },
                     { name: "Behind the Scenes", type: "Carousel", reach: "1.1M", eng: "6.1%", color: "var(--accent-orange)" },
                     { name: "Team Culture Story", type: "Story", reach: "890K", eng: "5.4%", color: "var(--accent-purple)" },
                     { name: "Tutorial Short", type: "Short", reach: "780K", eng: "4.9%", color: "var(--accent-cyan)" },
                   ].map((row, i) => (
                     <tr key={i} className="border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] transition-colors">
                       <td className="py-4 px-2 font-bold text-white">{row.name}</td>
                       <td className="py-4 px-2">
                         <span className="bg-white/5 px-2 py-0.5 rounded-full text-[10px] font-mono" style={{ color: row.color }}>{row.type}</span>
                       </td>
                       <td className="py-4 px-2">{row.reach}</td>
                       <td className="py-4 px-2 text-right font-mono">{row.eng}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
