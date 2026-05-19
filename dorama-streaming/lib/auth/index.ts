import NextAuth, {
  NextAuthOptions,
} from "next-auth";

import CredentialsProvider
from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";

import { user }
from "@/db/schema/core/users";

export const authOptions:
NextAuthOptions = {

  providers: [

    CredentialsProvider({

      name: "Credentials",

      credentials: {

        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
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

        const foundUser =
          await db.query.user.findFirst({

            where: eq(
              user.email,
              credentials.email
            ),

          });

        if (!foundUser) {
          return null;
        }

        const passwordMatch =
          await bcrypt.compare(
            credentials.password,
            foundUser.password
          );

        if (!passwordMatch) {
          return null;
        }

        return {

          id: foundUser.id,

          name: foundUser.name,

          email: foundUser.email,

          role:
            foundUser.role ?? "USER",

        };

      },

    }),

  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {

    async jwt({
      token,
      user,
    }) {

      if (user) {

        token.role =
          (user as {
            role?: string;
          }).role;

      }

      return token;

    },

    async session({
      session,
      token,
    }) {

      if (session.user) {

        (
          session.user as {
            role?: string;
          }
        ).role =
          token.role as string;

      }

      return session;

    },

  },

  secret:
    process.env.NEXTAUTH_SECRET,

};

const handler =
  NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
};