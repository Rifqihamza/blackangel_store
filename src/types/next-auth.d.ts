import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: number
            role: "USER" | "ADMIN"
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        id: number
        role: "USER" | "ADMIN"
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: number
        role?: "USER" | "ADMIN"
    }
}
