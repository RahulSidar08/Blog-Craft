import BlogModel from "@/model/BlogModel";
import { NextResponse } from "next/server";
import connectDb from "@/lib/ConnectDb";

export async function POST(request: Request) {
  try {
    await connectDb();

    const data = await request.json();
    const { _id, title, content, tag } = data;

    // Validate mandatory fields except _id (which is optional)
    if (!title || !content || !tag) {
      return NextResponse.json(
        { success: false, message: "Title, content and tag are required" },
        { status: 400 }
      );
    }

    // Validate tag enum
    const validTags = ["Education", "Tech", "Travel", "Entertainment", "Other"];
    if (!validTags.includes(tag)) {
      return NextResponse.json(
        { success: false, message: "Invalid tag value" },
        { status: 400 }
      );
    }

    if (_id) {
      // Update existing draft
      const updatedDraft = await BlogModel.findOneAndUpdate(
        { _id, status: "draft" }, // only update if status is draft
        { title, content, tag },
        { new: true }
      );

      if (!updatedDraft) {
        return NextResponse.json(
          { success: false, message: "Draft not found or not editable" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          message: "Draft updated successfully",
          draft: updatedDraft,
        },
        { status: 200 }
      );
    } else {
      // Create new draft
      const newDraft = new BlogModel({ title, content, tag, status: "draft" });
      await newDraft.save();

      return NextResponse.json(
        {
          success: true,
          message: "Draft saved successfully",
          draft: newDraft,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error saving draft:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
