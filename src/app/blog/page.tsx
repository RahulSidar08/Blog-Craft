'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Blog {
  _id: string;
  title: string;
  content?: string;
  status: 'draft' | 'published';
  tag?: string;
  updatedAt: string;
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blog');
        const data = res.data;
        const publishedBlogs = data.blogs.filter(
          (blog: Blog) => blog.status === 'published'
        );
        setBlogs(publishedBlogs);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center"> Blogs</h1>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">Loading.....</p>
      ) : (
        <div className="flex flex-col gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="border rounded-xl p-5 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">
                <Link href={`/edit/${blog._id}`}>{blog.title}</Link>
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                {blog.content
                  ? blog.content.slice(0, 100) + '...'
                  : 'No preview available'}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="capitalize">
                  Status: <strong>{blog.status}</strong>
                </span>
                <span>{new Date(blog.updatedAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-4">
                <Link
                  href={`/blog/${blog._id}`}
                  className="text-sm text-blue-500 hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
