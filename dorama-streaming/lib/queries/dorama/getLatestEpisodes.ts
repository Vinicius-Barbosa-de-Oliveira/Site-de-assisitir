import { db } from "@/db/db";

export async function getLatestEpisodes() {
  return await db.query.episode.findMany({
    limit: 24,

    orderBy: (episode, { desc }) => [
      desc(episode.releaseDate),
    ],

    with: {
      thumbnail: true,

      season: {
        with: {
          dorama: {
            with: {
              coverImage: true,
            },
          },
        },
      },

      streams: true,
    },
  });
}