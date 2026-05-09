import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {

  const drama = await prisma.drama.findUnique({
    where: {
      slug: params.slug,
    },

    include: {
      episodes: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });

  if (!drama) {
    return NextResponse.json(
      { error: "Drama não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(drama);
}