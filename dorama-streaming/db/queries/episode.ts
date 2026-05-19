import { episodes, } from "@/db/schema/index";

import { db } from "@/lib/db";

import {
  desc,
  eq,
} from "drizzle-orm";

export async function getAllEpisodes() {
    return db.query.episodes.findMany({
        columns: {
            id: true,
            season_Id: true,
            number: true,
            title: true,
            description: true,
            thumbnail: true,
            duration: true,
            releaseDate: true,
            createdAt: true,
            updatedAt: true,
        },
        orderBy: [
            desc(episodes.createdAt),
        ],
    });
}

export async function getEpisodesBySeasonId(seasonId: string) {
    return db.query.episodes.findMany({
        where: eq(episodes.season_Id, seasonId),
        columns: {
            id: true,
            season_Id: true,
            number: true,
        },
        orderBy: [
            desc(episodes.number),
        ],
    });
}

export async function getUltimoEpisodes() {
    return db.query.episodes.findMany({
        columns: {
            releaseDate: true,
        },
        orderBy: [
            desc(episodes.releaseDate),
        ],
    });
}