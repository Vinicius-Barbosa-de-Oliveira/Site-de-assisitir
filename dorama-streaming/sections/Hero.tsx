import Link from "next/link";

import { dramas } from "@/data/dramas";

const drama = dramas[0];

export default function Hero() {
  return (
    <section className="relative h-212.5 overflow-hidden">

      {/* BACKGROUND */}

      <img
        src={drama.image}
        alt={drama.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 bg-linear-to-r from-[#0F0F14] via-[#0F0F14]/70 to-transparent" />

      <div className="absolute inset-0 bg-linear-to-t from-[#0F0F14] via-transparent to-transparent" />

      {/* CONTENT */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">

        <div className="max-w-2xl">

          <span className="bg-purple-500 px-4 py-2 rounded-full text-sm font-semibold">
            🔥 Último Lançamento
          </span>

          <h1 className="text-7xl font-black leading-tight mt-8">
            {drama.title}
          </h1>

          <div className="flex flex-wrap gap-3 mt-6">

            {drama.category.map((item) => (

              <span
                key={item}
                className="bg-white/10 backdrop-blur-xl px-4 py-2 rounded-xl text-sm"
              >
                {item}
              </span>

            ))}

          </div>

          <p className="text-zinc-300 text-lg leading-relaxed mt-8 max-w-xl">
            Um romance proibido nasce em meio ao caos político,
            guerras e disputas entre reinos.
          </p>

          {/* EP INFO */}

          <div className="flex flex-wrap gap-6 mt-10">

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl">

              <p className="text-zinc-400 text-sm">
                Último Episódio
              </p>

              <h3 className="text-2xl font-bold mt-1">
                EP {drama.latestEpisode.number}
              </h3>

            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl">

              <p className="text-zinc-400 text-sm">
                Lançamento
              </p>

              <h3 className="text-2xl font-bold mt-1">
                {drama.latestEpisode.release}
              </h3>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex flex-wrap gap-4 mt-10">

            <Link
              href={`/watch/${drama.id}/${drama.latestEpisode.number}`}
              className="bg-purple-500 hover:bg-purple-600 transition px-8 py-4 rounded-2xl font-bold text-lg"
            >
              ▶ Assistir Agora
            </Link>

            <Link
              href={`/drama/${drama.id}`}
              className="bg-white/10 hover:bg-white/20 transition px-8 py-4 rounded-2xl font-semibold"
            >
              Ver Detalhes
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}