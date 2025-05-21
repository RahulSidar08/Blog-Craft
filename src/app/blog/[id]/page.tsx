"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const blogId = params.id;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [blogData, setBlogData] = useState<any | null>(null);

    useEffect(() => {
        async function fetchBlog() {
            if (!blogId) {
                setLoading(false);
                setError("No blog ID provided.");
                return;
            }

            try {
                const res = await axios.get(`/api/blog/${blogId}`, { withCredentials: true });
                setBlogData(res.data.blog);
                setError(null);
            } catch (err) {
                console.error("Failed to load blog:", err);
                setError("Failed to load blog data.");
                toast.error("Failed to load blog data.");
            } finally {
                setLoading(false);
            }
        }

        fetchBlog();
    }, [blogId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!blogData) return <p>No blog found.</p>;

    return (
        <>
            <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition">
                <h2 className="text-xl font-semibold text-blue-700 mb-2">
                    <Link href={`/edit/${blogData._id}`}>{blogData.title}</Link>
                </h2>
                <p className="text-sm text-gray-600 mb-3">{blogData.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="capitalize">
                        Status: <strong>{blogData.status}</strong>
                    </span>
                    <span>{new Date(blogData.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="mt-4">
                    <Link href={`/blog/edit/${blogData._id}`} className="text-sm text-blue-500 hover:underline">
                        Edit →
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </>

    );
}
