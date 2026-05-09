import Link from "next/link";

interface HeroProps {
  drama: any;
}

export default function Hero({
  drama,
}: HeroProps) {
  if (!drama) return null;

  const latestEpisode =
    drama.episodes?.[0];

  return (
    <section className="relative h-162.5 overflow-hidden rounded-3xl">

      <img
        src={drama.bannerImage}
        alt={drama.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-transparent" />

      <div className="relative z-10 flex items-end h-full px-10 pb-16">

        <div className="max-w-2xl">

          <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
            NOVO EPISÓDIO
          </span>

          <h1 className="text-6xl font-black mt-6">
            {drama.title}
          </h1>

          <div className="flex items-center gap-4 mt-4 text-zinc-300">

            <span>{drama.year}</span>

            <span>{drama.country}</span>

            <span>⭐ {drama.rating}</span>

            <span>{drama.status}</span>

          </div>

          <p className="mt-6 text-zinc-300 line-clamp-4">
            {drama.description}
          </p>

          {latestEpisode && (
            <div className="flex gap-4 mt-8">

              <Link
                href={`/watch/${drama.slug}/${latestEpisode.number}`}
                className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold transition"
              >
                Assistir Agora
              </Link>

              <Link
                href={`/drama/${drama.slug}`}
                className="bg-zinc-800 hover:bg-zinc-700 px-8 py-4 rounded-xl font-bold transition"
              >
                Ver Detalhes
              </Link>

            </div>
          )}

        </div>

      </div>

    </section>
  );
}