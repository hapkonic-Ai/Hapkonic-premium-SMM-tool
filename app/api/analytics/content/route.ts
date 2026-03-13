import { NextResponse } from "next/server";
import { format, subDays } from "date-fns";

export async function GET(request: Request) {
  const posts = Array.from({ length: 8 }).map((_, i) => ({
    id: `post-${i}`,
    content: `Mastering the art of digital strategy with Hapkonic ${i + 1}`,
    thumbnail: `/images/mock-post-${(i % 3) + 1}.jpg`,
    platform: ["INSTAGRAM", "FACEBOOK", "TWITTER", "LINKEDIN"][i % 4],
    publishedAt: format(subDays(new Date(), i * 2), "yyyy-MM-dd"),
    metrics: {
      reach: Math.floor(Math.random() * 15000) + 2000,
      engagement: Math.floor(Math.random() * 800) + 100,
      shares: Math.floor(Math.random() * 200) + 20,
      likes: Math.floor(Math.random() * 1000) + 500,
    },
  }));

  const contentTypeStats = [
    { type: "Video", reach: 45000, engagement: 8.4 },
    { type: "Image", reach: 28000, engagement: 5.2 },
    { type: "Carousel", reach: 35000, engagement: 7.1 },
    { type: "Story", reach: 12000, engagement: 12.5 },
  ];

  return NextResponse.json({
    posts,
    contentTypeStats,
  });
}
