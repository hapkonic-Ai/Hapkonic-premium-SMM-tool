import { NextResponse } from "next/server";

export async function GET() {
  // Mock data for reports
  const reports = [
    {
      id: "1",
      name: "Monthly Performance Review - Feb 24",
      type: "EXECUTIVE",
      status: "READY",
      createdAt: "2024-03-01T09:00:00Z",
      fileUrl: "#",
      fileSize: "4.2 MB",
    },
    {
      id: "2",
      name: "Q1 Audience Sentiment Analysis",
      type: "SENTIMENT",
      status: "GENERATING",
      createdAt: "2024-03-12T14:30:00Z",
      fileUrl: null,
      fileSize: "Calculating...",
    },
    {
      id: "3",
      name: "Competitor Benchmarking Q4",
      type: "COMPETITIVE",
      status: "READY",
      createdAt: "2024-01-05T11:20:00Z",
      fileUrl: "#",
      fileSize: "2.8 MB",
    }
  ];

  return NextResponse.json(reports);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    return NextResponse.json({ id: "rep-" + Date.now(), status: "GENERATING", ...data }, { status: 201 });
  } catch (error) {
    return new NextResponse("Invalid report configuration", { status: 400 });
  }
}
