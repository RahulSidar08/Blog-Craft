import BlogModel from "@/model/BlogModel";
import { NextResponse } from "next/server";
import connectDb from "@/lib/ConnectDb";

export async function GET() {
  try {
    await connectDb();

    const blogs = await BlogModel.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        blogs,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
