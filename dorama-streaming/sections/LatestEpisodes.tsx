import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Drama } from "@prisma/client";

interface Props {
  dramas: Drama[];
}

const latestEpisodes = await db.query.episode.findMany({
  take: 8,
  orderBy: {
    createdAt: "desc",
  },
});

export default function LatestEpisodes({
  dramas,
}: Props) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <h2 className="text-4xl font-black text-white">
            Últimos Episódios
          </h2>

          <p className="text-zinc-400 mt-2">
            Episódios recém lançados
          </p>

        </div>

        <button className="text-purple-400 hover:text-purple-300 transition font-semibold">
          Ver mais
        </button>

      </div>

      {/* GRID */}

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

        {dramas.map((episode: Drama) => (

          <Link
            key={episode.id}
            href={`/watch/${episode.drama.slug}/${episode.number}`}
            className="group"
          >

            <div className="bg-[#18181F] border border-white/5 hover:border-purple-500/40 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1">

              {/* IMAGE */}

              <div className="relative h-55 overflow-hidden">

                <Image
                  src={episode.thumbnail}
                  alt={episode.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

                {/* EP */}

                <div className="absolute top-4 left-4">

                  <span className="bg-purple-500 px-4 py-2 rounded-full text-sm font-bold">
                    EP {episode.number}
                  </span>

                </div>

                {/* DURATION */}

                <div className="absolute top-4 right-4">

                  <span className="bg-black/50 backdrop-blur-xl px-4 py-2 rounded-full text-sm text-white">
                    {episode.duration} min
                  </span>

                </div>

              </div>

              {/* CONTENT */}

              <div className="p-6">

                <div className="flex items-center justify-between gap-4">

                  <div>

                    <h3 className="text-2xl font-bold line-clamp-1 text-white group-hover:text-purple-300 transition">

                      {episode.drama.title}

                    </h3>

                    <p className="text-zinc-400 mt-2 text-sm">
                      {episode.title}
                    </p>

                  </div>

                  <div className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-xl text-sm font-semibold whitespace-nowrap">

                    ⭐ {episode.drama.rating}

                  </div>

                </div>

                {/* FOOTER */}

                <div className="flex items-center justify-between mt-6 text-sm text-zinc-400">

                  <span>
                    {episode.drama.country}
                  </span>

                  <span>
                    {new Date(
                      episode.releaseDate
                    ).toLocaleDateString("pt-BR")}
                  </span>

                </div>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}