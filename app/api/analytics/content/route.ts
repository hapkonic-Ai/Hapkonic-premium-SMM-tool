import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const connectedAccounts = await db.socialAccount.findMany({
    where: { userId: (session.user as any).id },
    select: { platform: true }
  });
  
  const hasConnections = connectedAccounts.length > 0;

  const topPosts = hasConnections ? [
    {
      id: "1",
      platform: "Instagram",
      type: "REEL",
      caption: "Our summer collection is finally here! 🌴 #fashion #summer",
      engagement: 12543,
      reach: 45000,
      likes: 11200,
      comments: 1343,
      date: "2024-06-12",
      thumbnail: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop"
    },
    {
      id: "2",
      platform: "LinkedIn",
      type: "ARTICLE",
      caption: "How Hapkonic is revolutionizing SMM with AI-driven insights.",
      engagement: 3421,
      reach: 12000,
      likes: 2900,
      comments: 521,
      date: "2024-06-10",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop"
    }
  ] : [];

  return NextResponse.json({
    topPosts,
    contentMix: [
      { type: "Video", value: 45 },
      { type: "Images", value: 30 },
      { type: "Links", value: 15 },
      { type: "Text", value: 10 },
    ]
  });
}
