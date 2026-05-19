import { db } from "@/lib/db";

import { dorama, episodes, genres } from "@/db/schema/index";

import {
  desc,
  eq,
  and,
  ilike,
  ne,
  sql,
} from "drizzle-orm";

export async function getAllDramas() {

  return db.query.dorama.findMany({

    columns: {
        id: true,
        title: true,
        slug: true,
        description: true,
        coverImage: true,
        banner_Image: true,
        trailer_Url: true,
        country: true,
        year: true,
        status: true,
        scheduleDay: true,
        scheduleTime: true,
        rating: true,      
        created_At: true,
        updated_At: true,
    },

    with: {

      genres: {
        columns: {
          id: true,
          name: true,
        },
      },

    },

    orderBy: [
      desc(dorama.created_At),
    ],

  });

}

export async function getTrendingDramas() {

  return db.query.dorama.findMany({

    limit: 10,

    columns: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      rating: true,
    },

    with: {

      genres: {
        columns: {
          id: true,
          name: true,
        },
      },

    },

    orderBy: [
      desc(dorama.ratingsCount),
    ],

  });

}

export async function getDramaBySlug(slug: string) {
    return db.query.dorama.findFirst({

        where: eq(
            dorama.slug,
            slug
        ),

        with: {

            genres: true,

            episodes: {

                columns: {
                id: true,
                number: true,
                title: true,
                thumbnail: true,
                duration: true,
                },

                orderBy: [
                episodes.number,
                ],

            },

        },

    });

}

export async function getRelatedDramas(
  dorama_Id: string
) {

  return db.query.dorama.findMany({

    where: ne(
      dorama.id,
      dorama_Id
    ),

    limit: 8,

    columns: {
      id: true,
      title: true,
      slug: true,
      coverImage: true,
      rating: true,
    },

    with: {

      genres: {
        columns: {
          id: true,
          name: true,
        },
      },

    },

    orderBy: [
      desc(dorama.ratingsCount),
    ],

  });

}

export async function getSearchDramas(
  search?: string,
  selectedGenre?: string
) {

  return db.query.dorama.findMany({

    where: and(

      search
        ? ilike(
            dorama.title,
            `%${search}%`
          )
        : undefined,

      selectedGenre
        ? sql`${selectedGenre} IN (
            SELECT g.name
            FROM "_DramaToGenre" dg
            INNER JOIN "Genre" g
            ON g.id = dg."B"
            WHERE dg."A" = ${dorama.id}
          )`
        : undefined

    ),

    with: {

      genres: {
        columns: {
          id: true,
          name: true,
        },
      },

    },

    orderBy: [
      desc(dorama.created_At),
    ],

  });

}

export async function getDramaGenres() {

  return db.query.genres.findMany({

    columns: {
      id: true,
      name: true,
    },

    orderBy: [
      genres.name,
    ],

  });

}

export async function getScheduleDramas() {

  return db.query.dorama.findMany({

    where: sql`${dorama.scheduleDay} IS NOT NULL`,

    with: {

      genres: true,

      episodes: {

        columns: {
          id: true,
          number: true,
          thumbnail: true,
        },

        orderBy: [
          episodes.number,
        ],

      },

    },

    orderBy: [
      dorama.scheduleDay,
      dorama.scheduleTime,
    ],

  });

}