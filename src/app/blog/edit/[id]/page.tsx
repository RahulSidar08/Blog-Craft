"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type BlogInputs = {
  title: string;
  content: string;
  status: "draft" | "published";
  tag: "Education" | "Tech" | "Travel" | "Entertainment" | "Other";
};

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id;
  console.log("blog id", blogId);

  const { register, handleSubmit, reset } = useForm<BlogInputs>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      if (!blogId) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`/api/blog/${blogId}`);
        // Reset form only with the blog object, NOT the whole response
        reset(res.data.blog);
        setError(null);
      } catch (err) {
        console.error("Failed to load blog:", err);
        setError("Failed to load blog data.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [blogId, reset]);

  const onSubmit: SubmitHandler<BlogInputs> = async (data) => {
    if (!blogId) {
      toast.error("Blog ID is missing.");
      return;
    }

    // Send only allowed fields to update
    const updates = {
      title: data.title,
      content: data.content,
      status: data.status,
      tag: data.tag,
    };

    console.log("data to update", updates);

    try {
      await axios.patch(`/api/blog/${blogId}`, updates);
      toast.success("Blog updated!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    }
  };

  if (loading) return <div>Loading blog...</div>;

  if (error) return <div className="text-red-600 text-center mt-4">{error}</div>;

  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xl p-6 shadow rounded space-y-4">
        <h1 className="text-2xl font-bold text-center">Edit Blog</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <label>Title</label>
            <input
              {...register("title", { required: true })}
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Content</label>
            <textarea
              {...register("content", { required: true })}
              rows={5}
              className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Status</label>
            <select
              {...register("status")}
              className="px-3 py-2 border bg-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label>Tag</label>
            <select
              {...register("tag")}
              className="px-3 py-2 border bg-black rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Education">Education</option>
              <option value="Tech">Tech</option>
              <option value="Travel">Travel</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-700 hover:bg-blue-900 text-white rounded"
          >
            Update Blog
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
