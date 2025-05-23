import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen-[200px]">
      <main className="flex-grow">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
