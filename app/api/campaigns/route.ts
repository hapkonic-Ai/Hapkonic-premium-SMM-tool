import { NextResponse } from "next/server";

export async function GET() {
  // Mock data for campaigns
  const campaigns = [
    {
      id: "1",
      name: "Summer Launch 2024",
      status: "ACTIVE",
      budget: 5000,
      spent: 3200,
      spentPercentage: 64,
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      platforms: ["instagram", "facebook"],
      postCount: 12,
      engagementRate: 4.8,
      reach: 450000,
    },
    {
      id: "2",
      name: "Holiday Special",
      status: "PLANNED",
      budget: 12000,
      spent: 0,
      spentPercentage: 0,
      startDate: "2024-11-15",
      endDate: "2025-01-05",
      platforms: ["instagram", "twitter", "facebook"],
      postCount: 24,
      engagementRate: 0,
      reach: 0,
    },
    {
      id: "3",
      name: "Brand Awareness Q2",
      status: "COMPLETED",
      budget: 3500,
      spent: 3450,
      spentPercentage: 98,
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      platforms: ["instagram", "twitter"],
      postCount: 8,
      engagementRate: 5.2,
      reach: 180000,
    },
    {
      id: "4",
      name: "Influencer Collab X",
      status: "PAUSED",
      budget: 2000,
      spent: 1500,
      spentPercentage: 75,
      startDate: "2024-07-10",
      endDate: "2024-08-10",
      platforms: ["instagram"],
      postCount: 3,
      engagementRate: 8.4,
      reach: 75000,
    }
  ];

  return NextResponse.json(campaigns);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    return NextResponse.json({ id: "new-id", ...data }, { status: 201 });
  } catch (error) {
    return new NextResponse("Invalid data", { status: 400 });
  }
}
