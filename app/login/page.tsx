"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { Orbit, Instagram, Twitter, Facebook, Github } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-6 bg-background overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-cyan/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <GlassCard className="p-8 border-white/5">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center mb-4">
              <Orbit className="w-7 h-7 text-black" />
            </div>
            <h1 className="text-2xl font-black tracking-tighter gradient-text">HAPKONIC PRO</h1>
            <p className="text-text-secondary text-sm font-light mt-1">Sign in to your premium dashboard</p>
          </div>

          <div className="space-y-4">
            <Input label="Email Address" placeholder="name@company.com" />
            <Input label="Password" type="password" placeholder="••••••••" />
            
            <Button className="w-full mt-2">Sign In with Email</Button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-glass-border"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="bg-[#06060E] px-4 text-text-muted">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-glass-border hover:bg-white/5"
                onClick={() => signIn("google")}
            >
              <Github className="w-4 h-4 mr-2" /> Google
            </Button>
            <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-glass-border hover:bg-white/5"
                onClick={() => signIn("facebook")}
            >
              <Facebook className="w-4 h-4 mr-2 text-blue-500" /> Facebook
            </Button>
            <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-glass-border hover:bg-white/5"
                onClick={() => signIn("twitter")}
            >
              <Twitter className="w-4 h-4 mr-2 text-cyan-400" /> Twitter
            </Button>
            <Button 
                variant="outline" 
                size="sm" 
                className="w-full border-glass-border hover:bg-white/5"
            >
              <Instagram className="w-4 h-4 mr-2 text-pink-500" /> Instagram
            </Button>
          </div>

          <p className="mt-8 text-center text-[10px] text-text-muted uppercase tracking-[1px]">
            New to Hapkonic? <Link href="/register" className="text-accent-cyan font-bold hover:underline">Request access</Link>
          </p>
        </GlassCard>
      </motion.div>
    </main>
  );
}
