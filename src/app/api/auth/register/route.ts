import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/bcrypt";

const bodySchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6)
});

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const data = bodySchema.parse(json);

        const existing = await prisma.user.findUnique({ where: { email: data.email } });
        if (existing) return NextResponse.json({ error: "Email already used" }, { status: 400 });

        const hashed = await hashPassword(data.password);
        const user = await prisma.user.create({
            data: { name: data.name, email: data.email, password: hashed }
        });

        // record activity
        await prisma.activityLog.create({
            data: { userId: user.id, action: "register", ipAddress: null, userAgent: null }
        });

        // send minimal response (no password)
        return NextResponse.json({ user: { id: user.id, email: user.email, name: user.name } }, { status: 201 });
    } catch (err: any) {
        const msg = err?.message ?? "Invalid input";
        return NextResponse.json({ error: msg }, { status: 422 });
    }
}
