import { NextResponse } from "next/server"
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

// 🟢 GET /api/products/[id]
export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const id = Number(params.id)
    if (isNaN(id))
        return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })

    const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true },
    })

    if (!product)
        return NextResponse.json({ error: "Not found" }, { status: 404 })

    return NextResponse.json({ data: product })
}

// 🟡 PUT /api/products/[id]
export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await requireAdmin()
        const id = Number(params.id)
        if (isNaN(id))
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })

        const json = await req.json()
        const data = updateSchema.parse(json)

        const updated = await prisma.product.update({
            where: { id },
            data,
        })

        return NextResponse.json({ data: updated })
    } catch (err) {
        return NextResponse.json(
            { error: err ?? "Invalid" },
            { status: 422 }
        )
    }
}

// 🔴 DELETE /api/products/[id]
export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await requireAdmin()
        const id = Number(params.id)
        if (isNaN(id))
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })

        await prisma.product.delete({ where: { id } })

        return NextResponse.json({ success: true })
    } catch (err) {
        return NextResponse.json(
            { error: err ?? "Failed" },
            { status: 500 }
        )
    }
}
