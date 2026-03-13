"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { Input } from "@/components/ui/Input";
import { Orbit, Instagram, Twitter, Facebook, Github, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Suspense } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      if (errorParam === "OAuthSignin") {
        setError("Error starting OAuth session. Please check your network or provider config.");
      } else if (errorParam === "OAuthCallback") {
        setError("Error during OAuth callback. Your credentials might not be accepted.");
      } else if (errorParam === "OAuthCreateAccount") {
        setError("Could not link this social profile. Please try another account.");
      } else if (errorParam === "Callback") {
        setError("Authentication callback failed. Check your environment configuration.");
      } else {
        setError(`Auth Error: ${errorParam}`);
      }
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid credentials. Please try again.");
      } else {
        router.push("/overview");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassCard className="p-8 border-white/5">
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center mb-4">
          <Orbit className="w-7 h-7 text-black" />
        </div>
        <h1 className="text-2xl font-black tracking-tighter gradient-text">HAPKONIC PRO</h1>
        <p className="text-text-secondary text-sm font-light mt-1 text-center">Sign in to your premium dashboard</p>
      </div>

      {registered && (
        <div className="mb-6 p-4 rounded-xl bg-accent-green/10 border border-accent-green/20 flex items-start gap-4 animate-in fade-in zoom-in duration-300">
           <div className="text-accent-green text-[10px] uppercase font-black tracking-widest leading-none mt-1">SUCCESS</div>
           <p className="text-xs text-text-secondary font-medium uppercase tracking-tight">Account created! You can now sign in.</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <Input 
          label="Email Address" 
          placeholder="name@company.com" 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        {error && (
          <div className="flex items-center gap-2 text-accent-pink">
            <AlertCircle className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold tracking-widest">{error}</span>
          </div>
        )}

        <Button className="w-full mt-2" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In with Email"}
        </Button>
      </form>

      <p className="mt-8 text-center text-[10px] text-text-muted uppercase tracking-[1px]">
        New to Hapkonic? <Link href="/register" className="text-accent-cyan font-bold hover:underline">Request access</Link>
      </p>
    </GlassCard>
  );
}

export default function LoginPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-6 bg-background overflow-hidden font-sans">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-cyan/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Suspense fallback={
          <GlassCard className="p-8 border-white/5 flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-accent-cyan" />
          </GlassCard>
        }>
          <LoginForm />
        </Suspense>
      </motion.div>
    </main>
  );
}
