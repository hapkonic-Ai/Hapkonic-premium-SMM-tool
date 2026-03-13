"use client";

import { motion } from "framer-motion";
import { MetricWidget } from "@/components/dashboard/MetricWidget";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { AreaChart } from "@/components/charts/AreaChart";
import { DonutChart } from "@/components/charts/DonutChart";
import { useOverview } from "@/hooks/useAnalytics";
import { 
  Users, Eye, MousePointer2, MessageSquare, 
  Instagram, Facebook, Twitter, Linkedin 
} from "lucide-react";

export default function OverviewPage() {
  const { data, isLoading } = useOverview();

  const metrics = data?.metrics || {
    totalFollowers: 0,
    followerGrowth: 0,
    totalReach: 0,
    reachGrowth: 0,
    engagementRate: 0,
    engagementGrowth: 0,
    totalImpressions: 0,
    impressionsGrowth: 0,
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Account Overview</h1>
        <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Real-time cross-platform intelligence</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricWidget
          title="Total Followers"
          value={metrics.totalFollowers.toLocaleString()}
          change={metrics.followerGrowth}
          label="vs last period"
          icon={<Users className="w-5 h-5 text-accent-cyan" />}
          isLoading={isLoading}
        />
        <MetricWidget
          title="Avg. Engagement"
          value={`${metrics.engagementRate}%`}
          change={metrics.engagementGrowth}
          label="vs last period"
          icon={<MessageSquare className="w-5 h-5 text-accent-purple" />}
          isLoading={isLoading}
        />
        <MetricWidget
          title="Total Reach"
          value={metrics.totalReach.toLocaleString()}
          change={metrics.reachGrowth}
          label="vs last period"
          icon={<MousePointer2 className="w-5 h-5 text-accent-pink" />}
          isLoading={isLoading}
        />
        <MetricWidget
          title="Impressions"
          value={metrics.totalImpressions.toLocaleString()}
          change={metrics.impressionsGrowth}
          label="vs last period"
          icon={<Eye className="w-5 h-5 text-accent-green" />}
          isLoading={isLoading}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartContainer 
          title="Follower Growth" 
          subtitle="Cumulative growth across all connected platforms"
          className="lg:col-span-2"
          isLoading={isLoading}
        >
          <AreaChart 
            data={data?.growthData || []} 
            index="date" 
            categories={["Instagram", "Facebook", "Twitter", "LinkedIn"]} 
            stacked
          />
        </ChartContainer>

        <ChartContainer 
          title="Platform Breakdown" 
          subtitle="Follower distribution by network"
          isLoading={isLoading}
        >
          <DonutChart 
            data={data?.platformBreakdown || []} 
            valueFormatter={(v) => `${(v / 1000).toFixed(1)}K`}
          />
        </ChartContainer>
      </div>

      {/* Bottom Section - Future Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Recent Alerts" subtitle="System identified anomalies and events">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl glass hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-accent-purple/10 flex items-center justify-center border border-accent-purple/20">
                  <Instagram className="w-5 h-5 text-accent-purple" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-accent-cyan transition-colors">Engagement Spike detected</h4>
                  <p className="text-xs text-text-muted mt-1">Your recent post "Summer Collection" is performing 40% better than average.</p>
                </div>
                <span className="text-[10px] text-text-muted uppercase font-bold">2h ago</span>
              </div>
            ))}
          </div>
        </ChartContainer>

        <ChartContainer title="Next Scheduled Posts" subtitle="Coming soon to your feed">
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl glass hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-accent-pink transition-colors">Digital Strategy Update</h4>
                  <p className="text-xs text-text-muted mt-1">Scheduled for Instagram, LinkedIn, and X.</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-accent-cyan block font-bold uppercase">Today</span>
                  <span className="text-[10px] text-text-muted block font-bold uppercase">18:30</span>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>
    </div>
  );
}
