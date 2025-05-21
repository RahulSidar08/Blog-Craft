import BlogModel from "@/model/BlogModel";
import { NextResponse } from "next/server";
import connectDb from "@/lib/ConnectDb";


export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDb();

    const { id } = params;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, blog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blog by id:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDb();

    const params = await context.params;
    const id = params.id;

    const updates = await request.json();

    console.log("PATCH updates received:", updates);

    const allowedFields = ['title', 'content', 'status', 'tag'];
    const updateFields = Object.keys(updates);
    const isValidOperation = updateFields.every(field => allowedFields.includes(field));

    if (!isValidOperation) {
      console.log("Invalid update fields detected:", updateFields);
      return NextResponse.json({ success: false, message: "Invalid update fields" }, { status: 400 });
    }

    if (updates.status) {
      const validStatus = ["draft", "published"];
      if (!validStatus.includes(updates.status)) {
        console.log("Invalid status value:", updates.status);
        return NextResponse.json({ success: false, message: "Invalid status value" }, { status: 400 });
      }
    }

    if (updates.tag) {
      const validTags = ["Education", "Tech", "Travel", "Entertainment", "Other"];
      if (!validTags.includes(updates.tag)) {
        console.log("Invalid tag value:", updates.tag);
        return NextResponse.json({ success: false, message: "Invalid tag value" }, { status: 400 });
      }
    }

    const updatedBlog = await BlogModel.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedBlog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Blog updated successfully", blog: updatedBlog }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
