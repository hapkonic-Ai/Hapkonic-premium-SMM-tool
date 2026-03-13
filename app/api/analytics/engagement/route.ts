import { NextResponse } from "next/server";
import { format, subDays } from "date-fns";

export async function GET() {
  const days = 30;
  const engagementTrend = Array.from({ length: days }).map((_, i) => ({
    date: format(subDays(new Date(), days - i), "MMM dd"),
    likes: Math.floor(Math.random() * 500) + 100,
    comments: Math.floor(Math.random() * 100) + 20,
    shares: Math.floor(Math.random() * 50) + 5,
    saves: Math.floor(Math.random() * 80) + 10,
  }));

  const engagementByType = [
    { type: "Polls", engagement: 15.2 },
    { type: "Q&A", engagement: 12.8 },
    { type: "Direct Messages", engagement: 8.5 },
    { type: "Reactions", engagement: 22.1 },
  ];

  return NextResponse.json({
    engagementTrend,
    engagementByType,
  });
}
