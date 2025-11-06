import NextAuth, { Session, User, Account, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
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
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;
                const user = await prisma.user.findUnique({ where: { email: credentials.email } });
                if (!user) return null;
                const ok = await verifyPassword(credentials.password, user.password);
                if (!ok) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({
            token,
            user,
            account,
            profile,
            isNewUser,
        }: {
            token: JWT;
            user?: User | (User & { id: number }) | null;
            account: Account | null;
            profile?: Profile;
            isNewUser?: boolean;
        }) {
            if (user) {
                // Jika datang dari AdapterUser (id string), convert ke number
                token.id = typeof user.id === "string" ? parseInt(user.id) : user.id;
                token.role = (user as any).role; // sudah aman karena tipe role ada di user
            }
            return token;
        },

        async session({
            session,
            token,
            user,
        }: {
            session: Session;
            token: JWT;
            user: User;
        }) {
            session.user.id = token.id as number;
            session.user.role = token.role as "USER" | "ADMIN";
            return session;
        },
    },
    pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
