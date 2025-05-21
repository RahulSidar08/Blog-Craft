"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
const [tokenData, setTokenData] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("cookie data", token)
    setTokenData(token)

  },[])
  return (
      <header className="w-full mx-auto flex justify-between items-center bg-black shadow-md px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">BlogCraft</h1>
        <nav className="flex space-x-6 text-white text-xl">
          <Link href="/" className=" hover:text-blue-600">Home</Link>
          <Link href="/blog" className=" hover:text-blue-600">Blogs</Link>

          {
            tokenData ? (
              <Link href="/dashboard" className=" hover:text-blue-600">Dashboard</Link>
            ) : (
              <div className="flex space-x-3">
                <Link href="/login" className=" hover:text-blue-600">Login</Link>
                <Link href="/signup" className=" hover:text-blue-600">signup</Link>
              </div>
            )
          }

        </nav>
      </header>

  );
}
