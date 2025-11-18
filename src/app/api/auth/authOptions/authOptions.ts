import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { verifyPassword } from "@/lib/bcrypt"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },

    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined) {
                if (!credentials) return null

                const { email, password } = credentials

                if (!email || !password) return null

                const user = await prisma.user.findUnique({
                    where: { email },
                })
                if (!user) return null

                const isValid = await verifyPassword(password, user.password)
                if (!isValid) return null

                // ⚠️ id harus number, sesuai tipe kamu
                return {
                    id: user.id,        // <-- number
                    name: user.name,
                    email: user.email,
                    role: user.role,    // "USER" | "ADMIN"
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = typeof user.id === "string" ? parseInt(user.id, 10) : user.id      // <-- number
                token.role = user.role   // "USER" | "ADMIN"
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
        error: "/authPage/login",
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
