import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

const createSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    price: z.number(),
    stock: z.number(),
    categoryId: z.number(), // ✅ WAJIB
    image: z.string().optional(),
});


export async function GET(req: Request) {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") ?? 1);
    const limit = Number(url.searchParams.get("limit") ?? 12);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
        prisma.product.findMany({ take: limit, skip, orderBy: { createdAt: "desc" }, include: { category: true } }),
        prisma.product.count()
    ]);

    return NextResponse.json({ data: items, total });
}
export async function POST(req: Request) {
    try {
        // Ambil user admin
        const admin = await requireAdmin(); // return { id: number, name, ... }
        const adminId = Number(admin.id);

        const json = await req.json();
        const data = createSchema.parse(json);

        const product = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                image: data.image,
                category: { connect: { id: data.categoryId } }, // wajib
                user: { connect: { id: adminId } },             // wajib
            },
        });

        return NextResponse.json({ data: product }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err ?? "Invalid" }, { status: 422 });
    }
}

