"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const Counter = ({ value, step = 1, duration = 2 }: { value: number; step?: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalSteps = duration * 60;
      const increment = end / totalSteps;
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

export const StatsBar = () => {
  const stats = [
    { label: "Modules", value: 15, suffix: "+" },
    { label: "Phases", value: 5, suffix: "" },
    { label: "Metrics", value: 50, suffix: "+" },
    { label: "Integrations", value: 14, suffix: "+" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-20 px-6 max-w-7xl mx-auto">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-4xl md:text-6xl font-black gradient-text mb-2">
            <Counter value={stat.value} />
            {stat.suffix}
          </div>
          <div className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-text-muted uppercase">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
