import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { db } from "@/db/db";
import { user } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      userName,
      email,
      password,
    } = body;

    // validação simples
    if (
      !name ||
      !userName ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        {
          error: "Preencha todos os campos",
        },
        { status: 400 }
      );
    }

    // hash da senha
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // insert
    await db.insert(user).values({
      name,
      userName,
      email,
      password: hashedPassword,
      role: "USER",
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: "Erro interno",
      },
      {
        status: 500,
      }
    );
  }
}