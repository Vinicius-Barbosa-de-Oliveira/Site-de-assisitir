import Hero from "@/components/hero";
import TrendingSection from "@/sections/TrendingSection";
import LatestEpisodes from "@/sections/LatestEpisodes";
import {
  getAllDramas,
  getLatestEpisodes,
} from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeSchedule from "@/sections/HomeSchedule";
import Popular from "@/sections/Popular";
import Categories from "@/sections/Categories";
import Recommended from "@/sections/Recommended";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
export default async function Home() {

  const dramas = await getAllDramas();

  const latestEpisodes =
    await getLatestEpisodes();

  const session =
  await getServerSession(authOptions);

  let continueWatching: any[] = [];

  if (session?.user?.email) {

    const user =
      await prisma.user.findUnique({

        where: {
          email: session.user.email,
        },

        include: {

          watchProgress: {

            where: {
              completed: false,
            },

            include: {

              episode: {
                include: {
                  drama: true,
                },
              },

            },

            orderBy: {
              updatedAt: "desc",
            },

            take: 8,

          },

        },

      });

    continueWatching =
      user?.watchProgress || [];

  }

  return (
    <main className="min-h-screen bg-[#07070A] text-white">

      <Navbar />

      <div className="px-6 md:px-12 py-10 space-y-16">

        <Hero drama={dramas[0]} />

        <TrendingSection dramas={dramas} />

        {continueWatching.length > 0 && (

          <section className="py-14">

            <div className="max-w-7xl mx-auto px-6">

              <div className="mb-8">

                <h2 className="text-3xl font-black mb-2">
                  Continue Assistindo
                </h2>

                <p className="text-white/60">
                  Retome de onde parou
                </p>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {continueWatching.map((item) => {

                  const progress =
                    (item.currentTime /
                      item.episode.duration) * 100;

                  return (

                    <Link
                      key={item.id}
                      href={`/watch/${item.episode.drama.slug}/${item.episode.number}`}
                      className="group"
                    >

                      <div className="bg-[#18181F] border border-white/5 hover:border-purple-500/30 rounded-3xl overflow-hidden transition">

                        <div className="relative h-64 overflow-hidden">

                          <Image
                            src={item.episode.thumbnail}
                            alt={item.episode.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                          />

                        </div>

                        <div className="p-5">

                          <h3 className="text-2xl font-bold line-clamp-1">

                            {item.episode.drama.title}

                          </h3>

                          <p className="text-white/50 text-sm mt-1">

                            Episódio {item.episode.number}

                          </p>

                          <div className="mt-4">

                            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">

                              <div
                                className="h-full bg-purple-500 rounded-full"
                                style={{
                                  width: `${progress}%`,
                                }}
                              />

                            </div>

                            <p className="text-xs text-white/40 mt-2">

                              {Math.floor(progress)}% assistido

                            </p>

                          </div>

                        </div>

                      </div>

                    </Link>

                  );

                })}

              </div>

            </div>

          </section>

        )}

        <Categories />

        <LatestEpisodes dramas={latestEpisodes} />

        <Recommended dramas={dramas} />

        <Popular dramas={dramas} />

        <HomeSchedule dramas={dramas} />

      </div>

      <Footer />

    </main>
  );
}