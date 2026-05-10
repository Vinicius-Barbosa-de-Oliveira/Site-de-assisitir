import Hero from "@/components/hero";

import TrendingSection from "@/sections/TrendingSection";

import LatestEpisodes from "@/sections/LatestEpisodes";

import {
  getAllDramas,
  getLatestEpisodes,
} from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContinueWatching from "@/sections/ContinueWatching";
import HomeSchedule from "@/sections/HomeSchedule";
import Popular from "@/sections/Popular";
import Categories from "@/sections/Categories";
import Recommended from "@/sections/Recommended";

export default async function Home() {

  const dramas = await getAllDramas();

  const latestEpisodes =
    await getLatestEpisodes();

  return (
    <main className="min-h-screen bg-[#07070A] text-white">

      <Navbar />

      <div className="px-6 md:px-12 py-10 space-y-16">

        <Hero drama={dramas[0]} />

        <TrendingSection dramas={dramas} />

        <Categories />

        <LatestEpisodes dramas={latestEpisodes} />

        <ContinueWatching dramas={dramas} />

        <Recommended dramas={dramas} />

        <Popular dramas={dramas} />

        <HomeSchedule dramas={dramas} />

      </div>

      <Footer />

    </main>
  );
}