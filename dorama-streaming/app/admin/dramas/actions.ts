"use server";

import { prisma } from "@/lib/prisma";

export async function createDrama(
  formData: FormData
) {

  await prisma.drama.create({
    data: {
      title:
        formData.get("title") as string,

      slug:
        formData.get("slug") as string,

      description:
        formData.get("description") as string,

      coverImage:
        formData.get("coverImage") as string,

      bannerImage:
        formData.get("bannerImage") as string,

      country:
        formData.get("country") as string,

      year: Number(
        formData.get("year")
      ),

      rating: Number(
        formData.get("rating")
      ),

      status:
        formData.get("status") as string,

      scheduleDay:
        formData.get("scheduleDay") as string,

      scheduleTime:
        formData.get("scheduleTime") as string,
    },
  });
}

export async function updateDrama(
  id: string,
  formData: FormData
) {

  await prisma.drama.update({
    where: {
      id,
    },

    data: {
      title:
        formData.get("title") as string,

      slug:
        formData.get("slug") as string,

      description:
        formData.get("description") as string,

      coverImage:
        formData.get("coverImage") as string,

      bannerImage:
        formData.get("bannerImage") as string,

      country:
        formData.get("country") as string,

      year: Number(
        formData.get("year")
      ),

      rating: Number(
        formData.get("rating")
      ),

      status:
        formData.get("status") as string,

      scheduleDay:
        formData.get("scheduleDay") as string,

      scheduleTime:
        formData.get("scheduleTime") as string,
    },
  });
}

export async function deleteDrama(id: string) {

  await prisma.drama.delete({
    where: {
      id,
    },
  });

}