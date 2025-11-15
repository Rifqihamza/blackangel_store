"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface RegisterForm {
    name: string
    email: string
    password: string
    confirmPassword: string
    terms: boolean
}

export function useRegister() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const register = async (form: RegisterForm) => {
        if (!form.terms) {
            setError("You must accept the Terms and Conditions")
            return
        }
        if (form.password !== form.confirmPassword) {
            setError("Password and Confirm Password must match")
            return
        }

        try {
            setLoading(true)
            setError(null)

            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || "Failed to register")
                return { success: false, message: data.error };
            }

            setSuccess(true)
            router.push("/authPage/login")
            return { success: true };
        } catch (err) {
            console.error(err)
            setError("Something went wrong")
            return { success: false, message: "Something went wrong" }
        } finally {
            setLoading(false)
        }
    }

    return { register, loading, error, success }
}
