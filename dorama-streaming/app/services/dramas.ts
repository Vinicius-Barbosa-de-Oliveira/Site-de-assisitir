import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getAllDramas = unstable_cache(
  async () => {

    return prisma.drama.findMany({

      include: {
        genres: true,
      },

    });

  },

  ["all-dramas"],

  {
    revalidate: 3600,
  }

)

export const getTrendingDramas = unstable_cache(
  async () => {
    return prisma.drama.findMany({
      take: 10,

    include: {
      genres: true,
    },

      orderBy: {
        rating: "desc",
      },
    });
  },
  ["trending-dramas"],
  {
    revalidate: 3600,
  }
)

export const getDramaBySlug = unstable_cache(
  async (slug: string) => {
    return prisma.drama.findUnique({
      where: {
        slug,
      },

    include: {
      genres: true,

      episodes: {
        orderBy: {
          number: "asc",
        },
      },
    },
    });
  },
  ["drama-by-slug"],
  {
    revalidate: 3600,
  }
)

export const getRelatedDramas = unstable_cache(
  async (dramaId: string) => {
    return prisma.drama.findMany({
      where: {
        NOT: {
          id: dramaId,
        },
      },
    

      take: 8,

      include: {
        genres: true,
      },

      orderBy: {
        rating: "desc",
      },
    });
  },
  ["related-dramas"],
  {
    revalidate: 3600,
  }
)

export const getSearchDramas = unstable_cache(
  async (search?: string, genre?: string) => {
    return prisma.drama.findMany({

      where: {

        AND: [

          search
            ? {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              }
            : {},

          genre
            ? {
                genres: {
                  some: {
                    name: genre,
                  },
                },
              }
            : {},

        ],

      },

      include: {
        genres: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  },
  ["search-dramas"],
  {
    revalidate: 3600,
  }
)

export const getDramaGenres = unstable_cache(
  async () => {
    return prisma.genre.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },
  ["drama-genres"],
  {
    revalidate: 3600,
  }
)

export const getScheduleDramas = unstable_cache(
  async () => {
    return prisma.drama.findMany({

      where: {
        scheduleDay: {
          not: null,
        },
      },

      include: {

        episodes: {
          orderBy: {
            number: "asc",
          },
        },

        genres: true,

      },

      orderBy: [
        {
          scheduleDay: "asc",
        },
        {
          scheduleTime: "asc",
        },
      ]
    })
  },
  ["schedule-dramas"],
  {
    revalidate: 3600,
  }
)