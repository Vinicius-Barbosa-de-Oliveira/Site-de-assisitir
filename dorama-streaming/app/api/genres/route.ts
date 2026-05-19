import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(genres);
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
