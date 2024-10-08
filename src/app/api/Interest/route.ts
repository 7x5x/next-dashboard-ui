import { IInterest } from "@/backend/modules/Interest"; 
import { InterestServices } from "@/backend/services/Interest";
import connectDB from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Ensure database connection
    await connectDB();

    // Fetch gender data
    const genderData = await InterestServices.getAllInterestData();

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

export async function POST(request: NextRequest) {
  try {
    // Ensure database connection
    await connectDB();

    // Parse the request body (ensure it's JSON and typed as IGenderData)
    const body: IInterest = await request.json();

    // Create new gender data using the parsed body
    const genderData = await InterestServices.createInterestData(body);

    // Return the created data as a response
    return NextResponse.json(genderData);
  } catch (error: any) {
    // Handle errors, returning the error message with status 500
    return NextResponse.json(
      { error: error.message || "Error processing gender data" },
      { status: 500 }
    );
  }
}
