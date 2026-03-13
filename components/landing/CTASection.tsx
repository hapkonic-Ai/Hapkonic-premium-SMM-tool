"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export const CTASection = () => {
  return (
    <section className="py-32 px-6 text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto"
      >
        <span className="font-mono text-[10px] uppercase tracking-[4px] text-accent-cyan block mb-6">
          // Ready to Build?
        </span>
        <h2 className="text-4xl md:text-7xl font-black mb-8 leading-none tracking-tighter">
          Let&apos;s Ship<br />
          <span className="gradient-text">Hapkonic</span>
        </h2>
        <p className="text-text-secondary text-lg font-light mb-12 max-w-xl mx-auto leading-relaxed">
          30 weeks from concept to a fully operational, AI-powered social media analytics platform that competes at the enterprise level.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/login">
            <Button variant="primary" size="lg" className="rounded-full px-10 h-14 text-sm font-bold">
              Start Phase 1 →
            </Button>
          </Link>
          <Button variant="secondary" size="lg" className="rounded-full px-10 h-14 text-sm font-bold glass">
            Download Full Plan
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
