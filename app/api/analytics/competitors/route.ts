import { NextResponse } from "next/server";

export async function GET() {
  const competitorShare = [
    { name: "Your Brand", value: 32 },
    { name: "Competitor A", value: 28 },
    { name: "Competitor B", value: 22 },
    { name: "Others", value: 18 },
  ];

  const metrics = [
    {
      metric: "Avg. Engagement",
      you: 4.8,
      avg: 3.2,
      best: 5.5,
    },
    {
      metric: "Post Frequency",
      you: 12,
      avg: 8,
      best: 15,
    },
    {
      metric: "Follower Growth",
      you: 12.5,
      avg: 5.2,
      best: 14.1,
    },
  ];

  const topPosts = [
    {
      id: "cp1",
      competitor: "Competitor A",
      text: "Our new spring collection is live! ✨",
      engagement: "8.2%",
      platform: "INSTAGRAM",
    },
    {
      id: "cp2",
      competitor: "Competitor B",
      text: "Don't miss our upcoming webinar on digital transformation.",
      engagement: "4.1%",
      platform: "LINKEDIN",
    },
  ];

  return NextResponse.json({
    competitorShare,
    metrics,
    topPosts,
  });
}
