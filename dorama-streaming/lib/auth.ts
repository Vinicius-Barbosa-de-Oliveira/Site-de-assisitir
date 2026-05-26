// lib/auth.ts

import type {
  NextAuthOptions,
} from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import { db } from "@/db/db";


export const authOptions: NextAuthOptions =
  {
    providers: [
      CredentialsProvider({
        name: "credentials",

        credentials: {
          email: {
            label: "Email",
            type: "email",
          },

          password: {
            label: "Senha",
            type: "password",
          },
        },

        async authorize(credentials) {
          if (
            !credentials?.email ||
            !credentials?.password
          ) {
            return null;
          }

          const user =
            await db.query.user.findFirst({
              where: (user, { eq }) =>
                eq(
                  user.email,
                  credentials.email
                ),
            });

          if (!user?.password) {
            return null;
          }

          const passwordMatch =
            await bcrypt.compare(
              credentials.password,
              user.password
            );

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            userName: user.userName,
          };
        },
      }),
    ],

    session: {
      strategy: "jwt",
    },

    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;

          token.role = user.role;

          token.userName =
            user.userName;
        }

        return token;
      },

      async session({
        session,
        token,
      }) {
        if (session.user) {
          session.user.id =
            token.id as string;

          session.user.role =
            token.role as
              | "ADMIN"
              | "CONTRIBUTOR"
              | "EDITOR"
              | "GUEST"
              | "MEMBER"
              | "MODERATOR"
              | "SUPER_ADMIN"
              | "USER"
              | "VIEWER"
              | null;

          session.user.userName =
            token.userName as string;
        }

        return session;
      },
    },

    pages: {
      signIn: "/login",
    },

    secret:
      process.env.NEXTAUTH_SECRET,
  };