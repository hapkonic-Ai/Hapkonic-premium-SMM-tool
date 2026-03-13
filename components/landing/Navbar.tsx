"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const links = [
  { name: "Phases", href: "#phases" },
  { name: "Dashboard", href: "#dashboard" },
  { name: "Features", href: "#features" },
  { name: "Strategy", href: "#strategy" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6 py-4 flex items-center justify-between border-b",
      scrolled 
        ? "bg-background/70 backdrop-blur-2xl border-white/[0.08] py-3" 
        : "bg-transparent border-transparent py-5"
    )}>
      <Link href="/" className="group">
        <span className="text-xl md:text-2xl font-black gradient-text tracking-tighter">
          HAPKONIC
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-10">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-[11px] font-bold uppercase tracking-[2px] text-text-secondary hover:text-white transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <Link href="/login">
          <Button variant="primary" className="rounded-full px-6 text-[11px] font-black uppercase tracking-[1px] h-10 shadow-lg shadow-accent-cyan/20">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Mobile CTA only */}
      <div className="md:hidden">
        <Link href="/login">
          <Button variant="primary" size="sm" className="rounded-full px-4 text-[10px] font-black uppercase h-8">
            Start
          </Button>
        </Link>
      </div>
    </nav>
  );
};
