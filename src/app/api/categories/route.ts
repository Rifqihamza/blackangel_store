import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";

const createSchema = z.object({ name: z.string().min(1) });

export async function GET() {
    const cats = await prisma.category.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json({ data: cats });
}

export async function POST(req: Request) {
    try {
        await requireAdmin();
        const json = await req.json();
        const data = createSchema.parse(json);
        const c = await prisma.category.create({ data: { name: data.name } });
        return NextResponse.json({ data: c }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err ?? "Invalid" }, { status: 422 });
    }
}
