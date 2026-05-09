import Link from "next/link";

interface Props {
  drama: {
    id: string;
    title: string;
    slug: string;
    coverImage: string;
    episodes?: {
      number: number;
    }[];
  };
}

export default function DramaCard({
  drama,
}: Props) {

  const latestEpisode =
    drama.episodes?.[0];

  return (
    <Link
      href={`/drama/${drama.slug}`}
      className="group cursor-pointer block"
    >

      <div className="relative overflow-hidden rounded-2xl">

        <img
          src={drama.coverImage}
          alt={drama.title}
          className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

        {latestEpisode && (
          <span className="absolute top-3 left-3 bg-purple-500 px-2 py-1 rounded-lg text-xs font-semibold">

            EP {latestEpisode.number}

          </span>
        )}

        <div className="absolute bottom-0 p-4">

          <h3 className="font-semibold text-lg">
            {drama.title}
          </h3>

        </div>

      </div>

    </Link>
  );
}