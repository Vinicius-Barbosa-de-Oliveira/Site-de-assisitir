import Image from "next/image";
import Link from "next/link";
import { eq } from "drizzle-orm";

import Navbar from "@/components/layout/navbar";

import { db } from "@/db/db";
import {
  episode,
} from "@/db/schema";


type Props = {
  params: Promise<{
    episodeId: string;
  }>;
};

export default async function WatchPage({
  params,
}: Props) {
  const { episodeId } = await params;

  const currentEpisode =
    await db.query.episode.findFirst({
      where: eq(
        episode.id,
        episodeId
      ),
      
      with: {
        thumbnail: true,

        
        streams: true,
        

        season: {
          with: {
            dorama: {
              with: {
                bannerImage: true,
              },
            },

            episodes: {
              with: {
                thumbnail: true,

              },

              orderBy: (
                episode,
                { asc }
              ) => [
                asc(episode.number),
              ],
            },
          },
        },
      },
    });

  if (!currentEpisode) {
    return (
      <main className="min-h-screen bg-[#0F0F14] text-white flex items-center justify-center">
        <h1 className="text-4xl font-black">
          Episódio não encontrado
        </h1>
      </main>
    );
  }

  const episodes =
    currentEpisode.season.episodes;

  const currentIndex =
    episodes.findIndex(
      (ep) =>
        ep.id ===
        currentEpisode.id
    );

  const nextEpisode =
    episodes[currentIndex + 1];

  const previousEpisode =
    episodes[currentIndex - 1];

  const dorama =
    currentEpisode.season.dorama;

  return (
    <main className="min-h-screen bg-[#0F0F14] text-white">
      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/10">
        {/* BACKGROUND */}

        <Image
          src={
            dorama.bannerImage
              ?.url ||
            "/placeholder.jpg"
          }
          alt={dorama.title}
          fill
          priority
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-[#0F0F14]/90 backdrop-blur-sm" />

        {/* CONTENT */}

        <div className="relative z-10 max-w-8xl mx-auto px-6 py-10">
          {/* TITLE */}

          <div className="mb-8">
            <Link
              href={`/dorama/${dorama.slug}`}
              className="text-purple-400 hover:text-purple-300"
            >
              ← Voltar para o dorama
            </Link>

            <h1 className="text-4xl md:text-5xl font-black mt-4">
              {dorama.title}
            </h1>

            <p className="text-zinc-400 mt-2">
              Temporada{" "}
              {
                currentEpisode
                  .season.number
              }
              {" • "}
              Episódio{" "}
              {
                currentEpisode.number
              }
            </p>

            <h2 className="text-2xl font-bold mt-4">
              {
                currentEpisode.title
              }
            </h2>
          </div>

          {/* PLAYER + SIDEBAR */}

          <div className="grid xl:grid-cols-[1fr_380px] gap-8">
            {/* PLAYER */}

            <div>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
                <video
                  src={
                    currentEpisode.streams[0]?.url ||
                    "/placeholder.mp4"
                  }
                  controls
                  autoPlay
                  className="w-full aspect-video bg-black"
                />
              </div>

              {/* EPISODE INFO */}

              <div className="mt-8 bg-[#18181F] rounded-3xl p-8 border border-white/5">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-xl">
                    Episódio{" "}
                    {
                      currentEpisode.number
                    }
                  </span>

                  <span className="bg-white/10 px-4 py-2 rounded-xl">
                    {
                      currentEpisode.duration
                    }
                    min
                  </span>
                </div>

                <p className="text-zinc-300 leading-relaxed">
                  {
                    currentEpisode.description
                  }
                </p>

                {/* NAVIGATION */}

                <div className="flex flex-wrap gap-4 mt-8">
                  {previousEpisode && (
                    <Link
                      href={`/watch/${previousEpisode.id}`}
                      className="bg-white/10 hover:bg-white/20 px-6 py-4 rounded-2xl transition"
                    >
                      ← Episódio anterior
                    </Link>
                  )}

                  {nextEpisode && (
                    <Link
                      href={`/watch/${nextEpisode.id}`}
                      className="bg-purple-500 hover:bg-purple-600 px-6 py-4 rounded-2xl transition font-semibold"
                    >
                      Próximo episódio →
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}

            <aside className="bg-[#18181F] border border-white/10 rounded-3xl overflow-hidden h-fit">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-2xl font-black">
                  Episódios
                </h3>

                <p className="text-zinc-400 mt-1">
                  Temporada{" "}
                  {
                    currentEpisode
                      .season.number
                  }
                </p>
              </div>

              <div className="max-h-225 overflow-y-auto">
                {episodes.map((ep) => {
                  const active =
                    ep.id ===
                    currentEpisode.id;

                  return (
                    <Link
                      key={ep.id}
                      href={`/watch/${ep.id}`}
                      className={`
                        flex gap-4 p-4 border-b border-white/5 transition
                        ${
                          active
                            ? "bg-purple-500/20"
                            : "hover:bg-white/5"
                        }
                      `}
                    >
                      {/* THUMB */}

                      <div className="relative w-36 aspect-video rounded-xl overflow-hidden shrink-0">
                        <Image
                          src={
                            ep
                              .thumbnail
                              ?.url ||
                            "/placeholder.jpg"
                          }
                          alt={
                            ep.title
                          }
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* INFO */}

                      <div className="min-w-0">
                        <p className="text-sm text-purple-400 font-semibold">
                          EP{" "}
                          {ep.number}
                        </p>

                        <h4 className="font-semibold line-clamp-2 mt-1">
                          {ep.title}
                        </h4>

                        <p className="text-sm text-zinc-500 mt-2">
                          {
                            ep.duration
                          }
                          min
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}