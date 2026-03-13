"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export const CTASection = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tighter mb-8"
        >
          Ready to transform <br />
          your <span className="gradient-text">Social Strategy?</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-text-secondary mb-12 max-w-xl mx-auto font-light"
        >
          Join 500+ premium brands using Hapkonic to drive their social media growth. 
          Start your 14-day free trial today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg">Get Started Free</Button>
          <Button variant="secondary" size="lg">Contact Sales</Button>
        </motion.div>
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-accent-cyan/10 blur-[100px] rounded-full -z-10" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-accent-pink/10 blur-[100px] rounded-full -z-10" />
    </section>
  );
};
