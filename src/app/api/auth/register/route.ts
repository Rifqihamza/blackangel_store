import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/bcrypt"
import { z } from "zod"

const RegisterSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "Password minimal 6 karakter"),
})

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password } = RegisterSchema.parse(body)

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if (existingUser) {
            return NextResponse.json({ message: "Email sudah terdaftar" }, { status: 409 })
        }

        const hashedPassword = await hashPassword(password)

        await prisma.user.create({
            data: { email, password: hashedPassword, role: "USER" },
        })

        return NextResponse.json({ message: "Akun berhasil dibuat!" }, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
        }

        console.error("Register Error:", error)
        return NextResponse.json({ message: "Terjadi kesalahan server" }, { status: 500 })
    }
}
