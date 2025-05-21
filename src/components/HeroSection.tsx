import Link from "next/link";

export default function HeroSection() {

  return (
    <section className="bg-[#0a0a0a] py-24 px-6 w-full">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
          Welcome to <span className="text-blue-500">BlogCraft</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          Discover inspiring articles, share your stories, and draft your ideas effortlessly.
        </p>
        <Link
          href="/blog"
          className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Explore Blogs
        </Link>
      </div>
    </section>
  );
}
