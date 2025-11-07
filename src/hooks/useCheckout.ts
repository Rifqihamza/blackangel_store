"use client"
import { useState } from "react"
import { createOrder } from "../services/checkoutService"
import { useRouter } from "next/navigation"

export function useCheckout() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const router = useRouter()

    const handleCheckout = async (formData: any, cartItems: any[]) => {
        try {
            setLoading(true)
            setError(null)
            const res = await createOrder(formData, cartItems)
            if (res?.success) {
                setSuccess(true)
                router.push("/(site)/order-success")
            } else {
                setError(res?.message || "Gagal memproses pesanan")
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return { handleCheckout, loading, error, success }
}
