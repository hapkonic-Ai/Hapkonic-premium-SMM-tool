"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, User, ChevronDown, Command } from "lucide-react";
import { cn } from "@/lib/utils";

export const TopBar = () => {
  return (
    <header className="h-16 glass border-x-0 border-t-0 flex items-center justify-between px-8 sticky top-0 z-[40]">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent-cyan transition-colors" />
          <input 
            type="text" 
            placeholder="Search analytics, reports, or team..." 
            className="w-full h-10 pl-10 pr-12 rounded-lg bg-white/5 border border-white/5 focus:outline-none focus:ring-1 focus:ring-accent-cyan/50 text-sm text-white placeholder:text-text-muted transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-text-muted">
            <Command className="w-2.5 h-2.5" /> K
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <Link href="/alerts" className="p-2 rounded-lg hover:bg-white/5 transition-colors relative block">
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent-pink rounded-full border-2 border-[#06060E]" />
        </Link>

        <div className="h-8 w-[1px] bg-glass-border mx-2" />

        <Link href="/settings/profile" className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-white/5 transition-all group">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-white leading-tight">Admin User</div>
            <div className="text-[10px] text-text-muted leading-tight uppercase tracking-wider">Premium Plan</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center text-xs font-bold ring-2 ring-glass-border group-hover:ring-accent-cyan transition-all">
            AU
          </div>
          <ChevronDown className="w-4 h-4 text-text-muted" />
        </Link>
      </div>
    </header>
  );
};
