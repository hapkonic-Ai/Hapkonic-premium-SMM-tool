import { NextResponse } from "next/server";

export async function GET() {
  const demographics = [
    { name: "18-24", value: 35 },
    { name: "25-34", value: 42 },
    { name: "35-44", value: 15 },
    { name: "45-54", value: 5 },
    { name: "55+", value: 3 },
  ];

  const geoDistribution = [
    { country: "United States", followers: 45000 },
    { country: "United Kingdom", followers: 12000 },
    { country: "Germany", followers: 8500 },
    { country: "India", followers: 22000 },
    { country: "Canada", followers: 7200 },
  ];

  const genderSplit = [
    { name: "Female", value: 58 },
    { name: "Male", value: 38 },
    { name: "Other", value: 4 },
  ];

  return NextResponse.json({
    demographics,
    geoDistribution,
    genderSplit,
  });
}
