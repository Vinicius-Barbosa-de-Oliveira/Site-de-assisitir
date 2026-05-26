// components/categories/CategoriesClient.tsx

"use client";
import Image from "next/image"; 

import { useMemo, useState } from "react";

import { DoramaCard } from "@/components/cards/DoramaCard";

type Drama = {
  id: string;

  title: string;

  slug: string;

  description: string | null;

  year: number;

  rating: number;

  status: string;

  image: string;

  genres: string[];

  episodes: number;
};

type Genre = {
  id: string;
  name: string;
};

type Props = {
  dramas: Drama[];
  genres: Genre[];
};

export default function CategoriesClient({
  dramas,
  genres,
}: Props) {
  const [search, setSearch] =
    useState("");

  const [
    selectedGenre,
    setSelectedGenre,
  ] = useState("Todos");

  const filteredDramas =
    useMemo(() => {
      return dramas.filter(
        (dorama) => {
          const matchesSearch =
            dorama.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          const matchesGenre =
            selectedGenre ===
              "Todos" ||
            dorama.genres.includes(
              selectedGenre
            );

          return (
            matchesSearch &&
            matchesGenre
          );
        }
      );
    }, [
      dramas,
      search,
      selectedGenre,
    ]);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/5">
        {/* BACKGROUND */}

        {dramas[0]?.image && (
          <Image
            src={dramas[0].image}
            alt={dramas[0].title}
            fill
            priority
            className="object-cover opacity-15"
          />
        )}

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F14]/40 via-[#0F0F14]/90 to-[#0F0F14]" />

        {/* GLOW */}

        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[350px]
            bg-purple-500/20
            blur-[140px]
          "
        />

        {/* CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            {/* BADGE */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-purple-500/20
                bg-purple-500/10
                px-4
                py-2
                text-sm
                text-purple-300
                backdrop-blur-xl
              "
            >
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />

              Explore por Categorias
            </div>

            {/* TITLE */}

            <h1
              className="
                mt-6
                text-5xl
                md:text-6xl
                font-black
                tracking-tight
                leading-tight
              "
            >
              Descubra novos
              <span className="text-purple-500">
                {" "}
                Doramas
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                text-zinc-400
                text-lg
                leading-relaxed
                max-w-2xl
              "
            >
              Explore diferentes gêneros,
              encontre novos favoritos e
              descubra doramas perfeitos para
              cada momento.
            </p>

            {/* STATS */}

            <div className="flex flex-wrap gap-4 mt-10">
              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-4
                  backdrop-blur-xl
                "
              >
                <p className="text-2xl font-black">
                  {dramas.length}
                </p>

                <span className="text-sm text-zinc-400">
                  Doramas
                </span>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-4
                  backdrop-blur-xl
                "
              >
                <p className="text-2xl font-black">
                  {dramas.length}
                </p>

                <span className="text-sm text-zinc-400">
                  Gêneros
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar dorama..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-5
            text-white
            outline-none
            transition
            focus:border-purple-500
          "
        />
      </div>

      {/* GENRES */}

      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() =>
            setSelectedGenre(
              "Todos"
            )
          }
          className={`
            px-5 py-3 rounded-2xl transition
            ${
              selectedGenre ===
              "Todos"
                ? "bg-purple-500 text-white"
                : "bg-white/5 text-zinc-300 hover:bg-white/10"
            }
          `}
        >
          Todos
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() =>
              setSelectedGenre(
                genre.name
              )
            }
            className={`
              px-5 py-3 rounded-2xl transition
              ${
                selectedGenre ===
                genre.name
                  ? "bg-purple-500 text-white"
                  : "bg-white/5 text-zinc-300 hover:bg-white/10"
              }
            `}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* RESULTS */}

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">
          {filteredDramas.length}{" "}
          doramas encontrados
        </h2>
      </div>

      {/* GRID */}

      {filteredDramas.length ===
      0 ? (
        <div className="bg-[#18181F] rounded-3xl p-10 text-center border border-white/10">
          <h3 className="text-2xl font-bold">
            Nenhum dorama
            encontrado
          </h3>

          <p className="text-zinc-400 mt-3">
            Tente buscar outro
            nome ou gênero.
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-6
          "
        >
          {filteredDramas.map(
            (dorama) => (
              <DoramaCard
                key={dorama.id}
                slug={
                  dorama.slug
                }
                title={
                  dorama.title
                }
                image={
                  dorama.image
                }
                rating={
                  dorama.rating
                }
                status={
                  dorama.status
                }
                year={
                  dorama.year
                }
              />
            )
          )}
        </div>
      )}
      </section>
    </main>
  );
}