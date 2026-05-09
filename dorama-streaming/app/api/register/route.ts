import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      name,
      email,
      password,
    } = body;

    if (
      !name ||
      !email ||
      !password
    ) {

      return NextResponse.json(
        {
          error:
            "Preencha todos os campos",
        },

        {
          status: 400,
        }
      );

    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {

      return NextResponse.json(
        {
          error:
            "Email já cadastrado",
        },

        {
          status: 400,
        }
      );

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password:
            hashedPassword,
        },
      });

    return NextResponse.json(
      {
        message:
          "Usuário criado",

        user,
      },

      {
        status: 201,
      }
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error:
          "Erro interno",
      },

      {
        status: 500,
      }
    );

  }

}