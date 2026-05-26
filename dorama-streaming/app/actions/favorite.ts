"use server";

import { getServerSession } from "next-auth";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth";
import { db } from "@/db/db";

import {
  user,
  favorites,
} from "@/db/schema";

export async function toggleFavorite(
  doramaId: string
) {
  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Não autenticado");
  }

  const currentUser =
    await db.query.user.findFirst({
      where: eq(
        user.email,
        session.user.email
      ),
    });

  if (!currentUser) {
    throw new Error("Usuário não encontrado");
  }

  const existingFavorite =
    await db.query.favorites.findFirst({
      where: and(
        eq(
          favorites.userId,
          currentUser.id
        ),
        eq(
          favorites.doramaId,
          doramaId
        )
      ),
    });

  // REMOVE FAVORITO

  if (existingFavorite) {
    await db
      .delete(favorites)
      .where(
        eq(
          favorites.id,
          existingFavorite.id
        )
      );
  }

  // ADICIONA FAVORITO

  else {
    await db.insert(favorites).values({
      userId: currentUser.id,
      doramaId,
    });
  }

  revalidatePath("/profile");
}