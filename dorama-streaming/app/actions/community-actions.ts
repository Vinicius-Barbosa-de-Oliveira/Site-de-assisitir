"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

  if (!content.trim()) {
    return;
  }

  await prisma.communityMessage.create({
    data: {
      content,
      userId: user.id,
    },
  });

}