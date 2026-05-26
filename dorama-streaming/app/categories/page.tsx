// app/categories/page.tsx

import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import CategoriesClient from "@/components/sections/CategoriesClient";

import { db } from "@/db/db";
import { boolean } from "drizzle-orm/gel-core";

export default async function CategoriesPage() {
  const dramas = await db.query.dorama.findMany({
    with: {
      coverImage: true,

      genres: {
        with: {
          genre: true,
        },
      },

      seasons: {
        with: {
          episodes: true,
        },
      },
    },

    orderBy: (dorama, { desc }) => [
      desc(dorama.createdAt),
    ],
  });

  const genres = await db.query.genre.findMany({
    orderBy: (genre, { asc }) => [
      asc(genre.name),
    ],
  });

    const formattedDramas = dramas.map((dorama) => ({
    id: dorama.id,

    title: dorama.title,

    slug: dorama.slug,

    description: dorama.description,

    year: dorama.year,

    rating:
        Number(dorama.popularityScore) || 0,

    status: dorama.status,

    image:
        dorama.coverImage?.url ||
        "/placeholder.jpg",

    genres: dorama.genres
        .map((g) => g.genre?.name)
        .filter(
        (name): name is string =>
            Boolean(name)
        ),

    episodes:
        dorama.seasons.reduce(
        (total, season) =>
            total +
            season.episodes.length,
        0
        ),  
    }));

  const formattedGenres =
    genres.map((genre) => ({
      id: genre.id,
      name: genre.name,
    }));

  return (
    <main className="min-h-screen bg-[#0F0F14] text-white">
      <Navbar />

      <CategoriesClient
        dramas={formattedDramas}
        genres={formattedGenres}
      />

      <Footer />
    </main>
  );
}