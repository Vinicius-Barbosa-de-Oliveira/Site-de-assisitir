import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {

  const messages =
    await prisma.communityMessage.findMany({

      include: {
        user: true,
      },

      orderBy: {
        createdAt: "asc",
      },

      take: 100,

    });

  return NextResponse.json(messages);

}