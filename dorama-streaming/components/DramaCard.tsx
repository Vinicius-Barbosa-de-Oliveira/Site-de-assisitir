import Link from "next/link";

type Props = {
  id: string;
  title: string;
  image: string;
  episode?: string | number;
};

export default function DramaCard({
  id,
  title,
  image,
  episode,
}: Props) {
  return (
    <Link href={`/drama/${id}`}>
      <div className="group cursor-pointer">

        <div className="relative overflow-hidden rounded-2xl">

          <img
            src={image}
            alt={title}
            className="w-full h-80 object-cover transition duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

          {episode && (
            <span className="absolute top-3 left-3 bg-purple-500 px-2 py-1 rounded-lg text-xs font-semibold">
              {episode}
            </span>
          )}

          <div className="absolute bottom-0 p-4">
            <h3 className="font-semibold text-lg">
              {title}
            </h3>
          </div>

        </div>

      </div>
    </Link>
  );
}