import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request
) {

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

  const body =
    await req.json();

  const user =
    await prisma.user.findUnique({

      where: {
        email:
          session.user.email,
      },

    });

  if (!user) {

    return NextResponse.json(
      {
        error: "User not found",
      },
      {
        status: 404,
      }
    );

  }

  const favorite =
    await prisma.favorite.create({

      data: {

        userId: user.id,

        dramaId:
          body.dramaId,

      },

    });

  return NextResponse.json(
    favorite
  );

}

export async function DELETE(
  req: Request
) {

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

  const body =
    await req.json();

  const user =
    await prisma.user.findUnique({

      where: {
        email:
          session.user.email,
      },

    });

  if (!user) {

    return NextResponse.json(
      {
        error: "User not found",
      },
      {
        status: 404,
      }
    );

  }

  await prisma.favorite.delete({

    where: {

      userId_dramaId: {

        userId: user.id,

        dramaId:
          body.dramaId,

      },

    },

  });

  return NextResponse.json({
    success: true,
  });

}