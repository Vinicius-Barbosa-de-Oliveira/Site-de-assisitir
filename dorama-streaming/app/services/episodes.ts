import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getLatestEpisodes = unstable_cache(
  async () => {
    return prisma.episode.findMany({
      take: 24,

      include: {
        drama: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  },

  ["latest-episodes"],

  {revalidate: 3600,}
);

export const getEpisodeById = unstable_cache(
  async (id: string) => {
    return prisma.episode.findUnique({
      where: {
        id,
      },

      include: {
        drama: {
          include: {
            genres: true,
          },
        },

        comments: {
          include: {
            user: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  },
  
  ["episode-by-id"],

  {revalidate: 3600,}
)

export const getEpisodePlayer = unstable_cache(
  async (episodeId: string) => {
    return prisma.episode.findUnique({
      where: {
        id: episodeId,
      },

      include: {
        drama: {
          include: {
            episodes: {
              orderBy: {
                number: "asc",
              },
            },
          },
        },
      },
    });
  },

  ["episode-player"],

  {revalidate: 3600,}


)