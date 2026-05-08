import Link from "next/link";

import { dramas } from "@/data/dramas";

export default function LatestEpisodes() {

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <h2 className="text-4xl font-bold text-white">
          Últimos Episódios
        </h2>

        <Link
          href="/categories"
          className="text-purple-400 hover:text-purple-300 transition"
        >
          Ver todos
        </Link>

      </div>

      {/* GRID */}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        {dramas.map((drama) => (

          <Link
            key={drama.id}
            href={`/watch/${drama.id}/${drama.latestEpisode.number}`}
            className="group"
          >

            <div className="relative overflow-hidden rounded-3xl">

              {/* IMAGE */}

              <img
                src={drama.image}
                alt={drama.title}
                className="w-full h-105 object-cover transition duration-500 group-hover:scale-110"
              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

              {/* EP BADGE */}

              <div className="absolute top-4 left-4 bg-purple-500 px-3 py-1 rounded-full text-sm font-bold">

                EP {drama.latestEpisode.number}

              </div>

              {/* CONTENT */}

              <div className="absolute bottom-0 p-6 w-full">

                <p className="text-purple-400 text-sm font-semibold">

                  {drama.latestEpisode.release}

                </p>

                <h3 className="text-2xl font-bold text-white mt-2">

                  {drama.title}

                </h3>

                <p className="text-zinc-300 mt-2 text-sm line-clamp-2">

                  {drama.latestEpisode.title}

                </p>

                {/* BUTTON */}

                <div className="mt-5">

                  <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl py-3 text-center font-semibold transition group-hover:bg-purple-500">

                    Assistir Episódio

                  </div>

                </div>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}