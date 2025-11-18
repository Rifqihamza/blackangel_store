import { authOptions } from "@/app/api/auth/authOptions/authOptions"
import { getServerSession } from "next-auth"

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
