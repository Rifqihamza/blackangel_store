import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/bcrypt";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" as const },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user) return null;
                const ok = await verifyPassword(credentials.password, user.password);
                if (!ok) return null;
                // return object stored in token
                return { id: user.id, name: user.name, email: user.email, role: user.role };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = (user as any).role;
            return token;
        },
        async session({ session, token }) {
            (session as any).user.role = token.role;
            return session;
        }
    },
    pages: { signIn: "/login" },
    // inside NextAuth options
    events: {
        async signIn(message) {
            // message = { user, account, profile, isNewUser }
            try {
                await prisma.activityLog.create({
                    data: {
                        userId: Number((message.user as any).id),
                        action: "signIn",
                        ipAddress: null,
                        userAgent: null
                    }
                });
            } catch (e) { /* swallow errors in event */ }
        }
    }

};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
