import { NextResponse } from "next/server";

export async function GET() {
  const alerts = [
    {
      id: "a1",
      severity: "HIGH",
      type: "ANOMALY",
      title: "Sudden Drop in Engagement",
      description: "Instagram engagement dropped by 24% in the last 6 hours compared to your average.",
      date: "10 mins ago",
    },
    {
      id: "a2",
      severity: "MEDIUM",
      type: "OPPORTUNITY",
      title: "Trending Topic: #Web3",
      description: "Your followers are increasingly discussing #Web3. Consider creating content in this niche.",
      date: "2 hours ago",
    },
    {
      id: "a3",
      severity: "LOW",
      type: "MILESTONE",
      title: "100K Followers Milestone",
      description: "Congratulations! You've reached 100,000 total followers across all platforms.",
      date: "5 hours ago",
    },
  ];

  return NextResponse.json({ alerts });
}
