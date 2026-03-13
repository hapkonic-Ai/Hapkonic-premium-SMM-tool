"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, RefreshCw, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050510] relative overflow-hidden selection:bg-accent-cyan/30">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-purple/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-cyan/10 blur-[120px] rounded-full" />

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-8 flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-white/5 p-2 rounded-lg border border-white/10 group-hover:border-white/20 transition-all">
            <ChevronLeft className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
          </div>
          <span className="text-xs font-black uppercase tracking-[4px] text-text-muted group-hover:text-white transition-colors">Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Compliance Active</span>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-16 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-black gradient-text tracking-tighter uppercase leading-none">
            Privacy <br /> Protocol
          </h1>
          <p className="text-text-muted text-sm uppercase tracking-[4px] font-bold">Version 1.0 — Last Updated: March 2026</p>
        </motion.div>

        <div className="space-y-12">
          {/* Section 1: Intro */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl glass border-accent-cyan/20">
                <Shield className="w-6 h-6 text-accent-cyan" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Data Governance</h2>
            </div>
            <GlassCard className="p-8 space-y-4 border-white/5">
              <p className="text-text-muted leading-relaxed">
                Hapkonic ("we", "us", or "our") operates the Hapkonic Premium Social Media Analytics Platform. This protocol outlines how we handle data when you connect your professional social media accounts through our platform.
              </p>
              <p className="text-text-muted leading-relaxed">
                We prioritize your security. All data transmission is handled via enterprise-grade encryption, and we adhere to the strict developer policies of our platform partners including Meta, X, and LinkedIn.
              </p>
            </GlassCard>
          </section>

          {/* Section 2: Collection */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl glass border-accent-purple/20">
                <Eye className="w-6 h-6 text-accent-purple" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Information We Collect</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
                <h4 className="text-accent-cyan font-black text-xs uppercase tracking-widest mb-3">Account Data</h4>
                <p className="text-sm text-text-muted">We store your email, name, and profile image provided during registration to personalize your workspace experience.</p>
              </GlassCard>
              <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
                <h4 className="text-accent-purple font-black text-xs uppercase tracking-widest mb-3">Professional Insights</h4>
                <p className="text-sm text-text-muted">When connecting social accounts, we retrieve metrics such as follower counts, post performance, and engagement rates for analytics display.</p>
              </GlassCard>
              <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
                <h4 className="text-accent-pink font-black text-xs uppercase tracking-widest mb-3">OAuth Tokens</h4>
                <p className="text-sm text-text-muted">Tokens are stored securely and used exclusively to fetch fresh analytics data. We never share these tokens with third parties.</p>
              </GlassCard>
              <GlassCard className="p-6 border-white/5 bg-white/[0.02]">
                <h4 className="text-accent-green font-black text-xs uppercase tracking-widest mb-3">Usage Metrics</h4>
                <p className="text-sm text-text-muted">We may collect anonymous usage data to improve Hapkonic's features and ensure platform stability.</p>
              </GlassCard>
            </div>
          </section>

          {/* Section 3: Social Media Partners */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl glass border-accent-pink/20">
                <RefreshCw className="w-6 h-6 text-accent-pink" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Social Platform Integration</h2>
            </div>
            <GlassCard className="p-8 space-y-4 border-white/5">
              <p className="text-text-muted leading-relaxed">
                Hapkonic connects to third-party social media platforms via their official APIs. By using our platform, you also agree to the privacy policies of these providers:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono uppercase tracking-widest">
                <li className="flex items-center gap-2 text-text-muted">
                  <div className="w-1 h-1 rounded-full bg-accent-cyan" />
                  Meta Privacy Policy
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <div className="w-1 h-1 rounded-full bg-accent-purple" />
                  X (Twitter) Privacy Policy
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <div className="w-1 h-1 rounded-full bg-accent-pink" />
                  LinkedIn User Agreement
                </li>
                <li className="flex items-center gap-2 text-text-muted">
                  <div className="w-1 h-1 rounded-full bg-accent-green" />
                  Google Privacy Policy
                </li>
              </ul>
            </GlassCard>
          </section>

          {/* Section 4: Security */}
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl glass border-accent-green/20">
                <Lock className="w-6 h-6 text-accent-green" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">Data Security & Rights</h2>
            </div>
            <GlassCard className="p-8 space-y-6 border-white/5">
              <div className="space-y-2">
                <h4 className="text-white font-bold text-sm">Right to Erasure</h4>
                <p className="text-text-muted text-sm leading-relaxed">
                  Users can disconnect any social account at any time. To request full deletion of your Hapkonic account and all associated tokens, please contact our support team.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-bold text-sm">Security Measures</h4>
                <p className="text-text-muted text-sm leading-relaxed">
                  We use AES-256 encryption for all sensitive data and isolated server-side workers for background synchronization.
                </p>
              </div>
            </GlassCard>
          </section>

          {/* Contact */}
          <div className="py-12 border-t border-white/5 text-center">
            <p className="text-text-muted text-xs uppercase tracking-[3px] mb-6">Need clarification on our privacy laws?</p>
            <a href="mailto:hapkonic@gmail.com">
               <Button variant="secondary" className="px-12 h-14 text-xs font-black uppercase tracking-[2px]">
                 contact protocol team
               </Button>
            </a>
          </div>
        </div>

        <footer className="py-12 text-center text-text-muted text-[10px] uppercase tracking-widest font-mono">
           &copy; 2026 Hapkonic Premium SMM. All Rights Reserved.
        </footer>
      </main>
    </div>
  );
}
