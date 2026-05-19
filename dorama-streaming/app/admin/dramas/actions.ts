"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createDrama(
  formData: FormData
) {

  const genreIds =
    formData.getAll("genres") as string[];

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

      genres: {

        connect: genreIds.map((id) => ({
          id,
        })),

      },

    },

  });

}

export async function updateDrama(
  id: string,
  formData: FormData
) {

  const genreIds =
    formData.getAll("genres") as string[];

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

      genres: {

        set: genreIds.map((id) => ({
          id,
        })),

      },

    },

  });

  redirect(
    "/admin/dramas?success=updated"
  );

}

export async function deleteDrama(id: string) {

  await prisma.drama.delete({

    where: {
      id,
    },

  });

}