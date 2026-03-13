"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  Instagram, Facebook, Twitter, Linkedin, 
  Link as LinkIcon, Unlink, CheckCircle2, AlertCircle,
  Plus, ExternalLink, RefreshCw
} from "lucide-react";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const PLATFORM_ICONS: any = {
  INSTAGRAM: <Instagram className="w-5 h-5 text-pink-500" />,
  FACEBOOK: <Facebook className="w-5 h-5 text-blue-500" />,
  TWITTER: <Twitter className="w-5 h-5 text-cyan-400" />,
  LINKEDIN: <Linkedin className="w-5 h-5 text-blue-600" />,
};

const PLATFORM_COLORS: any = {
  INSTAGRAM: "border-pink-500/20 bg-pink-500/5",
  FACEBOOK: "border-blue-500/20 bg-blue-500/5",
  TWITTER: "border-cyan-400/20 bg-cyan-400/5",
  LINKEDIN: "border-blue-600/20 bg-blue-600/5",
};

export default function ConnectionsPage() {
  const [connectedAccounts, setConnectedAccounts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAccounts = async () => {
    try {
      const res = await fetch("/api/social/accounts");
      const data = await res.json();
      setConnectedAccounts(data);
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const platforms = [
    { id: "facebook", name: "Facebook & Instagram", key: "FACEBOOK", icon: <Facebook className="w-5 h-5 text-blue-500" /> },
    { id: "twitter", name: "Twitter (X)", key: "TWITTER" },
    { id: "linkedin", name: "LinkedIn", key: "LINKEDIN" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Connected Accounts</h1>
        <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Manage your social data connectors</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((p, i) => {
          const account = connectedAccounts.find(a => a.platform === p.key);
          const isConnected = !!account;

          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className={cn("p-6 border-white/5 h-full flex flex-col justify-between", PLATFORM_COLORS[p.key])}>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl glass border-white/10">
                      {PLATFORM_ICONS[p.key]}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{p.name}</h3>
                      {isConnected ? (
                        <p className="text-xs text-accent-green font-mono">{account.username}</p>
                      ) : (
                        <p className="text-xs text-text-muted">
                          {p.id === "facebook" ? "Login with Facebook to manage IG & FB Pages" : "Not connected"}
                        </p>
                      )}
                    </div>
                  </div>
                  {isConnected ? (
                     <Badge variant="active" className="bg-accent-green/10 text-accent-green border-extra-subtle">
                       <CheckCircle2 className="w-3 h-3 mr-1" /> ACTIVE
                     </Badge>
                  ) : (
                     <Badge variant="default" className="bg-white/5 text-text-muted border-extra-subtle">
                       INACTIVE
                     </Badge>
                  )}
                </div>

                <div className="space-y-4">
                  {isConnected ? (
                    <>
                      <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-text-muted mb-2">
                           <span>Last Sync</span>
                           <span>{new Date(account.updatedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest text-text-muted">
                           <span>Followers</span>
                           <span className="text-accent-cyan">{account.followerCount.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" className="flex-1 text-[10px] h-9">
                          <RefreshCw className="w-3 h-3 mr-2" /> REFRESH
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-[10px] h-9 border-accent-pink/20 text-accent-pink hover:bg-accent-pink/10">
                          <Unlink className="w-3 h-3 mr-2" /> DISCONNECT
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Button 
                      className="w-full h-11 text-xs font-black uppercase tracking-widest bg-white/5 border-white/10 hover:bg-white/10 shadow-lg"
                      onClick={() => signIn(p.id, { callbackUrl: window.location.href })}
                    >
                      <Plus className="w-4 h-4 mr-2" /> Connect Account
                    </Button>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <GlassCard className="border-accent-purple/20 bg-accent-purple/5 p-6">
         <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent-purple/10 border border-accent-purple/20">
              <AlertCircle className="w-6 h-6 text-accent-purple" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">Enterprise Compliance</h3>
              <p className="text-sm text-text-muted mt-1 leading-relaxed">
                Connect multiple accounts for cross-platform analytics. All tokens are encrypted with AES-256 and never stored in plain text. OAuth sessions are isolated from your Hapkonic login for maximum security.
              </p>
            </div>
         </div>
      </GlassCard>
    </div>
  );
}
