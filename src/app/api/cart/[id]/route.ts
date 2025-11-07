import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const UpdateCartSchema = z.object({
    quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    try {
        const id = Number(params.id);
        if (isNaN(id)) throw new Error("Invalid ID");

        const body = await req.json();
        const { quantity } = UpdateCartSchema.parse(body);

        const updated = await prisma.cartItem.update({
            where: { id },
            data: { quantity },
            include: { product: true },
        });

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        if (error instanceof z.ZodError)
            return NextResponse.json({ success: false, error: error.issues[0].message }, { status: 400 });

        return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    try {
        const id = Number(params.id);
        if (isNaN(id)) throw new Error("Invalid ID");

        await prisma.cartItem.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof z.ZodError)
            return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
    }
}
