import { prisma } from "@/lib/prisma";

// USER BY EMAIL

export async function getUserByEmail(
  email: string
) {

  return prisma.user.findUnique({

    where: {
      email,
    },

  });

}

// CONTINUE WATCHING

export async function
getContinueWatching(
  email: string
) {

  const user =
    await prisma.user.findUnique({

      where: {
        email,
      },

      include: {

        watchProgress: {

          where: {
            completed: false,
          },

          include: {

            episode: {

              include: {
                drama: true,
              },

            },

          },

          orderBy: {
            updatedAt: "desc",
          },

          take: 8,

        },

      },

    });

  return user?.watchProgress || [];

}

// USER FAVORITES

export async function getUserFavorites(
  userId: string
) {

  return prisma.favorite.findMany({

    where: {
      userId,
    },

    include: {

      drama: {
        include: {
          genres: true,
        },
      },

    },

    orderBy: {
      createdAt: "desc",
    },

  });

}

// USER COMMENTS

export async function getUserComments(
  userId: string
) {

  return prisma.comment.findMany({

    where: {
      userId,
    },

    include: {

      episode: {
        include: {
          drama: true,
        },
      },

    },

    orderBy: {
      createdAt: "desc",
    },

  });

}

// USER RATINGS

export async function getUserRatings(
  userId: string
) {

  return prisma.rating.findMany({

    where: {
      userId,
    },

    include: {
      drama: true,
    },

    orderBy: {
      id: "desc",
    },

  });

}