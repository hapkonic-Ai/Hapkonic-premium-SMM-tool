import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");

  // Protect the cron endpoint with a secret key
  if (key !== process.env.CRON_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    console.log("Starting master sync cron job...");

    // 1. Fetch all accounts that haven't been synced in the last 24 hours
    const accountsToSync = await db.socialAccount.findMany({
      where: {
        updatedAt: {
          lt: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      }
    });

    console.log(`Found ${accountsToSync.length} accounts to sync.`);

    // 2. Perform sync for each account (Mocking actual API calls for now)
    for (const account of accountsToSync) {
      // Create a fresh snapshot
      await db.audienceSnapshot.create({
        data: {
          accountId: account.id,
          totalFollowers: account.followerCount + Math.floor(Math.random() * 50) - 10,
          demographics: {
            age: { "18-24": 25, "25-34": 45, "35-44": 20, "45+": 10 },
            gender: { male: 40, female: 60 }
          }
        }
      });

      // Update the account
      await db.socialAccount.update({
        where: { id: account.id },
        data: {
          followerCount: account.followerCount + Math.floor(Math.random() * 50) - 10,
          updatedAt: new Date()
        }
      });
    }

    // 3. Check for new alerts (e.g., negative sentiment spikes)
    // This is where AI logic would trigger alerts

    return NextResponse.json({ 
      success: true, 
      processed: accountsToSync.length,
      timestamp: new Date().toISOString() 
    });
  } catch (error: any) {
    console.error("Cron Job Failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
