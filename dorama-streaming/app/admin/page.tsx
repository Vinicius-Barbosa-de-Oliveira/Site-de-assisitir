import Link from "next/link";

import { db } from "@/lib/db";

export default async function AdminDashboardPage() {

  const dramas = await prisma.drama.findMany({
    include: {
      episodes: true,
    },
  });

  const episodes = await prisma.episode.findMany({
    include: {
      drama: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  const totalDramas = dramas.length;

  const totalEpisodes = dramas.reduce(
    (acc, drama) => acc + drama.episodes.length,
    0
  );

  const totalOngoing = dramas.filter(
    (drama) =>
      drama.status === "Em lançamento"
  ).length;

  const averageRating =
    dramas.length > 0
      ? (
          dramas.reduce(
            (acc, drama) =>
              acc + drama.rating,
            0
          ) / dramas.length
        ).toFixed(1)
      : "0";

  return (
    <section className="p-6 md:p-10 text-white">

      {/* HERO */}

      <div className="relative overflow-hidden rounded-[36px] border border-white/5 bg-[#18181F]">

        <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 via-transparent to-transparent" />

        <div className="relative z-10 p-8 md:p-12">

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-10">

            <div>

              <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
                Painel Administrativo
              </span>

              <h1 className="text-5xl md:text-7xl font-black mt-6 leading-none">
                Dashboard
              </h1>

              <p className="text-zinc-400 text-lg mt-6 max-w-2xl leading-relaxed">
                Controle total da plataforma de doramas, episódios e catálogo.
              </p>

            </div>

            <div className="flex flex-wrap gap-4">

              <Link
                href="/admin/dramas/new"
                className="bg-purple-500 hover:bg-purple-600 transition px-8 py-5 rounded-3xl font-bold shadow-[0_0_40px_rgba(168,85,247,0.35)]"
              >
                + Novo Dorama
              </Link>

              <Link
                href="/admin/episodes/new"
                className="bg-white/5 hover:bg-white/10 transition px-8 py-5 rounded-3xl font-bold border border-white/5"
              >
                + Novo Episódio
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

        <div className="bg-[#18181F] border border-white/5 rounded-[30px] p-8">

          <div className="text-5xl mb-5">
            📺
          </div>

          <p className="text-zinc-400">
            Total de Doramas
          </p>

          <h2 className="text-5xl font-black mt-4">
            {totalDramas}
          </h2>

        </div>

        <div className="bg-[#18181F] border border-white/5 rounded-[30px] p-8">

          <div className="text-5xl mb-5">
            🎞
          </div>

          <p className="text-zinc-400">
            Episódios
          </p>

          <h2 className="text-5xl font-black mt-4">
            {totalEpisodes}
          </h2>

        </div>

        <div className="bg-[#18181F] border border-white/5 rounded-[30px] p-8">

          <div className="text-5xl mb-5">
            🔥
          </div>

          <p className="text-zinc-400">
            Em lançamento
          </p>

          <h2 className="text-5xl font-black mt-4">
            {totalOngoing}
          </h2>

        </div>

        <div className="bg-[#18181F] border border-white/5 rounded-[30px] p-8">

          <div className="text-5xl mb-5">
            ⭐
          </div>

          <p className="text-zinc-400">
            Média de Avaliação
          </p>

          <h2 className="text-5xl font-black mt-4">
            {averageRating}
          </h2>

        </div>

      </div>

      {/* RECENT EPISODES */}

      <div className="mt-14">

        <div className="flex items-center justify-between mb-8">

          <div>

            <h2 className="text-4xl font-black">
              Episódios Recentes
            </h2>

            <p className="text-zinc-400 mt-2">
              Últimos episódios adicionados
            </p>

          </div>

          <Link
            href="/admin/episodes"
            className="text-purple-400 hover:text-purple-300 transition font-semibold"
          >
            Ver todos
          </Link>

        </div>

        <div className="grid xl:grid-cols-2 gap-6">

          {episodes.map((episode) => (

            <div
              key={episode.id}
              className="bg-[#18181F] border border-white/5 rounded-[30px] p-6 hover:border-purple-500/30 transition"
            >

              <div className="flex items-start justify-between gap-6">

                <div className="flex gap-5">

                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black/20 shrink-0">

                    <img
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  <div>

                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-semibold">

                      EP {episode.number}

                    </span>

                    <h3 className="text-2xl font-black mt-4 line-clamp-1">
                      {episode.title}
                    </h3>

                    <p className="text-zinc-400 mt-2 line-clamp-1">
                      {episode.drama.title}
                    </p>

                    <div className="flex items-center gap-4 mt-4 text-sm text-zinc-500">

                      <span>
                        {episode.duration} min
                      </span>

                      <span>
                        {new Date(
                          episode.releaseDate
                        ).toLocaleDateString("pt-BR")}
                      </span>

                    </div>

                  </div>

                </div>

                <Link
                  href={`/admin/episodes/${episode.id}`}
                  className="bg-white/5 hover:bg-white/10 transition px-5 py-3 rounded-2xl text-sm font-semibold shrink-0"
                >
                  Editar
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* QUICK ACTIONS */}

      <div className="mt-14">

        <h2 className="text-4xl font-black mb-8">
          Ações Rápidas
        </h2>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          <Link
            href="/admin/dramas/new"
            className="bg-[#18181F] border border-white/5 hover:border-purple-500/30 transition rounded-[30px] p-8"
          >

            <div className="text-5xl">
              📺
            </div>

            <h3 className="text-2xl font-black mt-6">
              Criar Dorama
            </h3>

            <p className="text-zinc-400 mt-3 leading-relaxed">
              Adicione um novo dorama ao catálogo da plataforma.
            </p>

          </Link>

          <Link
            href="/admin/episodes/new"
            className="bg-[#18181F] border border-white/5 hover:border-purple-500/30 transition rounded-[30px] p-8"
          >

            <div className="text-5xl">
              🎞
            </div>

            <h3 className="text-2xl font-black mt-6">
              Novo Episódio
            </h3>

            <p className="text-zinc-400 mt-3 leading-relaxed">
              Publique novos episódios para os doramas.
            </p>

          </Link>

          <Link
            href="/admin/dramas"
            className="bg-[#18181F] border border-white/5 hover:border-purple-500/30 transition rounded-[30px] p-8"
          >

            <div className="text-5xl">
              ⚙
            </div>

            <h3 className="text-2xl font-black mt-6">
              Gerenciar
            </h3>

            <p className="text-zinc-400 mt-3 leading-relaxed">
              Edite, atualize e organize o catálogo completo.
            </p>

          </Link>

        </div>

      </div>

    </section>
  );
}