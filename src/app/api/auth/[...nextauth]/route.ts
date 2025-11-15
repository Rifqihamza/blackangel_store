import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { verifyPassword } from "@/lib/bcrypt"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 hari
        updateAge: 24 * 60 * 60,   // refresh token tiap 24 jam
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET, // pastikan ini ada
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null
                const user = await prisma.user.findUnique({ where: { email: credentials.email } })
                if (!user) return null

                const isValid = await verifyPassword(credentials.password, user.password)
                if (!isValid) return null

                // ✅ harus return object dengan minimal id, name, email
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = Number(user.id)
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as number
                session.user.role = token.role as "USER" | "ADMIN"
            }
            return session
        },
    },
    pages: {
        signIn: "/authPage/login",
        newUser: "/authPage/register",
        error: "/authPage/login"
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
