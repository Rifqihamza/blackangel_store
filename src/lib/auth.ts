import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getSessionServer() {
    return getServerSession(authOptions)
}

export async function requireAdmin() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }

    if (session.user.role !== "ADMIN") {
        throw new Error("Forbidden")
    }

    // ✅ return user object
    return session.user
}
