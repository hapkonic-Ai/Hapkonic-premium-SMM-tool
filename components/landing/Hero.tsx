"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-32 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.1] backdrop-blur-md mb-8"
      >
        <span className="text-[10px] uppercase tracking-[2px] font-bold text-accent-cyan">
          ◆ PREMIUM SOCIAL INTELLIGENCE
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-[clamp(3rem,8vw,7rem)] font-black leading-none tracking-[-3px] mb-8"
      >
        <span className="gradient-text">Analytics</span> That<br />
        Drive <span className="gradient-text">Growth</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-text-secondary text-lg md:text-xl font-light max-w-[600px] mb-12 leading-relaxed"
      >
        Hapkonic's enterprise-grade social media analytics platform — powered by AI inference, real-time monitoring, and strategic automation for modern brands.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Button 
          variant="primary" 
          size="lg" 
          className="rounded-full px-10 h-14 text-sm font-bold"
          onClick={() => document.getElementById("phases")?.scrollIntoView({ behavior: "smooth" })}
        >
          View Implementation Plan
        </Button>
        <Button 
          variant="secondary" 
          size="lg" 
          className="rounded-full px-10 h-14 text-sm font-bold glass"
          onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}
        >
          Preview Dashboard
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-text-muted uppercase tracking-[3px]">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-accent-cyan to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};
