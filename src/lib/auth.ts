import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function getSessionServer() {
    return getServerSession(authOptions);
}

export async function requireAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || (session).user.role !== "ADMIN") {
        const res = NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        throw res;
    }
    return session;
}
