import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import { Heart, Clock, Play } from "lucide-react";

import { prisma } from "@/lib/prisma";

import Image from "next/image";

import Link from "next/link";

export default async function ProfilePage() {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({

    where: {
      email: session.user?.email!,
    },

    include: {

      favorites: {
        include: {
          drama: true,
        },
      },

      watchProgress: {

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

      },

    },

  });
  const continueWatching =
    user?.watchProgress.filter(
      (item) => !item.completed
    ) || [];

  const completedEpisodes =
    user?.watchProgress.filter(
      (item) => item.completed
    ) || [];  

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0F0F14] text-white">

        {/* Hero Section */}
        <section className="relative py-16 border-b border-white/5">

          <div className="max-w-7xl mx-auto px-6">

            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">

              <div className="w-32 h-32 rounded-full bg-linear-to-br from-purple-500 to-purple-600 flex items-center justify-center text-6xl font-black shrink-0">
                {session.user?.name?.[0]?.toUpperCase()}
              </div>

              <div className="flex-1">

                <h1 className="text-5xl font-black mb-2">
                  {session.user?.name}
                </h1>

                <p className="text-white/60 text-lg mb-6">
                  {session.user?.email}
                </p>

                <div className="flex gap-4">
                  <Link
                    href="/profile/edit"
                    className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 transition font-semibold"
                  >
                    Editar Perfil
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition font-semibold"
                  >
                    Configurações
                  </Link>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Stats Section */}
        <section className="py-12">

          <div className="max-w-7xl mx-auto px-6">

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

              <div className="bg-[#18181F] border border-white/5 hover:border-purple-500/20 rounded-3xl p-8 transition group">

                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition">
                    <Heart size={24} className="text-purple-400" />
                  </div>
                </div>

                <p className="text-white/60 text-sm mb-2">
                  Doramas Favoritos
                </p>

                <h3 className="text-4xl font-black">
                  {user?.favorites.length || 0}
                </h3>

              </div>

              <div className="bg-[#18181F] border border-white/5 hover:border-purple-500/20 rounded-3xl p-8 transition group">

                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition">
                    <Play size={24} className="text-purple-400" />
                  </div>
                </div>

                <p className="text-white/60 text-sm mb-2">
                  Episódios Assistidos
                </p>

                <h3 className="text-4xl font-black">
                  {completedEpisodes.length}
                </h3>

              </div>

              <div className="bg-[#18181F] border border-white/5 hover:border-purple-500/20 rounded-3xl p-8 transition group">

                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition">
                    <Clock size={24} className="text-purple-400" />
                  </div>
                </div>

                <p className="text-white/60 text-sm mb-2">
                  Tempo Assistido
                </p>

                <h3 className="text-4xl font-black">
                  0h
                </h3>

              </div>

            </div>

          </div>

        </section>

        {/* Continue Watching Section */}
        <section className="py-12 border-t border-white/5">

          <div className="max-w-7xl mx-auto px-6">

            <div className="mb-8">

              <h2 className="text-3xl font-black mb-2">
                Continue Assistindo
              </h2>

              <p className="text-white/60">
                Retome seus episódios favoritos
              </p>

            </div>

            {continueWatching.length ? (

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

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

                        <div className="relative h-60 overflow-hidden">

                          <Image
                            src={item.episode.thumbnail}
                            alt={item.episode.title}
                            fill
                            className="object-cover group-hover:scale-105 transition duration-500"
                          />

                        </div>

                        <div className="p-5">

                          <h3 className="text-xl font-bold line-clamp-1">
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

            ) : (

              <div className="bg-[#18181F] border border-white/5 rounded-3xl p-12 text-center">

                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Play size={32} className="text-white/30" />
                </div>

                <p className="text-white/50 text-lg">
                  Nenhum episódio em andamento.
                </p>

                <p className="text-white/30 text-sm mt-2">
                  Comece a assistir um dorama para ver seu progresso aqui
                </p>

              </div>

            )}

          </div>

        </section>

        {/* Favorites Section */}
        <section className="py-12 border-t border-white/5">

          <div className="max-w-7xl mx-auto px-6">

            <div className="mb-8">

              <h2 className="text-3xl font-black mb-2">
                Favoritos
              </h2>

              <p className="text-white/60">
                Seus doramas salvos
              </p>

            </div>

            {user?.favorites.length ? (

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {user.favorites.map((favorite) => (

                  <Link
                    key={favorite.id}
                    href={`/drama/${favorite.drama.slug}`}
                    className="group"
                  >

                    <div className="bg-[#18181F] border border-white/5 hover:border-purple-500/30 rounded-3xl overflow-hidden transition">

                      <div className="relative h-80 overflow-hidden">

                        <Image
                          src={favorite.drama.coverImage}
                          alt={favorite.drama.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />

                      </div>

                      <div className="p-5">

                        <h3 className="text-2xl font-bold line-clamp-1">

                          {favorite.drama.title}

                        </h3>

                        <p className="text-white/50 text-sm mt-2">

                          {favorite.drama.country} • {favorite.drama.year}

                        </p>

                      </div>

                    </div>

                  </Link>

                ))}

              </div>

            ) : (

              <div className="bg-[#18181F] border border-white/5 rounded-3xl p-12 text-center">

                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">

                  <Heart size={32} className="text-white/30" />

                </div>

                <p className="text-white/50 text-lg">
                  Nenhum favorito ainda.
                </p>

                <p className="text-white/30 text-sm mt-2">
                  Clique no ícone de coração para salvar seus doramas favoritos
                </p>

              </div>

            )}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}