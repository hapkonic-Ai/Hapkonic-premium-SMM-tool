"use client";

import { motion } from "framer-motion";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { BarChart } from "@/components/charts/BarChart";
import { useContent } from "@/hooks/useAnalytics";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Play, Image as ImageIcon, Layout, Clock, Hash } from "lucide-react";

export default function ContentPage() {
  const { data, isLoading } = useContent();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-black gradient-text tracking-tighter uppercase">Content Performance</h1>
        <p className="text-text-muted text-sm uppercase tracking-[2px] font-bold">Deep-dive into your creative intelligence</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="types">Content Types</TabsTrigger>
          <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
          <TabsTrigger value="timing">Best Timing</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <GlassCard key={i} className="aspect-square animate-pulse bg-white/5" />
              ))
            ) : (
              data?.posts.map((post: any) => (
                <GlassCard key={post.id} className="group overflow-hidden border-white/5 hover:border-accent-cyan/30 transition-all duration-500">
                  <div className="aspect-video relative overflow-hidden bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <div className="absolute top-2 right-2 z-20 glass p-1 rounded-md">
                      {post.platform === "INSTAGRAM" && <Play className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-xs text-white font-bold line-clamp-2 leading-relaxed">{post.content}</p>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Reach</span>
                        <span className="text-xs font-black text-accent-cyan">{post.metrics.reach.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Engagement</span>
                        <span className="text-xs font-black text-accent-purple">{(post.metrics.engagement / 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="types">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartContainer title="Reach by Content Type" subtitle="Which formats are driving discovery?" isLoading={isLoading}>
              <BarChart 
                data={data?.contentTypeStats || []} 
                index="type" 
                categories={["reach"]} 
                colors={["#00F0FF"]}
              />
            </ChartContainer>
            <ChartContainer title="Engagement by Content Type" subtitle="Which formats resonate most with followers?" isLoading={isLoading}>
              <BarChart 
                data={data?.contentTypeStats || []} 
                index="type" 
                categories={["engagement"]} 
                colors={["#A855F7"]}
                valueFormatter={(v) => `${v}%`}
              />
            </ChartContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
