import BlogModel from "@/model/BlogModel";
import { NextResponse } from "next/server";
import connectDb from "@/lib/ConnectDb";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    await connectDb();

    const { title, content, status, tag } = await request.json();

    if (!title || !content || !status || !tag) {
      return NextResponse.json(
        { success: false, message: "All fields are mandatory" },
        { status: 400 }
      );
    }

    const validStatus = ["draft", "published"];
    const validTags = ["Education", "Tech", "Travel", "Entertainment", "Other"];

    if (!validStatus.includes(status) || !validTags.includes(tag)) {
      return NextResponse.json(
        { success: false, message: "Invalid status or tag" },
        { status: 400 }
      );
    }

    // 🔑 Extract token from cookies
const cookieStore = await cookies(); // ✅ await it
const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    // 🔓 Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid token" , error : err},
        { status: 401 }
      );
    }

    const userId = (decoded as { id: string }).id;

    // 📝 Create blog with user ID
    const newBlog = new BlogModel({
      title,
      content,
      status,
      tag,
      created_by: userId,
    });

    await newBlog.save();

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        blog: newBlog,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
