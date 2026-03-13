import { NextResponse } from "next/server";

export async function GET() {
  // Mock data for unified inbox
  const messages = [
    {
      id: "1",
      platform: "instagram",
      type: "comment",
      body: "This new summer collection looks absolutely stunning! When is the release date?",
      author: {
        name: "alex_travels",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      },
      sentiment: "POSITIVE",
      sentimentScore: 0.92,
      timestamp: "2024-03-13T10:30:00Z",
      status: "UNREAD",
      postContext: {
        id: "post123",
        thumbnail: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=100&h=100&fit=crop",
      }
    },
    {
      id: "2",
      platform: "twitter",
      type: "mention",
      body: "Hey @Hapkonic, I'm having trouble with my subscription. Can you help?",
      author: {
        name: "tech_guru",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guru",
      },
      sentiment: "NEGATIVE",
      sentimentScore: 0.25,
      timestamp: "2024-03-13T09:15:00Z",
      status: "UNREAD",
    },
    {
      id: "3",
      platform: "facebook",
      type: "message",
      body: "I love the new dashboard features! Great job team.",
      author: {
        name: "Sarah Miller",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      },
      sentiment: "POSITIVE",
      sentimentScore: 0.98,
      timestamp: "2024-03-12T18:45:00Z",
      status: "READ",
    },
    {
      id: "4",
      platform: "instagram",
      type: "dm",
      body: "Checking in on the partnership details we discussed yesterday!",
      author: {
        name: "fashion_weekly",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Weekly",
      },
      sentiment: "NEUTRAL",
      sentimentScore: 0.55,
      timestamp: "2024-03-12T14:20:00Z",
      status: "READ",
    },
    {
      id: "5",
      platform: "twitter",
      type: "retweet",
      body: "RT: Check out the latest analytics report from Hapkonic!",
      author: {
        name: "data_explorer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Data",
      },
      sentiment: "POSITIVE",
      sentimentScore: 0.85,
      timestamp: "2024-03-12T11:10:00Z",
      status: "READ",
    }
  ];

  return NextResponse.json(messages);
}
