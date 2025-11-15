import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/bcrypt"
import { z } from "zod"

const RegisterSchema = z.object({
    name: z.string().min(2, "Nama minimal 2 karakter").max(50, "Nama terlalu panjang"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { name, email, password } = RegisterSchema.parse(body)

        // Cek email sudah ada
        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: "Email sudah terdaftar" },
                { status: 409 }
            )
        }

        const hashedPassword = await hashPassword(password)

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role: "USER" },
        })

        return NextResponse.json(
            { success: true, message: "Akun berhasil dibuat!", data: { id: user.id, name: user.name, email: user.email } },
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { success: false, message: error.issues[0].message },
                { status: 400 }
            )
        }

        console.error("Register Error:", error)
        return NextResponse.json(
            { success: false, message: "Terjadi kesalahan server" },
            { status: 500 }
        )
    }
}
