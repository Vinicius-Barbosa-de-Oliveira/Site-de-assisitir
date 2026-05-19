"use server";

import { db } from "@/lib/db";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { io } from "@/lib/socket-server";

// ENVIAR MENSAGEM

export async function sendCommunityMessage(
  formData: FormData
) {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    return false;
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!user) {
    return false;
  }

  const content =
    formData
      .get("content")
      ?.toString()
      .trim();

  if (!content) {
    return false;
  }

  const message =
    await prisma.communityMessage.create({
      data: {
        content,
        userId: user.id,
      },

      include: {
        user: true,
      },
    });

  io.emit(
    "new-message",
    message
  );

  return true;

}

// DELETAR MENSAGEM

export async function deleteCommunityMessage(
  id: string
) {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    return false;
  }

  // BUSCA O USUÁRIO

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!user) {
    return false;
  }

  // BUSCA A MENSAGEM

  const message =
    await prisma.communityMessage.findUnique({
      where: {
        id,
      },

      include: {
        user: true,
      },
    });

  if (!message) {
    return false;
  }

  // PERMISSÕES

  const isAdmin =
    user.role === "ADMIN";

  const isOwner =
    message.userId === user.id;

  if (!isAdmin && !isOwner) {
    return false;
  }

  // SOFT DELETE

  const deletedMessage =
    await prisma.communityMessage.update({

      where: {
        id,
      },

      data: {
        deleted: true,
        deletedAt: new Date(),
        deletedById: user.id,
      },

      include: {
        user: true,
      },

    });

  // SOCKET

  io.emit(
    "message-deleted",
    {
      id,
      deleted: true,
      deletedAt:
        deletedMessage.deletedAt,
    }
  );

  return true;

}