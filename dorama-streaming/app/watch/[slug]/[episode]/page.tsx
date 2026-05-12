import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

import { prisma } from "@/lib/prisma";

import { notFound } from "next/navigation";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import VideoPlayer from "@/components/VideoPlayer";

import Link from "next/link";
import Image from "next/image";

type Props = {
  params: {
    slug: string;
    episode: string;
  };
};

export default async function WatchPage({
  params,
}: Props) {

  const session =
    await getServerSession(authOptions);

  const { slug, episode } = params;

  const drama =
    await prisma.drama.findUnique({

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
    notFound();
  }

  const currentEpisode =
    drama.episodes.find(
      (ep) =>
        ep.number.toString() === episode
    );

  if (!currentEpisode) {
    notFound();
  }

  let progress = null;

  if (session?.user?.email) {

    const user =
      await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

    if (user) {

      progress =
        await prisma.watchProgress.findUnique({

          where: {
            userId_episodeId: {
              userId: user.id,
              episodeId: currentEpisode.id,
            },
          },

        });

    }

  }

  const currentIndex =
    drama.episodes.findIndex(
      (ep) => ep.id === currentEpisode.id
    );

  const nextEpisode =
    drama.episodes[currentIndex + 1];

  const previousEpisode =
    drama.episodes[currentIndex - 1];

  return (

    <main className="bg-[#0F0F14] min-h-screen text-white">

      <Navbar />

      <section className="max-w-7xl mx-auto px-4 py-6">

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">

          {/* PLAYER */}

          <div>

            <div className="bg-black rounded-3xl overflow-hidden aspect-video relative">

              <VideoPlayer
                episodeId={currentEpisode.id}
                videoUrl={currentEpisode.videoUrl}
                startTime={progress?.currentTime || 0}
              />

            </div>

            {/* INFO */}

            <div className="mt-6">

              <span className="text-purple-400 text-sm">
                EPISÓDIO {currentEpisode.number}
              </span>

              <h1 className="text-4xl font-bold mt-2">
                {currentEpisode.title}
              </h1>

              <p className="text-zinc-400 mt-4 max-w-4xl leading-7">
                {drama.description}
              </p>

              <div className="flex flex-wrap gap-4 mt-5 text-sm text-zinc-400">

                <span>
                  ⭐ {drama.rating}
                </span>

                <span>
                  {drama.country}
                </span>

                <span>
                  {currentEpisode.duration} min
                </span>

              </div>

            </div>

            {/* CONTROLES */}

            <div className="flex flex-wrap gap-4 mt-8">

              {nextEpisode && (

                <Link
                  href={`/watch/${slug}/${nextEpisode.number}`}
                  className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-semibold transition"
                >
                  Próximo Episódio
                </Link>

              )}

              {previousEpisode && (

                <Link
                  href={`/watch/${slug}/${previousEpisode.number}`}
                  className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition"
                >
                  Episódio Anterior
                </Link>

              )}

              <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition">
                ❤️ Favoritar
              </button>

            </div>

            {/* COMENTÁRIOS */}

            <section className="mt-16">

              <h2 className="text-3xl font-bold mb-8">
                Comentários
              </h2>

              <div className="space-y-6">

                <div className="bg-[#18181F] p-6 rounded-2xl">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 bg-purple-500 rounded-full" />

                    <div>

                      <h3 className="font-semibold">
                        Usuário
                      </h3>

                      <p className="text-zinc-400 text-sm">
                        há 2 horas
                      </p>

                    </div>

                  </div>

                  <p className="text-zinc-300 mt-4">
                    Esse episódio foi absurdo 🔥
                  </p>

                </div>

              </div>

            </section>

          </div>

          {/* SIDEBAR */}

          <aside className="bg-[#18181F] rounded-3xl p-6 h-fit sticky top-24">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold">
                Episódios
              </h2>

              <span className="text-zinc-400">
                {drama.episodes.length} EP
              </span>

            </div>

            <div className="space-y-4 max-h-212.5 overflow-y-auto pr-2">

              {drama.episodes.map((ep) => (

                <Link
                  href={`/watch/${slug}/${ep.number}`}
                  key={ep.id}
                  className={`block p-4 rounded-2xl cursor-pointer transition ${
                    ep.number.toString() === episode
                      ? "bg-purple-500"
                      : "bg-black/20 hover:bg-black/40"
                  }`}
                >

                  <div className="flex gap-4">

                    <div className="relative w-28 h-16 rounded-xl overflow-hidden shrink-0">

                      <Image
                        src={ep.thumbnail}
                        alt={ep.title}
                        fill
                        className="object-cover"
                      />

                    </div>

                    <div>

                      <h3 className="font-semibold line-clamp-1">
                        Episódio {ep.number}
                      </h3>

                      <p className="text-sm text-zinc-300 mt-2 line-clamp-1">
                        {ep.title}
                      </p>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          </aside>

        </div>

      </section>

      <Footer />

    </main>

  );

}