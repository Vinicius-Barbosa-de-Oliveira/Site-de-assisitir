import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero"
import Footer from "@/components/Footer";
import LatestEpisodes from "@/sections/LatestEpisodes";
import Popular from "@/sections/Popular";
import Categories from "@/sections/Categories";
import ContinueWatching from "@/sections/ContinueWatching";
import HomeSchedule from "@/sections/HomeSchedule";

export default function Home() {
  return (
    <main className="bg-[#0F0F14] min-h-screen text-white">
      
      <Navbar />

      <Hero />

      <LatestEpisodes />

      <Popular />

      <Categories />

      <ContinueWatching />

      <HomeSchedule />

      <Footer />

    </main>
  );
}