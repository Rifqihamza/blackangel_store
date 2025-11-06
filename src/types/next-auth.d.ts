// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
    // tambahkan property role dan id (string) ke session.user
    interface Session {
        user: DefaultSession["user"] & {
            id: string;
            role?: string;
        };
    }

    // jika kamu perlu tipe User dari NextAuth
    interface User {
        id: string;
        role?: string;
    }
}

declare module "next-auth/jwt" {
    // tambahkan role ke JWT token
    interface JWT {
        role?: string;
    }
}
