import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const AddToCartSchema = z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().min(1).default(1),
});

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const userId = session.user.id;

    const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } },
    });

    return NextResponse.json({ success: true, data: cart?.items ?? [] });
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    try {
        const body = await req.json();
        const { productId, quantity } = AddToCartSchema.parse(body);
        const userId = session.user.id;

        let cart = await prisma.cart.findUnique({ where: { userId } });
        if (!cart) cart = await prisma.cart.create({ data: { userId } });

        const existingItem = await prisma.cartItem.findFirst({
            where: { cartId: cart.id, productId },
        });

        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        } else {
            await prisma.cartItem.create({
                data: { cartId: cart.id, productId, quantity },
            });
        }

        const updatedCart = await prisma.cart.findUnique({
            where: { id: cart.id },
            include: { items: { include: { product: true } } },
        });

        return NextResponse.json({ success: true, data: updatedCart?.items });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const message = error.issues?.[0]?.message ?? "Invalid request";
            return NextResponse.json({ success: false, error: message }, { status: 400 });
        }
        console.error("Cart POST error:", error);
        return NextResponse.json({ success: false, error: "Failed to add to cart" }, { status: 500 });
    }
}
