import Image from "next/image";
import Link from "next/link";

import { Clock3 } from "lucide-react";

import EmptyState from "./empty-state";

interface Props {
  items: any[];
}

export default function ContinueWatching({
  items,
}: Props) {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <h2 className="text-4xl font-black">
            Continue Assistindo
          </h2>

          <p className="mt-2 text-zinc-500">
            Retome seus episódios
          </p>
        </div>

        {items.length > 0 ? (
          <div
            className="
              grid
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {items.map((item) => {
              const progress =
                item.progressSeconds &&
                item.episode.duration
                  ? (item.progressSeconds /
                      item.episode.duration) *
                    100
                  : 0;

              return (
                <Link
                  key={item.id}
                  href={`/watch/${item.episode.id}`}
                  className="group"
                >
                  <div
                    className="
                      overflow-hidden
                      rounded-3xl
                      border
                      border-white/10
                      bg-[#12121A]
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:border-purple-500/30
                      hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]
                    "
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={
                          item.episode.thumbnail
                            ?.url ||
                          "/placeholder.jpg"
                        }
                        alt={
                          item.episode.title
                        }
                        fill
                        className="
                          object-cover
                          transition
                          duration-700
                          group-hover:scale-110
                        "
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-linear-to-t
                          from-black
                          via-black/20
                          to-transparent
                        "
                      />
                    </div>

                    <div className="p-5">
                      <h3 className="line-clamp-1 text-lg font-bold">
                        {
                          item.episode.season
                            .dorama.title
                        }
                      </h3>

                      <p className="mt-1 text-sm text-zinc-400">
                        Episódio{" "}
                        {item.episode.number}
                      </p>

                      <div className="mt-5">
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-purple-500"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>

                        <div
                          className="
                            mt-2
                            flex
                            items-center
                            justify-between
                            text-xs
                            text-zinc-500
                          "
                        >
                          <span>
                            {Math.floor(
                              progress
                            )}
                            %
                          </span>

                          <span>
                            Em progresso
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyState
            icon={<Clock3 size={34} />}
            title="Nenhum episódio em andamento"
            description="Comece a assistir um dorama para acompanhar seu progresso."
          />
        )}
      </div>
    </section>
  );
}