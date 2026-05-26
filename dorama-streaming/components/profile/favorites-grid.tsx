import Image from "next/image";
import Link from "next/link";

import { Heart } from "lucide-react";

import EmptyState from "./empty-state";

interface Props {
  favorites: any[];
}

export default function FavoritesGrid({
  favorites,
}: Props) {
  return (
    <section className="border-t border-white/5 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <h2 className="text-4xl font-black">
            Favoritos
          </h2>

          <p className="mt-2 text-zinc-500">
            Seus doramas salvos
          </p>
        </div>

        {favorites.length > 0 ? (
          <div
            className="
              grid
              grid-cols-2
              gap-6
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
            "
          >
            {favorites.map((favorite) => (
              <Link
                key={favorite.id}
                href={`/dorama/${favorite.dorama.slug}`}
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
                  "
                >
                  <div className="relative aspect-2/3 overflow-hidden">
                    <Image
                      src={
                        favorite.dorama
                          .coverImage?.url ||
                        "/placeholder.jpg"
                      }
                      alt={
                        favorite.dorama
                          .title
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
                        via-transparent
                        to-transparent
                      "
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-1 text-lg font-bold">
                      {
                        favorite.dorama
                          .title
                      }
                    </h3>

                    <p className="mt-2 text-sm text-zinc-400">
                      {
                        favorite.dorama
                          .year
                      }{" "}
                      •{" "}
                      {
                        favorite.dorama
                          .country
                      }
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Heart size={34} />}
            title="Nenhum favorito ainda"
            description="Salve doramas para encontrá-los rapidamente depois."
          />
        )}
      </div>
    </section>
  );
}