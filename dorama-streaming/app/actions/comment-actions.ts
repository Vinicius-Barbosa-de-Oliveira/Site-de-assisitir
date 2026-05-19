"use server";

import { db }
from "@/lib/db";

import {
  users,
  comment,
} from "@/db/schema";

import { eq }
from "drizzle-orm";

import { getServerSession }
from "next-auth";

import { authOptions }
from "@/lib/auth";

export async function createComment(
  episodeId: string,
  formData: FormData
) {

  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.user?.email) {

    throw new Error(
      "Não autenticado"
    );

  }

  const foundUser =
    await db.query.user.findFirst({

      where: (
        table,
        { eq }
      ) =>
        eq(
          table.email,
          session.user.email
        ),

    });

  if (!foundUser) {

    throw new Error(
      "Usuário não encontrado"
    );

  }

  const content =
    formData.get(
      "content"
    ) as string;

  if (!content?.trim()) {
    return;
  }

  await db.insert(comment).values({

    content,

    userId: foundUser.id,

    episodeId,

  });

}