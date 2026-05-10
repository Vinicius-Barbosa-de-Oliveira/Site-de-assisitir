import Image from "next/image";
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

        <div className="bg-[#18181F] rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/40 transition h-80 flex">

        {/* IMAGE */}

        <div className="relative w-[320px] min-w-[320px] h-full">
          <Image
            src={episode.thumbnail || '/placeholder.png'}
            alt={episode.title}
            fill
            priority
            className="object-cover"
          />
          
        </div>

        {/* CONTENT */}

        <div className="flex flex-col justify-between p-8 flex-1">

          <div>

            <h2 className="text-3xl font-bold line-clamp-1">
              Episódio {episode.number}
            </h2>

            <p className="text-zinc-400 mt-4 line-clamp-2">
              Episódio disponível para assistir.
            </p>

          </div>

          <div className="flex items-center gap-6 text-zinc-500 text-sm">

            <span>
              {episode.duration} min
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