"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, Users, MessageSquare, TrendingUp, HeartPulse, 
  Target, Zap, PenTool, Layers, Bell, Cpu, Shield, 
  Settings, ChevronLeft, ChevronRight, LogOut, Orbit,
  Link as LinkIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { useSidebarStore } from "@/stores/useSidebarStore";


const sidebarItems = [
  { label: "Main", type: "header" },
  { icon: BarChart3, label: "Overview", href: "/overview" },
  { icon: Layers, label: "Content", href: "/content" },
  { icon: Users, label: "Audience", href: "/audience" },
  { icon: MessageSquare, label: "Engagement", href: "/engagement" },
  
  { label: "Intelligence", type: "header" },
  { icon: Target, label: "Competitors", href: "/competitors" },
  { icon: HeartPulse, label: "Sentiment", href: "/sentiment" },
  { icon: Cpu, label: "AI Insights", href: "/ai-insights" },
  { icon: Shield, label: "Brand Health", href: "/brand-health" },
  
  { label: "Growth", type: "header" },
  { icon: TrendingUp, label: "Campaigns", href: "/campaigns" },
  { icon: Zap, label: "Revenue", href: "/revenue" },
  
  { label: "Tools", type: "header" },
  { icon: PenTool, label: "Scheduler", href: "/scheduler" },
  { icon: Bell, label: "Alerts", href: "/alerts" },

  { label: "System", type: "header" },
  { icon: LinkIcon, label: "Connections", href: "/settings/connections" },
  { icon: Settings, label: "Settings", href: "/settings" },
];


export const Sidebar = () => {
  const { isCollapsed, toggleCollapsed } = useSidebarStore();
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen glass border-y-0 border-l-0 z-[50] transition-all duration-300 flex flex-col",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className="p-6 flex items-center gap-3">
        <div className="min-w-[32px] h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center shrink-0">
          <Orbit className="w-5 h-5 text-black" />
        </div>
        {!isCollapsed && (
          <span className="text-xl font-black tracking-tighter gradient-text whitespace-nowrap">
            HAPKONIC
          </span>
        )}
      </div>

      {/* Sidebar Nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 no-scrollbar">
        <div className="flex flex-col gap-1">
          {sidebarItems.map((item, i) => {
            if (item.type === "header") {
              return !isCollapsed && (
                <div key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mt-6 mb-2 px-2">
                  {item.label}
                </div>
              );
            }

            const Icon = item.icon!;
            const isActive = pathname === item.href;

            return (
              <Link
                key={i}
                href={item.href!}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                  isActive 
                    ? "bg-accent-cyan/10 text-accent-cyan" 
                    : "text-text-secondary hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive && "text-accent-cyan")} />
                {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-6 bg-accent-cyan rounded-r-full"
                  />
                )}

                {/* Tooltip for collapsed mode */}
                {isCollapsed && (
                  <div className="absolute left-16 px-3 py-1.5 rounded-md bg-bg-secondary border border-glass-border text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-[100] shadow-xl">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-glass-border flex flex-col gap-2">
        <button
          onClick={toggleCollapsed}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-muted hover:bg-white/5 hover:text-white transition-all w-full"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!isCollapsed && <span className="text-sm font-medium">Collapse</span>}
        </button>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-accent-pink/60 hover:bg-accent-pink/10 hover:text-accent-pink transition-all w-full"
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Logout</span>}
        </button>

      </div>
    </aside>
  );
};
