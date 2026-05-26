import NextAuth, {
  DefaultSession,
} from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;

      role:
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

      userName: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;

    role:
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

    userName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;

    role:
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

    userName: string;
  }
}