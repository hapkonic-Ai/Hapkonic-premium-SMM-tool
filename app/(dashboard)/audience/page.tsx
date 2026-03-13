"use client";

import { motion } from "framer-motion";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { DonutChart } from "@/components/charts/DonutChart";
import { BarChart } from "@/components/charts/BarChart";
import { useAudienceAnalytics } from "@/hooks/useAnalytics";
import { GlassCard } from "@/components/ui/GlassCard";
import { MapPin, Globe, User, Languages } from "lucide-react";

export default function AudiencePage() {
  const { data, isLoading } = useAudienceAnalytics();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Audience Insights</h1>
        <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Understand who is interacting with your brand</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Age Distribution" subtitle="Follower breakdown by age group" isLoading={isLoading}>
          <BarChart 
            data={data?.demographics || []} 
            index="name" 
            categories={["value"]} 
            colors={["#A855F7"]}
            valueFormatter={(v) => `${v}%`}
            layout="vertical"
          />
        </ChartContainer>

        <ChartContainer title="Gender Split" subtitle="Audience composition by gender" isLoading={isLoading}>
          <DonutChart 
            data={data?.genderSplit || []} 
            valueFormatter={(v) => `${v}%`}
            colors={["#EC4899", "#00F0FF", "#A855F7"]}
          />
        </ChartContainer>

        <ChartContainer title="Top Locations" subtitle="Where your followers are located" isLoading={isLoading} className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video glass rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
               <Globe className="w-32 h-32 text-white/5 animate-pulse" />
               <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/10 to-transparent" />
               <p className="absolute bottom-4 text-[10px] text-text-muted uppercase font-bold">Interactive Global Map coming soon</p>
            </div>
            
            <div className="space-y-4">
              {data?.geoDistribution.map((loc: any, i: number) => (
                <div key={loc.country} className="flex items-center justify-between p-3 rounded-lg glass border-white/5 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </div>
                    <span className="text-sm font-bold text-white">{loc.country}</span>
                  </div>
                  <span className="text-sm font-black text-accent-cyan">{loc.followers.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartContainer>
      </div>
    </div>
  );
}
