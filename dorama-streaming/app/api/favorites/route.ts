import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { and, eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth";

import { db } from "@/db/db";

import {
  favorites,
  user,
} from "@/db/schema";

export async function POST(
  req: Request
) {
  try {
    const session =
      await getServerSession(
        authOptions
      );

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const { doramaId } = body;

    if (!doramaId) {
      return NextResponse.json(
        {
          error:
            "doramaId is required",
        },
        {
          status: 400,
        }
      );
    }

    const currentUser =
      await db.query.user.findFirst({
        where: eq(
          user.email,
          session.user.email
        ),
      });

    if (!currentUser) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const existingFavorite =
      await db.query.favorites.findFirst({
        where: and(
          eq(
            favorites.userId,
            currentUser.id
          ),

          eq(
            favorites.doramaId,
            doramaId
          )
        ),
      });

    // REMOVE FAVORITE
    if (existingFavorite) {
      await db
        .delete(favorites)
        .where(
          eq(
            favorites.id,
            existingFavorite.id
          )
        );

      return NextResponse.json({
        favorited: false,
      });
    }

    // ADD FAVORITE
    await db.insert(favorites).values({
      userId: currentUser.id,
      doramaId,
    });

    return NextResponse.json({
      favorited: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}