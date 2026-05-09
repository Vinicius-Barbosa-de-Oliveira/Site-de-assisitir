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

        return prisma.drama.findMany({
            include: {
            episodes: true,
            },
        });
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

    return dramas.filter((d) => d.episodes.length > 0);
    }