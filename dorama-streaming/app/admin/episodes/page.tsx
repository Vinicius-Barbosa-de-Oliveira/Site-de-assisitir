import Image from "next/image";
import Link from "next/link";
import { deleteEpisode } from "./actions";

import { prisma } from "@/lib/prisma";

export default async function AdminEpisodesPage() {

  const episodes = await prisma.episode.findMany({
    include: {
      drama: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#0B0B11] text-white">

        <section className="p-6 md:p-10">

          {/* HERO */}

          <div className="relative overflow-hidden rounded-4xlrder border-white/5 bg-[#18181F]">

            <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 via-transparent to-transparent" />

            <div className="relative z-10 p-8 md:p-12">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                <div>

                  <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
                    Painel Administrativo
                  </span>

                  <h1 className="text-5xl md:text-6xl font-black mt-6">
                    Episódios
                  </h1>

                  <p className="text-zinc-400 text-lg mt-5 max-w-2xl leading-relaxed">
                    Gerencie todos os episódios da plataforma.
                  </p>

                </div>

                <Link
                  href="/admin/episodes/new"
                  className="bg-purple-500 hover:bg-purple-600 transition px-8 py-5 rounded-3xl font-bold text-lg shadow-[0_0_40px_rgba(168,85,247,0.35)] h-fit"
                >
                  + Novo Episódio
                </Link>

              </div>

            </div>

          </div>

          {/* GRID */}

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-10">

            {episodes.map((episode) => (

              <div
                key={episode.id}
                className="group bg-[#18181F] border border-white/5 rounded-4xl overflow-hidden hover:border-purple-500/40 transition duration-500"
              >

                {/* THUMB */}

                <div className="relative h-60 overflow-hidden">

                  <Image
                    src={episode.thumbnail}
                    alt={episode.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#18181F] via-black/20 to-transparent" />

                  {/* NUMBER */}

                  <div className="absolute top-5 left-5">

                    <span className="bg-purple-500 px-4 py-2 rounded-full text-sm font-bold shadow-lg">

                      EP {episode.number}

                    </span>

                  </div>

                  {/* DURATION */}

                  <div className="absolute top-5 right-5">

                    <span className="bg-black/50 backdrop-blur-xl px-4 py-2 rounded-full text-sm font-semibold">

                      {episode.duration} min

                    </span>

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <div>

                    <h2 className="text-2xl font-black line-clamp-1">
                      {episode.title}
                    </h2>

                    <p className="text-purple-400 mt-2 font-medium line-clamp-1">
                      {episode.drama.title}
                    </p>

                  </div>

                  {/* DATE */}

                  <div className="bg-black/20 rounded-2xl p-4 mt-6">

                    <p className="text-zinc-500 text-sm">
                      Lançamento
                    </p>

                    <h3 className="font-semibold mt-2">
                      {new Date(
                        episode.releaseDate
                      ).toLocaleDateString("pt-BR")}
                    </h3>

                  </div>

                  {/* DESCRIPTION */}

                  {episode.description && (

                    <p className="text-zinc-400 text-sm leading-relaxed mt-6 line-clamp-3">

                      {episode.description}

                    </p>

                  )}

                  {/* ACTIONS */}

                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <Link
                      href={`/watch/${episode.drama.slug}/${episode.number}`}
                      className="bg-white/5 hover:bg-white/10 transition text-center py-4 rounded-2xl font-semibold"
                    >
                      Assistir
                    </Link>

                    <Link
                      href={`/admin/episodes/edit/${episode.id}`}
                      className="bg-purple-500 hover:bg-purple-600 transition text-center py-4 rounded-2xl font-semibold"
                    >
                      Editar
                    </Link>

                    <form
                      action={async () => {
                        "use server";

                        await deleteEpisode(episode.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="w-full mt-3 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white transition py-3 rounded-2xl font-semibold"
                      >
                        Deletar Episódio
                      </button>
                    </form>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* EMPTY */}

          {episodes.length === 0 && (

            <div className="mt-10 bg-[#18181F] border border-white/5 rounded-4xl p-16 text-center">

              <h2 className="text-3xl font-bold">
                Nenhum episódio encontrado
              </h2>

              <p className="text-zinc-400 mt-4">
                Adicione episódios ao catálogo.
              </p>

              <Link
                href="/admin/episodes/new"
                className="inline-block mt-8 bg-purple-500 hover:bg-purple-600 transition px-8 py-4 rounded-2xl font-semibold"
              >
                Criar Episódio
              </Link>

            </div>

          )}

        </section>

    </main>
  );
}