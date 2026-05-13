"use server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function createComment(
  episodeId: string,
  formData: FormData
) {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Não autenticado");
  }

  const user =
    await prisma.user.findUnique({

      where: {
        email: session.user.email,
      },

    });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const content =
    formData.get("content") as string;

  if (!content.trim()) {
    return;
  }

  await prisma.comment.create({

    data: {

      content,

      userId: user.id,

      episodeId,

    },

  });

}