import Image from "next/image";
import Link from "next/link";

import { eq } from "drizzle-orm";

import { getServerSession } from "next-auth";

import { db } from "@/db/db";

import {
  dorama,
  user,
} from "@/db/schema";

import { authOptions } from "@/lib/auth";

import Navbar from "@/components/layout/navbar";

import FavoriteButton from "@/components/profile/favorite-button";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DoramaPage({
  params,
}: Props) {
  const { slug } = await params;

  const session =
    await getServerSession(authOptions);

  const currentUser =
    session?.user?.email
      ? await db.query.user.findFirst({
          where: eq(
            user.email,
            session.user.email
          ),

          with: {
            favorites: true,
          },
        })
      : null;

  const data =
    await db.query.dorama.findFirst({
      where: eq(dorama.slug, slug),

      with: {
        coverImage: true,

        bannerImage: true,

        seasons: {
          with: {
            episodes: {
              with: {
                thumbnail: true,
              },

              orderBy: (
                episode,
                { asc }
              ) => [asc(episode.number)],
            },
          },

          orderBy: (
            season,
            { asc }
          ) => [asc(season.number)],
        },
      },
    });

  if (!data) {
    return (
      <main className="min-h-screen bg-[#0F0F14] text-white flex items-center justify-center">
        <h1 className="text-4xl font-black">
          Dorama não encontrado
        </h1>
      </main>
    );
  }

  const totalEpisodes =
    data.seasons.reduce(
      (acc, season) =>
        acc +
        season.episodes.length,
      0
    );

  const firstEpisode =
    data.seasons[0]?.episodes[0];

  const isFavorited =
    currentUser?.favorites.some(
      (favorite) =>
        favorite.doramaId === data.id
    ) || false;

  return (
    <main className="min-h-screen bg-[#0F0F14] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        {/* BACKGROUND */}
        <Image
          src={
            data.bannerImage?.url ||
            "/placeholder.jpg"
          }
          alt={data.title}
          fill
          priority
          className="object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F14] via-[#0F0F14]/70 to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-screen flex items-end pb-20">
          <div className="grid lg:grid-cols-[320px_1fr] gap-10 items-end w-full">
            {/* COVER */}
            <div className="relative w-full max-w-[320px] aspect-[2/3] mx-auto lg:mx-0 overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src={
                  data.coverImage?.url ||
                  "/placeholder.jpg"
                }
                alt={data.title}
                fill
                className="object-cover"
              />
            </div>

            {/* INFO */}
            <div className="text-center lg:text-left">
              <span className="bg-purple-500 px-4 py-2 rounded-full text-sm font-medium">
                {data.status}
              </span>

              <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">
                {data.title}
              </h1>

              {/* META */}
              <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">
                <span className="bg-white/10 px-4 py-2 rounded-xl">
                  {data.country}
                </span>

                <span className="bg-white/10 px-4 py-2 rounded-xl">
                  {data.year}
                </span>

                <span className="bg-white/10 px-4 py-2 rounded-xl">
                  {totalEpisodes} episódios
                </span>
              </div>

              {/* DESCRIPTION */}
              <p className="text-zinc-300 mt-6 max-w-3xl leading-relaxed text-lg">
                {data.description}
              </p>

              {/* ACTIONS */}
              <div className="flex flex-wrap gap-4 mt-10 justify-center lg:justify-start">
                {firstEpisode && (
                  <Link
                    href={`/watch/${firstEpisode.id}`}
                    className="bg-purple-500 hover:bg-purple-600 px-8 py-4 rounded-2xl font-semibold transition"
                  >
                    ▶ Assistir Agora
                  </Link>
                )}

                <FavoriteButton
                  doramaId={data.id}
                  isFavorited={isFavorited}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard
            title="País"
            value={data.country}
          />

          <InfoCard
            title="Ano"
            value={String(data.year)}
          />

          <InfoCard
            title="Temporadas"
            value={String(
              data.seasons.length
            )}
          />

          <InfoCard
            title="Episódios"
            value={String(
              totalEpisodes
            )}
          />
        </div>
      </section>

      {/* EPISODES */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-4xl font-black mb-10">
          Episódios
        </h2>

        <div className="space-y-10">
          {data.seasons.map(
            (season) => (
              <div
                key={season.id}
                className="space-y-4"
              >
                {/* HEADER */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-purple-500 flex items-center justify-center text-2xl font-black">
                    {season.number}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold">
                      Temporada{" "}
                      {season.number}
                    </h3>

                    <p className="text-zinc-400">
                      {
                        season.episodes
                          .length
                      }{" "}
                      episódios
                    </p>
                  </div>
                </div>

                {/* EPISODES */}
                <div className="space-y-4">
                  {season.episodes.map(
                    (episode) => (
                      <Link
                        key={episode.id}
                        href={`/watch/${episode.id}`}
                        className="block"
                      >
                        <div className="group bg-[#18181F] hover:bg-[#202028] transition rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/30">
                          <div className="grid md:grid-cols-[320px_1fr] gap-6">
                            {/* THUMB */}
                            <div className="relative aspect-video">
                              <Image
                                src={
                                  episode
                                    .thumbnail
                                    ?.url ||
                                  "/placeholder.jpg"
                                }
                                alt={
                                  episode.title
                                }
                                fill
                                className="object-cover"
                              />
                            </div>

                            {/* INFO */}
                            <div className="p-6">
                              <div className="flex items-center gap-3">
                                <span className="text-purple-400 font-bold">
                                  EP{" "}
                                  {
                                    episode.number
                                  }
                                </span>

                                <span className="text-zinc-500">
                                  •
                                </span>

                                <span className="text-zinc-400">
                                  {
                                    episode.duration
                                  }
                                  min
                                </span>
                              </div>

                              <h4 className="text-2xl font-bold mt-3 group-hover:text-purple-400 transition">
                                {
                                  episode.title
                                }
                              </h4>

                              <p className="text-zinc-400 mt-4 line-clamp-2">
                                {
                                  episode.description
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-[#18181F] p-6 rounded-3xl border border-white/5">
      <h3 className="text-zinc-400 text-sm">
        {title}
      </h3>

      <p className="font-bold text-xl mt-3">
        {value}
      </p>
    </div>
  );
}