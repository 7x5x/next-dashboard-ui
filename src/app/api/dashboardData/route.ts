 
import { DashboardServices } from "@/backend/services/DashboardServices"; 
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Ensure database connection
    await connectDB();

    // Fetch gender data
    const genderData = await DashboardServices.getAllDashboardData();

    // Return the fetched data
    return NextResponse.json(genderData);
  } catch (error: any) {
    // Handle errors, returning the error message
    return NextResponse.json(
      { error: error.message || "Error fetching gender data" },
      { status: 500 }
    );
  }
}
