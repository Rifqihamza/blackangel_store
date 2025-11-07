// app/api/example/route.ts
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session) {
        return Response.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }

    console.log("User ID:", session.user.id)
    console.log("User Role:", session.user.role)

    return Response.json(
        { message: "OK", user: session.user },
        { status: 200 }
    )
}
