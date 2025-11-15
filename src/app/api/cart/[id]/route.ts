// src/app/api/cart/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const UpdateSchema = z.object({
    quantity: z.number().int().min(1),
});

function getIdFromUrl(req: Request) {
    const url = new URL(req.url);
    const idParam = url.pathname.split("/").pop();
    if (!idParam) throw new Error("ID parameter is missing");
    const id = Number(idParam);
    if (!Number.isInteger(id)) throw new Error("Invalid ID parameter");
    return id;
}

// UPDATE cart item
export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    try {
        const id = await getIdFromUrl(req);

        const body = await req.json();
        const { quantity } = UpdateSchema.parse(body);

        const updated = await prisma.cartItem.update({
            where: { id },
            data: { quantity },
            include: { product: true },
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 400 }
        );
    }
}

// DELETE cart item
export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    try {
        const id = await getIdFromUrl(req);

        await prisma.cartItem.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : "Unknown error" },
            { status: 400 }
        );
    }
}
