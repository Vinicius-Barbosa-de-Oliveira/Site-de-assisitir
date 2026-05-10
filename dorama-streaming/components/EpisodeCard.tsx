import Link from "next/link";

interface Props {
  episode: {
    id: string;
    number: number;
    title: string;
    thumbnail?: string;
    duration?: number;
    episode: any;
    dramaSlug: string;
  };

  dramaSlug: string;
}

export default function EpisodeCard({
  episode,
  dramaSlug,
}: Props) {

  return (

    <Link
      href={`/watch/${dramaSlug}/${episode.number}`}
      className="block group"
    >

      <div className="bg-[#18181F] border border-white/5 hover:border-purple-500/40 rounded-3xl overflow-hidden transition">

        <div className="flex flex-col md:flex-row">

          {/* THUMB */}

          <div className="relative md:w-[320px] h-50 md:h-auto overflow-hidden">

            <img
              src={
                episode.thumbnail ||
                "https://placehold.co/600x400"
              }
              alt={episode.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-4 left-4">

              <span className="bg-purple-500 px-3 py-1 rounded-lg text-sm font-semibold">

                EP {episode.number}

              </span>

            </div>

          </div>

          {/* CONTENT */}

          <div className="flex-1 p-6 flex flex-col justify-center">

            <h3 className="text-2xl font-bold">
              {episode.title}
            </h3>

            <p className="text-zinc-400 mt-3">
              Episódio disponível para assistir.
            </p>

            <div className="flex items-center gap-6 mt-6 text-sm text-zinc-500">

              <span>
                {episode.duration || 0} min
              </span>

              <span>
                Full HD
              </span>

            </div>

          </div>

        </div>

      </div>

    </Link>

  );
}