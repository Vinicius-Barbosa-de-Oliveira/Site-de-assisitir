import Link from "next/link";
import Image from "next/image";

interface Props {
  dramas: any[];
}

export default function ContinueWatching({
  dramas,
}: Props) {

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="mb-10">

        <h2 className="text-4xl font-black">
          Continue Assistindo
        </h2>

        <p className="text-zinc-400 mt-2">
          Retome de onde parou
        </p>

      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">

        {dramas.slice(0, 4).map((drama) => (

          <Link
            key={drama.id}
            href={`/watch/${drama.slug}/1`}
            className="group"
          >

            <div className="bg-[#18181F] border border-white/5 hover:border-purple-500/40 rounded-3xl overflow-hidden">

              <div className="relative h-55 overflow-hidden">

                <Image
                  src={drama.bannerImage}
                  alt={drama.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                />

                <div className="absolute inset-0 bg-black/40" />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-bold">
                  {drama.title}
                </h3>

                <div className="mt-5">

                  <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">

                    <div className="w-[45%] h-full bg-purple-500 rounded-full" />

                  </div>

                  <p className="text-zinc-400 text-sm mt-3">
                    45% assistido
                  </p>

                </div>

              </div>

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}