import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EpisodeCard from "@/components/EpisodeCard";

import Recommended from "@/sections/Recommended";
import TrendingSection from "@/sections/TrendingSection";

import { getDramaBySlug, getAllDramas } from "@/lib/data";

import FavoriteButton from "@/components/FavoriteButton";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";


interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DramaPage({
  params,
}: Props) {

  const dramas = await getAllDramas();
  const { slug } = await params;

  const drama =
    await getDramaBySlug(slug);

  if (!drama) {
    return (
      <main className="bg-[#0F0F14] min-h-screen text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Dorama não encontrado.
        </h1>
      </main>
    );
  }
  const session =
  await getServerSession(authOptions);

  let isFavorite = false;

  if (session?.user?.email) {

    const user =
      await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

    if (user) {

      const favorite =
        await prisma.favorite.findFirst({
          where: {
            userId: user.id,
            dramaId: drama.id,
          },
        });

      isFavorite = !!favorite;

    }

  }

  return (
    <main className="bg-[#0F0F14] min-h-screen text-white">

      <Navbar />

      {/* HERO */}

      <section className="relative min-h-175 overflow-hidden">

        <img
          src={drama.bannerImage}
          alt={drama.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#0F0F14] via-[#0F0F14]/70 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-175 flex items-end pb-20">

          <div className="grid lg:grid-cols-[320px_1fr] gap-10 items-end w-full">

            <img
              src={drama.coverImage}
              alt={drama.title}
              className="w-full max-w-[320px] h-115 object-cover rounded-3xl shadow-2xl mx-auto lg:mx-0"
            />

            <div className="text-center lg:text-left">

              <span className="bg-purple-500 px-4 py-2 rounded-full text-sm">
                {drama.status}
              </span>

              <h1 className="text-4xl md:text-6xl font-bold mt-6">
                {drama.title}
              </h1>

              <div className="flex flex-wrap gap-3 mt-6 justify-center lg:justify-start">

                <span className="bg-white/10 px-4 py-2 rounded-xl">
                  {drama.country}
                </span>

                <span className="bg-white/10 px-4 py-2 rounded-xl">
                  {drama.year}
                </span>

                <span className="bg-white/10 px-4 py-2 rounded-xl">
                  ⭐ {drama.rating}
                </span>

              </div>

              <p className="text-zinc-300 mt-6 max-w-3xl leading-relaxed mx-auto lg:mx-0">
                {drama.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">

                <Link
                  href={`/watch/${drama.slug}/${drama.episodes[0]?.number || 1}`}
                  className="bg-purple-500 hover:bg-purple-600 px-8 py-4 rounded-2xl font-semibold transition"
                >
                  ▶ Assistir Agora
                </Link>

                <FavoriteButton
                  dramaId={drama.id}
                  isFavorite={isFavorite}
                />

                <button className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl transition">
                  ➕ Minha Lista
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* INFO */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-[#18181F] p-6 rounded-2xl">
            <h3 className="text-zinc-400 text-sm">
              País
            </h3>

            <p className="font-semibold mt-2">
              {drama.country}
            </p>
          </div>

          <div className="bg-[#18181F] p-6 rounded-2xl">
            <h3 className="text-zinc-400 text-sm">
              Episódios
            </h3>

            <p className="font-semibold mt-2">
              {drama.episodes.length}
            </p>
          </div>

          <div className="bg-[#18181F] p-6 rounded-2xl">
            <h3 className="text-zinc-400 text-sm">
              Duração
            </h3>

            <p className="font-semibold mt-2">
              {drama.episodes[0]?.duration || 0} min
            </p>
          </div>

          <div className="bg-[#18181F] p-6 rounded-2xl">
            <h3 className="text-zinc-400 text-sm">
              Avaliação
            </h3>

            <p className="font-semibold mt-2">
              ⭐ {drama.rating}
            </p>
          </div>

        </div>

      </section>

      {/* EPISODES */}

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-bold">
            Episódios
          </h2>

          <button className="text-purple-400">
            Ordenar
          </button>

        </div>

        <div className="space-y-4">

          {drama.episodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episode={{
                id: episode.id,
                number: episode.number,
                title: episode.title,
                thumbnail: episode.thumbnail,
                duration: episode.duration,
                episode: {
                  videoUrl: episode.videoUrl,
                  description: episode.description,
                  releaseDate: episode.releaseDate,
                },
                dramaSlug: drama.slug,
              }}
              dramaSlug={drama.slug}
            />
          ))}

        </div>

      </section>
      <section className="max-w-8xl mx-auto px-6 py-10">

        <TrendingSection dramas={dramas} />

      </section>

      <Footer />

    </main>
  );
}