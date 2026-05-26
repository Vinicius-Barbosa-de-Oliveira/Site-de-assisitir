import { desc } from "drizzle-orm";

import { db } from "@/db/db";
import { dorama } from "@/db/schema";

export async function getPopularDoramas() {
  return await db.query.dorama.findMany({
    limit: 12,

    with: {
      coverImage: true,
      bannerImage: true,
    },

    orderBy: [
      desc(dorama.popularityScore),
    ],
  });
}