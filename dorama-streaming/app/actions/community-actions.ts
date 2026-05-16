"use server";

import { prisma } from "@/lib/prisma";

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

  if (
    !session ||
    session.user.role !== "ADMIN"
  ) {
    return false;
  }

  const message =
    await prisma.communityMessage.findUnique({
      where: {
        id,
      },
    });

  if (!message) {
    return false;
  }

  await prisma.communityMessage.delete({
    where: {
      id,
    },
  });

  io.emit(
    "delete-message",
    id
  );

  return true;

}