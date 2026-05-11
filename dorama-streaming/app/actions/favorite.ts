"use server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

export async function toggleFavorite(
  dramaId: string
) {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) return;

  const existing =
    await prisma.favorite.findFirst({
      where: {
        dramaId,
        userId: user.id,
      },
    });

  if (existing) {

    await prisma.favorite.delete({
      where: {
        id: existing.id,
      },
    });

    return;

  }

  await prisma.favorite.create({
    data: {
      dramaId,
      userId: user.id,
    },
  });

}