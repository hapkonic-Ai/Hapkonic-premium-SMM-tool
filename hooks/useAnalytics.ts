"use client";

import { useFilterStore } from "@/stores/useFilterStore";
import { useQuery } from "@tanstack/react-query";

interface AnalyticsParams {
  platforms?: string[];
  from?: Date;
  to?: Date;
}

const fetchAnalytics = async (endpoint: string, params: AnalyticsParams) => {
  const searchParams = new URLSearchParams();
  if (params.platforms) {
    params.platforms.forEach(p => searchParams.append("platforms", p));
  }
  if (params.from) searchParams.append("from", params.from.toISOString());
  if (params.to) searchParams.append("to", params.to.toISOString());

  const response = await fetch(`/api/analytics/${endpoint}?${searchParams.toString()}`);
  if (!response.ok) throw new Error("Failed to fetch analytics");
  return response.json();
};

export const useOverview = () => {
  const { selectedPlatforms, dateRange } = useFilterStore();
  return useQuery({
    queryKey: ["analytics", "overview", selectedPlatforms, dateRange],
    queryFn: () => fetchAnalytics("overview", { platforms: selectedPlatforms, from: dateRange.from, to: dateRange.to }),
  });
};

export const useAudience = () => {
  const { selectedPlatforms, dateRange } = useFilterStore();
  return useQuery({
    queryKey: ["analytics", "audience", selectedPlatforms, dateRange],
    queryFn: () => fetchAnalytics("audience", { platforms: selectedPlatforms, from: dateRange.from, to: dateRange.to }),
  });
};

export const useContent = () => {
  const { selectedPlatforms, dateRange } = useFilterStore();
  return useQuery({
    queryKey: ["analytics", "content", selectedPlatforms, dateRange],
    queryFn: () => fetchAnalytics("content", { platforms: selectedPlatforms, from: dateRange.from, to: dateRange.to }),
  });
};

export const useEngagement = () => {
  const { selectedPlatforms, dateRange } = useFilterStore();
  return useQuery({
    queryKey: ["analytics", "engagement", selectedPlatforms, dateRange],
    queryFn: () => fetchAnalytics("engagement", { platforms: selectedPlatforms, from: dateRange.from, to: dateRange.to }),
  });
};

export const useSentiment = () => {
  const { selectedPlatforms, dateRange } = useFilterStore();
  return useQuery({
    queryKey: ["analytics", "sentiment", selectedPlatforms, dateRange],
    queryFn: () => fetchAnalytics("sentiment", { platforms: selectedPlatforms, from: dateRange.from, to: dateRange.to }),
  });
};

export const useCompetitors = () => {
  const { selectedPlatforms, dateRange } = useFilterStore();
  return useQuery({
    queryKey: ["analytics", "competitors", selectedPlatforms, dateRange],
    queryFn: () => fetchAnalytics("competitors", { platforms: selectedPlatforms, from: dateRange.from, to: dateRange.to }),
  });
};

export const useAlerts = () => {
  const { selectedPlatforms, dateRange } = useFilterStore();
  return useQuery({
    queryKey: ["analytics", "alerts", selectedPlatforms, dateRange],
    queryFn: () => fetchAnalytics("alerts", { platforms: selectedPlatforms, from: dateRange.from, to: dateRange.to }),
  });
};
