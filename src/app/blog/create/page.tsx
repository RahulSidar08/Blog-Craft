"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
type BlogInputs = {
  title: string;
  content: string;
  status: "draft" | "published";
  tag: "Education" | "Tech" | "Travel" | "Entertainment" | "Other";
};

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogInputs>();
  const router = useRouter()

  const onSubmit: SubmitHandler<BlogInputs> = async (data) => {
    try {
      console.log("Submitting signup data:", data);

      const response = await axios.post("http://localhost:3000/api/blog/publish", data, { withCredentials: true });

      if (response.status === 201 || response.status === 200) {
        toast.success("Blog Published successful!");
        console.log(" response:", response.data);
        setTimeout(() => {
          router.push("/")
        }, 3000);
        // Optionally redirect or reset form
      } else {
        toast.error("Something went wrong. Please try again.");
        console.warn("Unexpected response:", response);
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "An error occurred during login.";
        toast.error(message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>

      <div className="w-full flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-2xl space-y-4">
          <h1 className="text-3xl font-bold text-center">Create a New Blog</h1>


          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block font-semibold mb-1">Title</label>
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                id="title"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Blog Title"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block font-semibold mb-1">Content</label>
              <textarea
                {...register("content", { required: "Content is required" })}
                id="content"
                rows={6}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                placeholder="Write your blog here..."
              />
              {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block font-semibold mb-1">Status</label>
              <select
                {...register("status", { required: "Status is required" })}
                id="status"
                className="w-full px-3 py-2 border bg-black rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="">Select status</option>
                <option value="draft">Save as Draft</option>
                <option value="published">Published</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            {/* Tag */}
            <div>
              <label htmlFor="tag" className="block font-semibold mb-1">Tag</label>
              <select
                {...register("tag", { required: "Tag is required" })}
                id="tag"
                className="w-full px-3 py-2 border bg-black rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="">Select tag</option>
                <option value="Education">Education</option>
                <option value="Tech">Tech</option>
                <option value="Travel">Travel</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Other">Other</option>
              </select>
              {errors.tag && <p className="text-red-500 text-sm">{errors.tag.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-900 text-white py-2 rounded-md transition"
            >
              Create Blog
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
