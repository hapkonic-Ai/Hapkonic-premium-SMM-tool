"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Orbit } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-6 py-4 flex items-center justify-between glass border-x-0 border-t-0 bg-background/50">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
          <Orbit className="w-5 h-5 text-black" />
        </div>
        <span className="text-xl font-black tracking-tighter gradient-text">HAPKONIC</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {["Features", "Analytics", "Pricing", "About"].map((item) => (
          <Link 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="text-xs font-bold tracking-widest uppercase text-text-muted hover:text-accent-cyan transition-colors"
          >
            {item}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login" className="text-xs font-bold tracking-widest uppercase text-text-muted hover:text-white transition-colors px-4">
          Login
        </Link>
        <Button size="sm">Get Started</Button>
      </div>
    </nav>
  );
};
