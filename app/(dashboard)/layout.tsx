"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar - fixed width will be handled by Sidebar itself */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pl-20 md:pl-20 transition-all duration-300 SidebarExpanded:pl-64">
        {/* We'll use a CSS class or data attribute to handle the margin shift if needed, 
            but for now, simpler calc or static padding suffices */}
        <TopBar />
        <main className="p-8 max-w-[1600px] mx-auto w-full flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
