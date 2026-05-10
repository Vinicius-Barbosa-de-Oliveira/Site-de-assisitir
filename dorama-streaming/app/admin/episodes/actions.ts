"use server";

import { prisma } from "@/lib/prisma";

export async function createEpisode(
  formData: FormData
) {

  await prisma.episode.create({
    data: {
      dramaId:
        formData.get("dramaId") as string,

      number: Number(
        formData.get("number")
      ),

      title:
        formData.get("title") as string,

      description:
        formData.get("description") as string,

      thumbnail:
        formData.get("thumbnail") as string,

      videoUrl:
        formData.get("videoUrl") as string,

      duration: Number(
        formData.get("duration")
      ),

      releaseDate: new Date(
        formData.get("releaseDate") as string
      ),
    },
  });
}

export async function updateEpisode(
  id: string,
  formData: FormData
) {

  await prisma.episode.update({
    where: {
      id,
    },

    data: {
      dramaId:
        formData.get("dramaId") as string,

      number: Number(
        formData.get("number")
      ),

      title:
        formData.get("title") as string,

      description:
        formData.get("description") as string,

      thumbnail:
        formData.get("thumbnail") as string,

      videoUrl:
        formData.get("videoUrl") as string,

      duration: Number(
        formData.get("duration")
      ),

      releaseDate: new Date(
        formData.get("releaseDate") as string
      ),
    },
  });
}

export async function deleteEpisode(
  id: string
) {

  await prisma.episode.delete({
    where: {
      id,
    },
  });
}