export default function Footer() {
  return (
    <footer className="bg-black py-4 mt-10 border-t">
      <div className="max-w-6xl mx-auto px-4 text-center text-white text-sm">
        © {new Date().getFullYear()} BlogCraft. All rights reserved.
      </div>
    </footer>
  );
}
