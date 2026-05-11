    import { prisma } from "./prisma";

    export async function getAllDramas() {

        const dramas = await prisma.drama.findMany({
            include: {
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
      createdAt: "desc",
    },

    include: {
      drama: true,
    },
  });
}