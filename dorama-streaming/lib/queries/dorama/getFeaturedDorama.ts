import { db } from "@/db/db";

export async function getFeaturedDorama() {
  const data = await db.query.dorama.findFirst({
    with: {
      coverImage: true,
      bannerImage: true,
    },
  });

  return data;
}