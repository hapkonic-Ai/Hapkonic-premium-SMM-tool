import { NextResponse } from "next/server";
import { subDays, format } from "date-fns";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const { searchParams } = new URL(request.url);
  const platforms = searchParams.getAll("platforms");

  // Fetch connected accounts for this user
  const connectedAccounts = await db.socialAccount.findMany({
    where: { userId: (session.user as any).id },
    select: { platform: true }
  });
  
  const connectedPlatformNames = connectedAccounts.map((a: { platform: any }) => a.platform.toString());
  
  // Filter by requested platforms, or all connected if none specified
  const filteredPlatforms = platforms.length > 0 
    ? platforms.filter(p => connectedPlatformNames.includes(p.toUpperCase()))
    : connectedPlatformNames;

  // Mock data generation scaled to connected platforms
  const days = 30;
  const growthData = Array.from({ length: days }).map((_, i) => {
    const data: any = { date: format(subDays(new Date(), days - i), "MMM dd") };
    filteredPlatforms.forEach((p: string) => {
      data[p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()] = Math.floor(Math.random() * (p === "INSTAGRAM" ? 100 : 50)) + 5;
    });
    return data;
  });

  const platformBreakdown = filteredPlatforms.map((p: string) => ({
    name: p.charAt(0).toUpperCase() + p.slice(1).toLowerCase(),
    value: Math.floor(Math.random() * 50000) + 10000
  }));

  const metrics = {
    totalFollowers: platformBreakdown.reduce((acc: number, curr: { value: number }) => acc + curr.value, 0),
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
