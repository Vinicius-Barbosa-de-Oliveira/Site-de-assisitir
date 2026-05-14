"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { io } from "@/lib/socket-server";

export async function sendCommunityMessage(
  formData: FormData
) {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    return;
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!user) {
    return;
  }

  const content =
    formData.get("content") as string;

  const cleanContent =
    content.trim();

  if (!cleanContent) {
    return;
  }

  const message =
    await prisma.communityMessage.create({

      data: {
        content: cleanContent,
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

}