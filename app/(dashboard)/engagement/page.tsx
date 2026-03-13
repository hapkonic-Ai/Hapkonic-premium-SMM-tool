"use client";

import { motion } from "framer-motion";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { useEngagementAnalytics } from "@/hooks/useAnalytics";
import { MessageCircle, Heart, Share2, Bookmark } from "lucide-react";
import { MetricWidget } from "@/components/dashboard/MetricWidget";

export default function EngagementPage() {
  const { data, isLoading } = useEngagementAnalytics();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Engagement Analytics</h1>
        <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Measure the quality of your community interactions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricWidget
          title="Likes"
          value="48.2K"
          change={12.5}
          label="vs last period"
          icon={<Heart className="w-5 h-5 text-pink-500" />}
          isLoading={isLoading}
        />
        <MetricWidget
          title="Comments"
          value="12.4K"
          change={-5.2}
          label="vs last period"
          icon={<MessageCircle className="w-5 h-5 text-accent-cyan" />}
          isLoading={isLoading}
        />
        <MetricWidget
          title="Shares"
          value="8.1K"
          change={18.4}
          label="vs last period"
          icon={<Share2 className="w-5 h-5 text-accent-purple" />}
          isLoading={isLoading}
        />
        <MetricWidget
          title="Saves"
          value="3.2K"
          change={2.1}
          label="vs last period"
          icon={<Bookmark className="w-5 h-5 text-yellow-500" />}
          isLoading={isLoading}
        />
      </div>

      <ChartContainer title="Engagement Trend" subtitle="Daily interactions across all channels" isLoading={isLoading}>
        <LineChart 
          data={data?.engagementTrend || []} 
          index="date" 
          categories={["likes", "comments", "shares", "saves"]} 
        />
      </ChartContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Engagement by Interaction Type" subtitle="What actions are users taking?" isLoading={isLoading}>
          <BarChart 
            data={data?.engagementByType || []} 
            index="type" 
            categories={["engagement"]} 
            colors={["#00F0FF"]}
            valueFormatter={(v) => `${v}%`}
          />
        </ChartContainer>
        
        <ChartContainer title="Reaction Summary" subtitle="Sentiment breakdown based on reactions" isLoading={isLoading}>
           <div className="h-full flex flex-col items-center justify-center py-8">
              <div className="grid grid-cols-3 gap-8 w-full max-w-sm">
                {[
                  { label: "Positive", value: "72%", color: "text-accent-green" },
                  { label: "Neutral", value: "18%", color: "text-text-muted" },
                  { label: "Negative", value: "10%", color: "text-accent-pink" },
                ].map((item) => (
                  <div key={item.label} className="text-center space-y-2">
                    <span className={item.color + " text-2xl font-black block"}>{item.value}</span>
                    <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest">{item.label}</span>
                  </div>
                ))}
              </div>
           </div>
        </ChartContainer>
      </div>
    </div>
  );
}
