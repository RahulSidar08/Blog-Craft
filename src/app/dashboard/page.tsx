"use client";


export default function Page() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <p className="mt-2 text-white">
          Welcome back! Manage your blogs and account here.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          className="block p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">Create New Blog</h2>
          <p className="text-sm">
            Start writing a new blog post and share your thoughts.
          </p>
        </div>

        <div
          className="block p-6 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">View All Blogs</h2>
          <p className="text-sm">
            See and manage all your published and draft blogs.
          </p>
        </div>
      </div>
    </div>
  );
}
