"use server";

import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";

export async function createGenre(
  formData: FormData
) {

  const name =
    formData.get("name") as string;

  if (!name) return;

  await prisma.genre.create({

    data: {
      name,
    },

  });

  revalidatePath("/admin/genres");

}

export async function deleteGenre(
  id: string
) {

  await prisma.genre.delete({

    where: {
      id,
    },

  });

  revalidatePath("/admin/genres");

}