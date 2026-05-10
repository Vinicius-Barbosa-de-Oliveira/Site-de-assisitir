import { NextResponse } from "next/server";
import { getAllDramas } from "@/lib/data";

export async function GET() {
  try {
    const dramas = await getAllDramas();
    return NextResponse.json(dramas);
  } catch (error) {
    console.error("Erro ao buscar dramas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}