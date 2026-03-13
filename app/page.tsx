import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Scene3D } from "@/components/landing/Scene3D";
import { PhaseTimeline } from "@/components/landing/PhaseTimeline";
import { DashboardPreview } from "@/components/landing/DashboardPreview";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { StrategyGrid } from "@/components/landing/StrategyGrid";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden min-h-screen">
      <Navbar />
      <Scene3D />
      
      <div className="relative z-10 w-full pt-20">
        <Hero />
        <PhaseTimeline />
        <DashboardPreview />
        <FeaturesGrid />
        <StrategyGrid />
        <CTASection />
        
        <footer className="py-12 px-6 border-t border-glass-border flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
          <span className="text-text-muted text-[10px] uppercase tracking-[2px]">
            © 2026 HAPKONIC PRO — ALL RIGHTS RESERVED
          </span>
          <div className="flex gap-8 text-text-muted text-[10px] uppercase tracking-[2px]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
            <span className="cursor-pointer hover:text-white transition-colors">Contact</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
