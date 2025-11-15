import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const paramsSchema = z.object({
    productId: z.coerce.number().int().positive()
})

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ productId: string }> }
) {
    const { productId } = await context.params

    const validation = paramsSchema.safeParse({ productId })

    if (!validation.success) {
        return NextResponse.json(
            { error: "Invalid product ID" },
            { status: 400 }
        )
    }

    const { productId: id } = validation.data

    const reviews = await prisma.review.findMany({
        where: { productId: id },
        include: { user: true },
        orderBy: { createdAt: "desc" }
    })

    return NextResponse.json({
        success: true,
        data: reviews,
    })
}
