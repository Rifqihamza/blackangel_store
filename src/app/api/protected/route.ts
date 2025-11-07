import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("Admin ID:", session.user.id)
    console.log("Role:", session.user.role)

    return NextResponse.json({ message: "Welcome, Admin!" }, { status: 200 })
}
