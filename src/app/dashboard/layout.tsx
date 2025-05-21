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
      <aside className="w-64 bg-gray-800 text-white p-5 space-y-4">
        <h2 className="text-xl font-bold">My Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/" className="hover:text-blue-400">Home</Link>
          <Link href="/blog/create" className="hover:text-blue-400">Create Blog</Link>
          <Link href="/dashboard/MyBlog" className="hover:text-blue-400">My Blogs</Link>
        </nav>
        <div className="absoulte bottom-0">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-6 bg-gray-800">{children}</main>
    </div>
  );
}
