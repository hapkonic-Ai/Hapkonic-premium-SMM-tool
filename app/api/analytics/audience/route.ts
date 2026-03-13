import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const { searchParams } = new URL(request.url);
  const platforms = searchParams.getAll("platforms");

  const connectedAccounts = await db.socialAccount.findMany({
    where: { userId: (session.user as any).id },
    select: { platform: true }
  });
  
  const connectedPlatformNames = connectedAccounts.map((a: { platform: any }) => a.platform.toString());
  const hasConnections = connectedPlatformNames.length > 0;

  const demographics = [
    { name: "18-24", value: hasConnections ? 35 : 0 },
    { name: "25-34", value: hasConnections ? 42 : 0 },
    { name: "35-44", value: hasConnections ? 15 : 0 },
    { name: "45-54", value: hasConnections ? 5 : 0 },
    { name: "55+", value: hasConnections ? 3 : 0 },
  ];

  const geoDistribution = [
    { country: "United States", followers: hasConnections ? 45000 : 0 },
    { country: "India", followers: hasConnections ? 22000 : 0 },
    { country: "United Kingdom", followers: hasConnections ? 12000 : 0 },
  ];

  return NextResponse.json({
    demographics,
    geoDistribution,
    genderSplit: [
      { name: "Female", value: hasConnections ? 58 : 0 },
      { name: "Male", value: hasConnections ? 38 : 0 },
      { name: "Other", value: hasConnections ? 4 : 0 },
    ],
  });
}
