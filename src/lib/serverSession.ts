import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/authOptions/authOptions"

export async function getSessionServer() {
    return getServerSession(authOptions)
}
