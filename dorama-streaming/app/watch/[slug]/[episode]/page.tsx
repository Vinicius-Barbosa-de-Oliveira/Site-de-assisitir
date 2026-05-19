import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import VideoPlayer from "@/components/VideoPlayer";
import Link from "next/link";
import Image from "next/image";

import {
  getEpisodeComments,
} from "@/lib/data";

import {
  createComment,
} from "@/app/actions/comment-actions";

interface Props {
  params: Promise<{
    slug: string;
    episode: string;
  }>;
}

export default async function WatchPage({
  params,
}: Props) {

  const session =
    await getServerSession(authOptions);

  const {
    slug,
    episode,
  } = await params;

  const drama =
    await prisma.drama.findUnique({

      where: {
        slug,
      },

      include: {

        genres: true,

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

  const comments =
    await getEpisodeComments(
      currentEpisode.id
    );

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
                startTime={
                  progress?.currentTime || 0
                }
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

              <div className="flex flex-wrap gap-3 mt-5">

                <span className="bg-white/10 px-4 py-2 rounded-2xl text-sm">
                  ⭐ {drama.rating}
                </span>

                <span className="bg-white/10 px-4 py-2 rounded-2xl text-sm">
                  {drama.country}
                </span>

                <span className="bg-white/10 px-4 py-2 rounded-2xl text-sm">
                  {currentEpisode.duration} min
                </span>

                {drama.genres.map((genre) => (

                  <span
                    key={genre.id}
                    className="
                      bg-purple-500/10
                      border
                      border-purple-500/20
                      text-purple-300
                      px-4
                      py-2
                      rounded-2xl
                      text-sm
                    "
                  >
                    {genre.name}
                  </span>

                ))}

              </div>

            </div>

            {/* CONTROLES */}

            <div className="flex flex-wrap gap-4 mt-8">

              {previousEpisode && (

                <Link
                  href={`/watch/${slug}/${previousEpisode.number}`}
                  className="
                    bg-white/10
                    hover:bg-white/20
                    px-6
                    py-3
                    rounded-xl
                    transition
                  "
                >
                  ← Episódio Anterior
                </Link>

              )}

              {nextEpisode && (

                <Link
                  href={`/watch/${slug}/${nextEpisode.number}`}
                  className="
                    bg-purple-500
                    hover:bg-purple-600
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                  "
                >
                  Próximo Episódio →
                </Link>

              )}

            </div>

            {/* COMENTÁRIOS */}

            <section className="mt-16">

              <h2 className="text-3xl font-bold mb-8">
                Comentários
              </h2>

              {session ? (

                <form
                  action={createComment.bind(
                    null,
                    currentEpisode.id
                  )}
                  className="mb-10"
                >

                  <textarea
                    name="content"
                    rows={4}
                    required
                    placeholder="Escreva seu comentário..."
                    className="
                      w-full
                      bg-[#18181F]
                      border
                      border-white/5
                      rounded-2xl
                      p-5
                      outline-none
                      focus:border-purple-500
                      resize-none
                    "
                  />

                  <button
                    type="submit"
                    className="
                      mt-4
                      bg-purple-500
                      hover:bg-purple-600
                      px-6
                      py-3
                      rounded-2xl
                      font-semibold
                      transition
                    "
                  >
                    Comentar
                  </button>

                </form>

              ) : (

                <div
                  className="
                    mb-10
                    bg-[#18181F]
                    border
                    border-white/5
                    rounded-2xl
                    p-6
                  "
                >

                  <p className="text-zinc-300">
                    Faça login para comentar.
                  </p>

                </div>

              )}

              <div className="space-y-6">

                {comments.length === 0 && (

                  <div
                    className="
                      bg-[#18181F]
                      border
                      border-white/5
                      rounded-3xl
                      p-8
                      text-center
                      text-zinc-400
                    "
                  >
                    Nenhum comentário ainda.
                  </div>

                )}

                {comments.map((comment) => (

                  <div
                    key={comment.id}
                    className="
                      bg-[#18181F]
                      border
                      border-white/5
                      rounded-3xl
                      p-6
                    "
                  >

                    <div className="flex items-center gap-3 mb-4">

                      <div
                        className="
                          w-12
                          h-12
                          rounded-full
                          bg-purple-500
                          flex
                          items-center
                          justify-center
                          font-bold
                          text-lg
                        "
                      >
                        {comment.user.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <div>

                        <h4 className="font-bold">
                          {comment.user.name}
                        </h4>

                        <p className="text-zinc-500 text-sm">

                          {new Date(
                            comment.createdAt
                          ).toLocaleDateString(
                            "pt-BR"
                          )}

                        </p>

                      </div>

                    </div>

                    <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                      {comment.content}
                    </p>

                  </div>

                ))}

              </div>

            </section>

          </div>

          {/* SIDEBAR */}

          <aside
            className="
              bg-[#18181F]
              rounded-3xl
              p-6
              h-fit
              sticky
              top-24
            "
          >

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
                  className={`
                    block
                    p-4
                    rounded-2xl
                    cursor-pointer
                    transition

                    ${
                      ep.number.toString() === episode
                        ? "bg-purple-500"
                        : "bg-black/20 hover:bg-black/40"
                    }
                  `}
                >

                  <div className="flex gap-4">

                    <div
                      className="
                        relative
                        w-28
                        h-16
                        rounded-xl
                        overflow-hidden
                        shrink-0
                      "
                    >

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