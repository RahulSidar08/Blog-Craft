"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/")
  }
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#121010] shadow-2xl text-white p-5 space-y-4">
        <nav className="flex flex-col space-y-4 mt-10 max-w-xs mx-auto">
          <Link
            href="/blog/create"
            className="block px-6 py-3 bg-blue-600 rounded-md text-white font-medium text-center
               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            Create Blog
          </Link>
          <Link
            href="/dashboard/MyBlog"
            className="block px-6 py-3 bg-blue-600 rounded-md text-white font-medium text-center
               hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            My Blogs
          </Link>

          <button
            onClick={handleLogout}
            className="px-6 py-3 w-full mt-20 bg-red-600 hover:bg-red-700 text-white font-semibold rounded shadow transition"
          >
            Logout
          </button>

        </nav>

      </aside>
      <main className="flex-1 p-6 bg-[#0a0a0a]">{children}</main>
    </div>
  );
}
