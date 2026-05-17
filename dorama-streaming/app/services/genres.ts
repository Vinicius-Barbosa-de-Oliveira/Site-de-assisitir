import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getGenres = unstable_cache(
  async () => {
    return prisma.genre.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },
  ["genres"],
  {
    revalidate: 3600,
  }
);