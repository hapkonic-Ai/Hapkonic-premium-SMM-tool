import { NextResponse } from "next/server";
import { subDays, format, startOfDay } from "date-fns";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const platforms = searchParams.getAll("platforms");

  // Mock data generation
  const days = 30;
  const growthData = Array.from({ length: days }).map((_, i) => ({
    date: format(subDays(new Date(), days - i), "MMM dd"),
    Instagram: Math.floor(Math.random() * 100) + 10,
    Facebook: Math.floor(Math.random() * 50) + 5,
    Twitter: Math.floor(Math.random() * 80) + 8,
    LinkedIn: Math.floor(Math.random() * 30) + 2,
  }));

  const platformBreakdown = [
    { name: "Instagram", value: 45200 },
    { name: "Facebook", value: 28400 },
    { name: "Twitter", value: 32100 },
    { name: "LinkedIn", value: 12500 },
    { name: "TikTok", value: 18900 },
  ];

  const metrics = {
    totalFollowers: 137100,
    followerGrowth: 12.5,
    totalReach: 842000,
    reachGrowth: 8.2,
    engagementRate: 4.8,
    engagementGrowth: -1.2,
    totalImpressions: 2400000,
    impressionsGrowth: 15.4,
  };

  return NextResponse.json({
    metrics,
    growthData,
    platformBreakdown,
  });
}
