import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Scene3D } from "@/components/landing/Scene3D";
import { StatsBar } from "@/components/landing/StatsBar";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <main className="relative bg-background text-foreground overflow-x-hidden min-h-screen">
      <Navbar />
      <Scene3D />
      
      <div className="relative z-10 w-full pt-20">
        <Hero />
        <StatsBar />
        <FeaturesGrid />
        <CTASection />
        
        <footer className="py-12 px-6 border-t border-glass-border text-center text-text-muted text-[10px] uppercase tracking-[2px]">
          © 2026 HAPKONIC PRO — ALL RIGHTS RESERVED
        </footer>
      </div>
    </main>
  );
}
