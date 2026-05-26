import { db } from "@/db/db";

export async function getRecentlyAdded() {
  return await db.query.dorama.findMany({
    limit: 12,

    with: {
      coverImage: true,
      bannerImage: true,
    },

    orderBy: (dorama, { desc }) => [
      desc(dorama.createdAt),
    ],
  });
}