import { prisma } from "@/lib/prisma";

import { unstable_cache }
from "next/cache";

// CHAT NORMAL

export async function
getCommunityMessages() {

  return prisma.communityMessage.findMany({

    where: {
      deleted: false,
    },

    include: {
      user: true,
    },

    orderBy: {
      createdAt: "asc",
    },

    take: 100,

  });

}

// MENSAGENS APAGADAS

export const getDeletedMessages =
  unstable_cache(

    async () => {

      return prisma.communityMessage.findMany({

        where: {
          deleted: true,
        },

        include: {

          user: true,

          deletedBy: true,

        },

        orderBy: {
          deletedAt: "desc",
        },

      });

    },

    ["deleted-messages"],

    {
      revalidate: 3600,
    }

  );