"use client";

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
  
  return (
    <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
      <Sidebar />
      <div 
        className={cn(
          "flex flex-col flex-1 relative overflow-hidden min-w-0 transition-all duration-300",
          isCollapsed ? "md:pl-20" : "md:pl-64"
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
