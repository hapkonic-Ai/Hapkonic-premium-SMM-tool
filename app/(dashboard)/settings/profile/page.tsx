"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { User, Mail, Shield, Smartphone, Globe, Camera } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Account Profile</h1>
        <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Manage your personal and security settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <GlassCard className="p-8 text-center border-white/5">
            <div className="relative inline-block mx-auto mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink p-1">
                <div className="w-full h-full rounded-full bg-bg-primary flex items-center justify-center text-2xl font-black">
                  AU
                </div>
              </div>
              <button className="absolute bottom-0 right-0 p-2 rounded-full glass border-white/10 hover:bg-white/10 transition-colors">
                <Camera className="w-4 h-4 text-accent-cyan" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-white">Admin User</h2>
            <p className="text-xs text-text-muted font-mono mt-1 uppercase tracking-widest">Premium Account</p>
            
            <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
               <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  <span>Member Since</span>
                  <span className="text-white">Oct 2023</span>
               </div>
               <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  <span>Last Login</span>
                  <span className="text-white">2 hours ago</span>
               </div>
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 gap-3">
             {["Security", "Billing", "Notifications", "API Keys"].map(item => (
               <button key={item} className="w-full p-4 rounded-xl glass-hover border border-white/5 text-left text-xs font-bold uppercase tracking-widest text-text-secondary hover:text-white transition-all">
                 {item}
               </button>
             ))}
          </div>
        </div>

        {/* Profile Form */}
        <div className="md:col-span-2 space-y-6">
          <GlassCard className="p-8 border-white/5">
            <h3 className="text-lg font-bold text-white mb-8 tracking-tight">Core Identity</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input type="text" defaultValue="Admin User" className="w-full h-11 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-accent-cyan/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input type="email" defaultValue="admin@hapkonic.com" className="w-full h-11 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-accent-cyan/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Organization</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input type="text" defaultValue="Hapkonic Global" className="w-full h-11 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-accent-cyan/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Phone Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input type="text" defaultValue="+1 (555) 000-0000" className="w-full h-11 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-1 focus:ring-accent-cyan/50" />
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <Button className="w-32 h-11 uppercase font-black tracking-widest text-[10px]">
                Update Profile
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="p-8 border-accent-pink/20 bg-accent-pink/5">
             <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent-pink/10 border border-accent-pink/20">
                   <Shield className="w-6 h-6 text-accent-pink" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-white tracking-tight">Security Alert</h3>
                   <p className="text-sm text-text-muted mt-1 leading-relaxed">
                     Two-factor authentication is not enabled. Protect your account from unauthorized access by entering a second code when you log in.
                   </p>
                   <Button variant="outline" className="mt-4 h-9 text-[10px] border-accent-pink/20 text-accent-pink hover:bg-accent-pink/10">
                      ENABLE 2FA NOW
                   </Button>
                </div>
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
