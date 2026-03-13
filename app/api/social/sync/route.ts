import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new NextResponse("Unauthorized", { status: 401 });

  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");

  if (!platform) {
    return NextResponse.json({ error: "Platform is required" }, { status: 400 });
  }

  const socialAccount = await db.socialAccount.findFirst({
    where: {
      userId: (session.user as any).id,
      platform: platform.toUpperCase() as any
    }
  });

  if (!socialAccount) {
    return NextResponse.json({ error: "Account not connected" }, { status: 404 });
  }

  // TODO: Implement actual API calls to IG/FB/TW/LI using socialAccount.accessToken
  // For now we mock the data sync
  
  await db.socialAccount.update({
    where: { id: socialAccount.id },
    data: {
      followerCount: Math.floor(Math.random() * 50000) + 5000,
      updatedAt: new Date()
    }
  });

  // Create a snapshot
  await db.audienceSnapshot.create({
    data: {
      accountId: socialAccount.id,
      totalFollowers: Math.floor(Math.random() * 50000) + 5000,
      demographics: {
        age: { "18-24": 25, "25-34": 45, "35-44": 20, "45+": 10 },
        gender: { male: 40, female: 60 }
      }
    }
  });

  return NextResponse.json({ success: true, message: `Synced ${platform} successfully` });
}
