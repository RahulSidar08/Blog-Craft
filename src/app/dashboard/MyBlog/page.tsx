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

export default function Page() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filter, setFilter] = useState<'all' | 'draft' | 'published'>('all');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/api/blog');
        const data = res.data;

        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else {
          console.error('Invalid blog data format:', data);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    filter === 'all' ? true : blog.status === filter
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      <div className="flex gap-4 justify-center mb-8">
        {['all', 'draft', 'published'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as 'all' | 'draft' | 'published')}
            className={`px-4 py-1 rounded-full text-sm font-medium border ${
              filter === f
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {filteredBlogs.map((blog) => (
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
