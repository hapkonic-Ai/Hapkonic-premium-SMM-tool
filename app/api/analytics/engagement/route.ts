import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { format, subDays } from "date-fns";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const connectedAccounts = await db.socialAccount.findMany({
    where: { userId: (session.user as any).id },
    select: { platform: true }
  });
  
  const hasConnections = connectedAccounts.length > 0;

  const days = 30;
  const engagementTrend = Array.from({ length: days }).map((_, i) => ({
    date: format(subDays(new Date(), days - i), "MMM dd"),
    likes: hasConnections ? Math.floor(Math.random() * 500) + 100 : 0,
    comments: hasConnections ? Math.floor(Math.random() * 100) + 20 : 0,
    shares: hasConnections ? Math.floor(Math.random() * 50) + 5 : 0,
    saves: hasConnections ? Math.floor(Math.random() * 80) + 10 : 0,
  }));

  return NextResponse.json({
    engagementTrend,
    engagementByType: [
      { type: "Polls", engagement: hasConnections ? 15.2 : 0 },
      { type: "Q&A", engagement: hasConnections ? 12.8 : 0 },
      { type: "Direct Messages", engagement: hasConnections ? 8.5 : 0 },
      { type: "Reactions", engagement: hasConnections ? 22.1 : 0 },
    ],
  });
}
