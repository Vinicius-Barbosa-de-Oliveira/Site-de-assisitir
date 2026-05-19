"use server";

import { db } from "@/lib/db";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function saveWatchProgress({
  episodeId,
  currentTime,
  duration,
}: {
  episodeId: string;
  currentTime: number;
  duration: number;
}) {

    const session =
        await getServerSession(authOptions);

    if (!session?.user?.email) return;

    const user =
        await prisma.user.findUnique({
        where: {
            email: session.user.email,
        },
        });

    if (!user) return;

    const completed = duration > 0 && currentTime >= duration * 0.9; // Considera completo se assistiu 90%

  // Type assertion needed due to TypeScript cache issues with Prisma generated types
    await prisma.watchProgress.upsert({

        where: {
            userId_episodeId: {
            userId: user.id,
            episodeId,
            },
        },

        update: {

            currentTime,

            completed:
            currentTime >= duration - 10,

        },

        create: {

            userId: user.id,

            episodeId,

            currentTime,

            completed:
            currentTime >= duration - 10,

        },

        });

}