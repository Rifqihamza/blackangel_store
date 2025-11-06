// src/types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number;                // tambahkan id
            role: "USER" | "ADMIN";    // tambahkan role
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id: number;
        role: "USER" | "ADMIN";
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: number;                // tambahkan id
        role?: "USER" | "ADMIN";    // role optional
    }
}
