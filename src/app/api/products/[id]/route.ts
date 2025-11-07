import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import { requireAdmin } from "@/lib/auth"

const updateSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.number().nonnegative().optional(),
    stock: z.number().int().nonnegative().optional(),
    categoryId: z.number().optional(),
    image: z.string().url().optional(),
})

// 🟢 GET — semua user bisa lihat produk tanpa login
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params
    const productId = Number(id)
    if (isNaN(productId))
        return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })

    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { category: true },
    })

    if (!product)
        return NextResponse.json({ error: "Not found" }, { status: 404 })

    return NextResponse.json({ data: product })
}

// 🟡 PUT — hanya admin
export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()
        const { id } = await context.params
        const productId = Number(id)
        if (isNaN(productId))
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })

        const json = await req.json()
        const data = updateSchema.parse(json)

        const updated = await prisma.product.update({
            where: { id: productId },
            data,
        })

        return NextResponse.json({ data: updated })
    } catch (err) {
        return (
            console.error(err),
            NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        )
    }
}

// 🔴 DELETE — hanya admin
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await requireAdmin()
        const { id } = await context.params
        const productId = Number(id)
        if (isNaN(productId))
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })

        await prisma.product.delete({ where: { id: productId } })

        return NextResponse.json({ success: true })
    } catch (err) {
        return (
            console.error(err),
            NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        )
    }
}
