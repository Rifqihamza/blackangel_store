import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { verifyPassword } from "@/lib/bcrypt"

// ==============================
// ✅ AUTH OPTIONS CONFIG
// ==============================
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })
                if (!user) return null

                const isValid = await verifyPassword(credentials.password, user.password)
                if (!isValid) return null

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
                token.id = typeof user.id === "string" ? parseInt(user.id) : user.id
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
        signIn: "/login",           // halaman login
        error: "/authPage/error",       // halaman error login
        newUser: "/authPage/register",  // redirect ke register untuk user baru
    },

}

// ==============================
// ✅ NEXTAUTH HANDLER EXPORT
// ==============================
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
