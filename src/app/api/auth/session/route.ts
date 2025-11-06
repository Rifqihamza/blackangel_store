import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return new Response("Unauthorized", { status: 401 });

    console.log(session.user.id);   // ✅ aman
    console.log(session.user.role); // ✅ aman
    return new Response("OK");
}
