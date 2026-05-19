import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const drama = await prisma.drama.findUnique({
    where: {
      slug,
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