"use client";

import React from "react";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { cn } from "@/lib/utils";
import { FilterBar } from "@/components/dashboard/FilterBar";
import { useSidebarStore } from "@/stores/useSidebarStore";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isCollapsed } = useSidebarStore();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch for persisted store values
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div 
        className={cn(
          "flex flex-col flex-1 relative overflow-hidden min-w-0 transition-all duration-300",
          (!mounted || !isCollapsed) ? "md:pl-64" : "md:pl-20"
        )}
      >
        <TopBar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 custom-scrollbar relative z-10">
          <FilterBar />
          {children}
        </main>
      </div>
    </div>
  );
}
