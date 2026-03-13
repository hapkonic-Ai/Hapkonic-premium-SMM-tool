import { NextResponse } from "next/server";

export async function GET() {
  // Mock data for scheduled posts
  const posts = [
    {
      id: "1",
      platform: "instagram",
      type: "IMAGE",
      content: "Chasing sunsets with the new Summer 2024 collection. 🌅 #Hapkonic #SummerVibes",
      mediaUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&fit=crop",
      scheduledAt: "2024-03-15T18:00:00Z",
      status: "SCHEDULED",
      account: "@hapkonic_official",
    },
    {
      id: "2",
      platform: "twitter",
      type: "TEXT",
      content: "The future of social intelligence is here. Stay tuned for our Q2 roadmap! 🚀 #SMM #AI",
      scheduledAt: "2024-03-14T10:00:00Z",
      status: "SCHEDULED",
      account: "@hapkonic_ai",
    },
    {
      id: "3",
      platform: "facebook",
      type: "VIDEO",
      content: "Behind the scenes: How we built the Hapkonic engine. 🛠️",
      mediaUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&fit=crop",
      scheduledAt: "2024-03-16T14:30:00Z",
      status: "DRAFT",
      account: "Hapkonic Global",
    },
    {
      id: "4",
      platform: "instagram",
      type: "CAROUSEL",
      content: "5 ways to boost your engagement rate using AI. 📈",
      mediaUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop",
      scheduledAt: "2024-03-12T09:00:00Z",
      status: "PUBLISHED",
      account: "@hapkonic_official",
    }
  ];

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    return NextResponse.json({ id: Math.random().toString(36).substr(2, 9), ...data }, { status: 201 });
  } catch (error) {
    return new NextResponse("Invalid post data", { status: 400 });
  }
}
