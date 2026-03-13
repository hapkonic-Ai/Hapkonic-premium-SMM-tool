"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Sparkles } from "lucide-react";

export const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };


  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 max-w-5xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-glass-border mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent-cyan" />
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-accent-cyan uppercase">
            Premium Social Intelligence
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] mb-8"
        >
          Analytics That <br />
          <span className="gradient-text">Drive Growth</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 font-light leading-relaxed"
        >
          The all-in-one premium intelligence platform for modern social media 
          teams. Track, analyze, and optimize your strategy across all platforms.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Button size="lg" className="w-full sm:w-auto group">
            Get Started Now
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            View Live Demo
          </Button>
        </motion.div>
      </motion.div>

      {/* Hero Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent-cyan to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};
