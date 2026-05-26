import { db } from "@/db/db";

async function main() {
  const data = await db.query.dorama.findMany({
    with: {
      cover: true,
      banner: true,

      seasons: {
        with: {
          episodes: {
            with: {
              streams: true,
            },
          },
        },
      },
    },
  });

  console.log(JSON.stringify(data, null, 2));
}

main();