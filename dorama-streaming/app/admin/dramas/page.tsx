import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function AdminDramasPage() {

  const dramas = await prisma.drama.findMany({
    include: {
      episodes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#0B0B11] text-white">

        <section className="p-6 md:p-10">

          {/* HERO */}

          <div className="relative overflow-hidden rounded-4xl border border-white/5 bg-[#18181F]">

            <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 via-transparent to-transparent" />

            <div className="relative z-10 p-8 md:p-12">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

                <div>

                  <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
                    Painel Administrativo
                  </span>

                  <h1 className="text-5xl md:text-6xl font-black mt-6">
                    Doramas
                  </h1>

                  <p className="text-zinc-400 text-lg mt-5 max-w-2xl leading-relaxed">
                    Gerencie todos os doramas cadastrados na plataforma.
                  </p>

                </div>

                <Link
                  href="/admin/dramas/new"
                  className="bg-purple-500 hover:bg-purple-600 transition px-8 py-5 rounded-3xl font-bold text-lg shadow-[0_0_40px_rgba(168,85,247,0.35)] h-fit"
                >
                  + Novo Dorama
                </Link>

              </div>

            </div>

          </div>

          {/* GRID */}

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 mt-10">

            {dramas.map((drama) => (

              <div
                key={drama.id}
                className="group relative overflow-hidden rounded-4xl border border-white/5 bg-[#18181F] hover:border-purple-500/40 transition duration-500"
              >

                {/* IMAGE */}

                <div className="relative h-105 overflow-hidden">

                  <Image
                    src={drama.coverImage}
                    alt={drama.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-[#18181F] via-black/20 to-transparent" />

                  {/* STATUS */}

                  <div className="absolute top-5 left-5">

                    <span className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">

                      {drama.status}

                    </span>

                  </div>

                  {/* RATING */}

                  <div className="absolute top-5 right-5">

                    <span className="bg-black/50 backdrop-blur-xl px-4 py-2 rounded-full text-sm font-semibold">

                      ⭐ {drama.rating}

                    </span>

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-6">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <h2 className="text-2xl font-black line-clamp-1">
                        {drama.title}
                      </h2>

                      <p className="text-zinc-400 mt-2">
                        {drama.country} • {drama.year}
                      </p>

                    </div>

                  </div>

                  {/* INFO */}

                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="bg-black/20 rounded-2xl p-4">

                      <p className="text-zinc-500 text-sm">
                        Episódios
                      </p>

                      <h3 className="text-2xl font-bold mt-2">
                        {drama.episodes.length}
                      </h3>

                    </div>

                    <div className="bg-black/20 rounded-2xl p-4">

                      <p className="text-zinc-500 text-sm">
                        Status
                      </p>

                      <h3 className="text-lg font-bold mt-2 line-clamp-1">
                        {drama.status}
                      </h3>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <Link
                      href={`/drama/${drama.slug}`}
                      className="bg-white/5 hover:bg-white/10 transition text-center py-4 rounded-2xl font-semibold"
                    >
                      Ver
                    </Link>

                    <Link
                      href={`/admin/dramas/${drama.id}`}
                      className="bg-purple-500 hover:bg-purple-600 transition text-center py-4 rounded-2xl font-semibold"
                    >
                      Editar
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* EMPTY */}

          {dramas.length === 0 && (

            <div className="mt-10 bg-[#18181F] border border-white/5 rounded-4xl p-16 text-center">

              <h2 className="text-3xl font-bold">
                Nenhum dorama encontrado
              </h2>

              <p className="text-zinc-400 mt-4">
                Comece criando seu primeiro dorama.
              </p>

              <Link
                href="/admin/dramas/new"
                className="inline-block mt-8 bg-purple-500 hover:bg-purple-600 transition px-8 py-4 rounded-2xl font-semibold"
              >
                Criar Dorama
              </Link>

            </div>

          )}

        </section>

    </main>
  );
}