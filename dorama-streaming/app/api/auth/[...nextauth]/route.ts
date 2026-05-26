import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcryptjs";

import { db } from "@/db/db";
import { user } from "@/db/schema";

import { eq } from "drizzle-orm";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          return null;
        }

        const existingUser =
          await db.query.user.findFirst({
            where: eq(
              user.email,
              credentials.email
            ),
          });

        if (!existingUser) {
          return null;
        }

        const passwordMatch =
          await compare(
            credentials.password,
            existingUser.password
          );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id,
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role,
          userName: existingUser.userName,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.userName =
          (user as any).userName;
      }

      return token;
    },

    async session({
      session,
      token,
    }) {
      if (session.user) {
        (session.user as any).role =
          token.role;

        (session.user as any).userName =
          token.userName;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export {
  handler as GET,
  handler as POST,
};