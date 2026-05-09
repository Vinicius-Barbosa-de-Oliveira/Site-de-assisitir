import Link from "next/link";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    slug: string;
    episode: string;
  }>;
}

export default async function WatchPage({
  params,
}: Props) {

  const { slug, episode } =
    await params;

  const drama = await prisma.drama.findUnique({
    where: {
      slug,
    },
    include: {
      episodes: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });

  if (!drama) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Dorama não encontrado.
      </div>
    );
  }

  const currentEpisode =
    drama.episodes.find(
      (ep) =>
        ep.number === Number(episode)
    );

  if (!currentEpisode) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Episódio não encontrado.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* PLAYER */}

      <section className="w-full">

        <div className="relative aspect-video bg-zinc-900">

          <iframe
            src={currentEpisode.videoUrl}
            className="w-full h-full"
            allowFullScreen
          />

        </div>

      </section>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid lg:grid-cols-[1fr_350px] gap-10">

          {/* LEFT */}

          <div>

            <div className="flex items-center gap-3 mb-4">

              <span className="bg-purple-500 px-3 py-1 rounded-lg text-sm font-semibold">

                EP {currentEpisode.number}

              </span>

              <span className="text-zinc-400">

                {currentEpisode.duration} min

              </span>

            </div>

            <h1 className="text-4xl font-bold mb-4">

              {drama.title}

            </h1>

            <h2 className="text-2xl font-semibold mb-6">

              {currentEpisode.title}

            </h2>

            <div className="flex flex-wrap gap-3 mb-8">

              <span className="bg-zinc-900 px-4 py-2 rounded-xl">

                ⭐ {drama.rating}
              </span>

              <span className="bg-zinc-900 px-4 py-2 rounded-xl">

                {drama.year}

              </span>

              <span className="bg-zinc-900 px-4 py-2 rounded-xl">

                {drama.country}

              </span>

              <span className="bg-zinc-900 px-4 py-2 rounded-xl">

                {drama.status}

              </span>

            </div>

            <p className="text-zinc-300 leading-8 text-lg">

              {drama.description}

            </p>

          </div>

          {/* RIGHT */}

          <div>

            <div className="bg-[#121218] rounded-3xl p-6 border border-white/5">

              <h3 className="text-2xl font-bold mb-6">

                Episódios

              </h3>

              <div className="space-y-4 max-h-175 overflow-y-auto pr-2">

                {drama.episodes.map((ep) => (

                  <Link
                    key={ep.id}
                    href={`/watch/${drama.slug}/${ep.number}`}
                    className={`block rounded-2xl overflow-hidden border transition ${
                      ep.number ===
                      currentEpisode.number
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-white/5 hover:border-purple-500/40"
                    }`}
                  >

                    <div className="flex gap-4 p-3">

                      <img
                        src={ep.thumbnail}
                        alt={ep.title}
                        className="w-32 h-20 object-cover rounded-xl"
                      />

                      <div className="flex-1">

                        <div className="flex items-center justify-between mb-2">

                          <span className="text-sm text-purple-400 font-semibold">

                            EP {ep.number}

                          </span>

                          <span className="text-xs text-zinc-500">

                            {ep.duration} min

                          </span>

                        </div>

                        <h4 className="font-semibold line-clamp-2">

                          {ep.title}

                        </h4>

                      </div>

                    </div>

                  </Link>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}