import { prisma } from "./prisma";

export async function getAllDramas() {

    const dramas = await prisma.drama.findMany({
        include: {

            genres: true,

            episodes: {
                orderBy: {
                    number: "desc",
                },
                take: 1,
            },
        },
    });

    return dramas.map((drama) => ({
        ...drama,

        latestEpisode:
            drama.episodes[0] || null,
    }));
}

export async function getDramaBySlug(slug: string) {

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
}

export async function getLatestEpisodes() {

    return prisma.episode.findMany({

        take: 12,

        orderBy: {
            updatedAt: "desc",
        },

        include: {
            drama: true,
        },

    });

}

export async function getGenres() {

  return prisma.genre.findMany({

    orderBy: {
      name: "asc",
    },

  });

}