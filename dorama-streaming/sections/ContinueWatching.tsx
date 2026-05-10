"use client";

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

            <div className="bg-[#18181F] rounded-3xl overflow-hidden border border-white/5 hover:border-purple-500/40 transition h-full flex flex-col">

              <div className="relative aspect-16/10">

                <Image
                  src={drama.image}
                  alt={drama.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  className="object-cover"
                />

              </div>

              <div className="p-5 flex flex-col flex-1">

                <h3 className="text-2xl font-bold line-clamp-2 min-h-16">
                  {drama.title}
                </h3>

                <div className="mt-auto">

                  <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden mt-6">

                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{
                        width: "45%",
                      }}
                    />

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