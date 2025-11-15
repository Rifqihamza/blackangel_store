"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createOrder } from "../services/checkoutService"
import { CartItemType, AddressType } from "@/types/variable"

interface CheckoutFormData extends Omit<AddressType, "id" | "label" | "isDefault"> {
    paymentMethod: string
}

interface OrderType {
    id: string;
    total: number;
    status: string;
    items: CartItemType[];
    shippingAddress: AddressType;
}

interface CheckoutResponse {
    success: boolean
    message?: string
    order?: OrderType
}

export function useCheckout() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const router = useRouter()

    const handleCheckout = async (formData: CheckoutFormData, cartItems: CartItemType[]) => {
        try {
            setLoading(true)
            setError(null)

            // Panggil service
            const res: CheckoutResponse = await createOrder(formData, cartItems)

            if (res.success) {
                setSuccess(true)
                router.push("/(site)/order-success")
            } else {
                setError(res.message || "Gagal memproses pesanan")
            }
        } catch (err) {
            console.log(err)
            setError("Terjadi kesalahan")
        } finally {
            setLoading(false)
        }
    }

    return { handleCheckout, loading, error, success }
}
