import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import Hero from "@/components/hero";

import TrendingSection
from "@/sections/TrendingSection";

import LatestEpisodes
from "@/sections/LatestEpisodes";

import HomeSchedule
from "@/sections/HomeSchedule";

import Popular
from "@/sections/Popular";

import Categories
from "@/sections/Categories";

import Recommended
from "@/sections/Recommended";

import ContinueWatchingSection
from "@/sections/ContinueWatching";

import { getServerSession }
from "next-auth";

import { authOptions }
from "@/lib/auth";

import {
  getAllDramas,
} from "@/app/services/dramas";

import {
  getLatestEpisodes,
} from "@/app/services/episodes";

import {
  getContinueWatching,
} from "@/app/services/users";

export default async function Home() {

  const session =
    await getServerSession(
      authOptions
    );

  const [
    dramas,
    latestEpisodes,
  ] = await Promise.all([

    getAllDramas(),
    getLatestEpisodes(),

  ]);

  let continueWatching:
    any[] = [];

  if (session?.user?.email) {

    continueWatching =
      await getContinueWatching(
        session.user.email
      );

  }

  return (

    <main
      className="
        min-h-screen
        bg-[#07070A]
        text-white
      "
    >

      <Navbar />

      <div
        className="
          px-6
          md:px-12
          py-10
          space-y-16
        "
      >

        <Hero drama={dramas[0]} />

        <TrendingSection
          dramas={dramas}
        />

        {continueWatching.length >
          0 && (

          <ContinueWatchingSection
            items={
              continueWatching
            }
          />

        )}

        <Categories />

        <LatestEpisodes
          dramas={latestEpisodes}
        />

        <Recommended
          dramas={dramas}
        />

        <Popular
          dramas={dramas}
        />

        <HomeSchedule
          dramas={dramas}
        />

      </div>

      <Footer />

    </main>

  );

}