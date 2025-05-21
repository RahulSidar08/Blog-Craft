export default function Footer() {
  return (
    <footer className="bg-black py-4 mt-40 border-t w-full">
      <div className="max-w-6xl mx-auto px-6 text-center text-white text-sm select-none">
        © {new Date().getFullYear()} BlogCraft. All rights reserved.
      </div>
    </footer>

  );
}
