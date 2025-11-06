import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/bcrypt";

// 🔹 Definisikan tipe event signIn (karena NextAuth belum ekspor resminya)
interface SignInEvent {
    user?: {
        id?: string | number;
        name?: string | null;
        email?: string | null;
        role?: string | null;
    };
    account?: unknown;
    profile?: unknown;
    isNewUser?: boolean;
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
                if (!user) return null;

                const ok = await verifyPassword(credentials.password, user.password);
                if (!ok) return null;

                // pastikan id bertipe string agar cocok dengan NextAuth
                return {
                    id: String(user.id),
                    name: user.name ?? null,
                    email: user.email,
                    role: user.role ?? null,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user && "role" in user) {
                token.role = (user as { role?: string }).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub ?? "";
                session.user.role = token.role as string | undefined;
            }
            return session;
        },
    },
    pages: { signIn: "/login" },
    events: {
        async signIn(message: SignInEvent) {
            const userId = Number(message.user?.id ?? 0);
            if (!userId) return;

            try {
                await prisma.activityLog.create({
                    data: {
                        userId,
                        action: "signIn",
                        ipAddress: null,
                        userAgent: null,
                    },
                });
            } catch {
                // abaikan error event logging
            }
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
