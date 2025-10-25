import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    id?: string;
  }

  interface Session {
    user: {
      id?: string;
      role?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    role?: string;
  }
}