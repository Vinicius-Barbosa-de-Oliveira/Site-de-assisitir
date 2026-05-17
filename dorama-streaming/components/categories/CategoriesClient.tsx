"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams }
from "next/navigation";

import DramaCard
from "@/components/DramaCard";

interface Genre {
  id: string;
  name: string;
}

interface Props {
  dramas: any[];
  genres: Genre[];
}

export default function CategoriesClient({
  dramas,
  genres,
}: Props) {

  const searchParams =
    useSearchParams();

  const searchFromUrl =
    searchParams.get("search");

  const genreFromUrl =
    searchParams.get("genre");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("Todos");

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    if (genreFromUrl) {
      setSelectedCategory(
        genreFromUrl
      );
    }

    if (searchFromUrl) {
      setSearch(searchFromUrl);
    }

  }, [
    genreFromUrl,
    searchFromUrl,
  ]);

  const filteredDramas =
    useMemo(() => {

      return dramas.filter(
        (drama) => {

          const matchesCategory =
            selectedCategory ===
            "Todos"

              ? true

              : drama.genres.some(
                  (genre: Genre) =>
                    genre.name ===
                    selectedCategory
                );

          const matchesSearch =
            drama.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              );

          return (
            matchesCategory &&
            matchesSearch
          );

        }
      );

    }, [
      selectedCategory,
      search,
      dramas,
    ]);

  const categories = [
    "Todos",
    ...genres.map(
      (g) => g.name
    ),
  ];

  return (

    <>

      {/* HERO */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-white/10
        "
      >

        <div
          className="
            absolute
            inset-0
            bg-linear-to-r
            from-purple-500/20
            to-transparent
          "
        />

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-24
            relative
            z-10
          "
        >

          <span
            className="
              bg-purple-500
              px-4
              py-2
              rounded-full
              text-sm
            "
          >
            Explorar
          </span>

          <h1
            className="
              text-6xl
              font-black
              mt-6
            "
          >
            Categorias
          </h1>

        </div>

      </section>

      {/* SEARCH */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          pt-10
        "
      >

        <div
          className="
            bg-[#18181F]
            border
            border-white/10
            rounded-3xl
            p-4
          "
        >

          <input
            type="text"
            placeholder="Buscar dorama..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              bg-transparent
              outline-none
              text-white
            "
          />

        </div>

      </section>

      {/* FILTERS */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-10
        "
      >

        <div
          className="
            flex
            flex-wrap
            gap-4
          "
        >

          {categories.map(
            (category) => (

              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
                className={`
                  px-6
                  py-4
                  rounded-2xl
                  transition

                  ${
                    selectedCategory ===
                    category

                      ? "bg-purple-500"

                      : "bg-[#18181F]"
                  }
                `}
              >

                {category}

              </button>

            )
          )}

        </div>

      </section>

      {/* RESULTS */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          pb-20
        "
      >

        <div
          className="
            grid
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-6
          "
        >

          {filteredDramas.map(
            (drama) => (

              <DramaCard
                key={drama.id}
                drama={drama}
              />

            )
          )}

        </div>

      </section>

    </>

  );

}