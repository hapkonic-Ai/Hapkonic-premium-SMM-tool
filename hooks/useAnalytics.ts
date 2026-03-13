"use client";

import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "@/stores/useFilterStore";
import { format } from "date-fns";

async function fetchAnalytics(endpoint: string, params: any) {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]: [string, any]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else {
      queryParams.append(key, value);
    }
  });

  const response = await fetch(`/api/analytics/${endpoint}?${queryParams.toString()}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function useOverview() {
  const { dateRange, selectedPlatforms } = useFilterStore();
  
  return useQuery({
    queryKey: ["analytics", "overview", dateRange, selectedPlatforms],
    queryFn: () => fetchAnalytics("overview", {
      from: format(dateRange.from, "yyyy-MM-dd"),
      to: format(dateRange.to, "yyyy-MM-dd"),
      platforms: selectedPlatforms,
    }),
  });
}

export function useContentPerformance() {
  const { dateRange, selectedPlatforms } = useFilterStore();
  
  return useQuery({
    queryKey: ["analytics", "content", dateRange, selectedPlatforms],
    queryFn: () => fetchAnalytics("content", {
      from: format(dateRange.from, "yyyy-MM-dd"),
      to: format(dateRange.to, "yyyy-MM-dd"),
      platforms: selectedPlatforms,
    }),
  });
}

export function useAudienceAnalytics() {
  const { dateRange, selectedPlatforms } = useFilterStore();
  
  return useQuery({
    queryKey: ["analytics", "audience", dateRange, selectedPlatforms],
    queryFn: () => fetchAnalytics("audience", {
      from: format(dateRange.from, "yyyy-MM-dd"),
      to: format(dateRange.to, "yyyy-MM-dd"),
      platforms: selectedPlatforms,
    }),
  });
}

export function useEngagementAnalytics() {
  const { dateRange, selectedPlatforms } = useFilterStore();
  
  return useQuery({
    queryKey: ["analytics", "engagement", dateRange, selectedPlatforms],
    queryFn: () => fetchAnalytics("engagement", {
      from: format(dateRange.from, "yyyy-MM-dd"),
      to: format(dateRange.to, "yyyy-MM-dd"),
      platforms: selectedPlatforms,
    }),
  });
}

export function useSentiment() {
  const { dateRange, selectedPlatforms } = useFilterStore();
  
  return useQuery({
    queryKey: ["analytics", "sentiment", dateRange, selectedPlatforms],
    queryFn: () => fetchAnalytics("sentiment", {
      from: format(dateRange.from, "yyyy-MM-dd"),
      to: format(dateRange.to, "yyyy-MM-dd"),
      platforms: selectedPlatforms,
    }),
  });
}

export function useCompetitors() {
  const { dateRange, selectedPlatforms } = useFilterStore();
  
  return useQuery({
    queryKey: ["analytics", "competitors", dateRange, selectedPlatforms],
    queryFn: () => fetchAnalytics("competitors", {
      from: format(dateRange.from, "yyyy-MM-dd"),
      to: format(dateRange.to, "yyyy-MM-dd"),
      platforms: selectedPlatforms,
    }),
  });
}


