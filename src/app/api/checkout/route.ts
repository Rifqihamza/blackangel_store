import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

// ==============================
// ✅ ZOD VALIDATION
// ==============================
const CheckoutSchema = z.object({
    formData: z.object({
        address: z.object({
            recipient: z.string().min(1),
            phone: z.string().min(1),
            address: z.string().min(1),
            city: z.string().min(1),
            province: z.string().min(1),
            postalCode: z.string().min(1),
            courier: z.string().min(1),
        }),
        paymentMethod: z.string().min(1),
    }),
    cartItems: z.array(
        z.object({
            id: z.number(),
            price: z.number().positive(),
            quantity: z.number().int().positive(),
        })
    ),
})

// ==============================
// ✅ POST /api/checkout
// ==============================
export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session)
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })

    try {
        const body = await req.json()
        const { formData, cartItems } = CheckoutSchema.parse(body)
        const userId = session.user.id
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

        // 🏡 Create Address (if needed, can also check for existing)
        await prisma.address.create({
            data: {
                userId,
                label: "Alamat Utama",
                recipient: formData.address.recipient,
                phone: formData.address.phone,
                address: formData.address.address,
                city: formData.address.city,
                province: formData.address.province,
                postalCode: formData.address.postalCode,
                isDefault: true,
            },
        })

        // 💳 Create Payment
        const payment = await prisma.payment.create({
            data: {
                method: formData.paymentMethod,
                status: "UNPAID",
            },
        })

        // 🚚 Create Shipping
        const shipping = await prisma.shipping.create({
            data: {
                courier: formData.address.courier,
                address: formData.address.address,
                city: formData.address.city,
                province: formData.address.province,
                postalCode: formData.address.postalCode,
            },
        })

        // 🧾 Create Order + OrderItems
        const order = await prisma.order.create({
            data: {
                userId,
                total,
                status: "PENDING",
                paymentId: payment.id,
                shippingId: shipping.id,
                items: {
                    create: cartItems.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    })),
                },
            },
            include: {
                payment: true,
                items: true,
                shipping: true,
            },
        })

        return NextResponse.json({ success: true, order })
    } catch (error) {
        console.error("Checkout Error:", error)
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: "Invalid input", errors: error.issues },
                { status: 400 }
            )
        }
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
    }
}
