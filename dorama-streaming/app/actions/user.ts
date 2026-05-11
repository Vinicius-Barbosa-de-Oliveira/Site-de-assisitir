"use server";

import { prisma } from "@/lib/prisma";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import bcrypt from "bcryptjs";

export async function updateProfile(
  formData: FormData
) {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Não autorizado");
  }

  const name =
    formData.get("name") as string;

  const email =
    formData.get("email") as string;

  const image =
    formData.get("image") as string;

  const password =
    formData.get("password") as string;

  const updateData: any = {
    name,
    email,
    image,
  };

  if (password?.trim()) {

    updateData.password =
      await bcrypt.hash(password, 10);

  }

  await prisma.user.update({

    where: {
      email: session.user.email,
    },

    data: updateData,

  });

}