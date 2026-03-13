import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const accounts = await db.socialAccount.findMany({
      where: {
        userId: (session.user as any).id,
      },
      select: {
        platform: true,
        username: true,
        profileUrl: true,
        followerCount: true,
      },
    });

    return NextResponse.json(accounts);
  } catch (error) {
    console.error("[SOCIAL_ACCOUNTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
