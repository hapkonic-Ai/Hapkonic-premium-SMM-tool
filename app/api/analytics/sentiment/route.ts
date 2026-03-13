import { NextResponse } from "next/server";
import { format, subDays } from "date-fns";

export async function GET() {
  const sentimentStats = [
    { name: "Positive", value: 65 },
    { name: "Neutral", value: 25 },
    { name: "Negative", value: 10 },
  ];

  const timeline = Array.from({ length: 30 }).map((_, i) => ({
    date: format(subDays(new Date(), 30 - i), "MMM dd"),
    positive: Math.floor(Math.random() * 40) + 50,
    negative: Math.floor(Math.random() * 20),
    neutral: Math.floor(Math.random() * 20) + 10,
  }));

  const mentions = [
    {
      id: "m1",
      user: "tech_guru",
      text: "Hapkonic's new 3D dashboard is absolutely mind-blowing! Best UX in the game. 🔥",
      sentiment: "POSITIVE",
      platform: "INSTAGRAM",
      date: "2h ago",
    },
    {
      id: "m2",
      user: "social_master",
      text: "Trying to connect my LinkedIn but getting a timeout error. Hope it gets fixed soon.",
      sentiment: "NEGATIVE",
      platform: "LINKEDIN",
      date: "5h ago",
    },
    {
      id: "m3",
      user: "brand_manager",
      text: "The new analytics reports are quite detailed. Good update.",
      sentiment: "POSITIVE",
      platform: "FACEBOOK",
      date: "8h ago",
    },
  ];

  return NextResponse.json({
    sentimentStats,
    timeline,
    mentions,
  });
}
