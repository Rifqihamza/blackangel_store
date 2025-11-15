// src/features/checkout/services/checkoutService.ts
import { CartItemType, AddressType } from "@/types/variable"

interface CheckoutFormData extends Omit<AddressType, "id" | "label" | "isDefault"> {
    paymentMethod: string
}

interface ApiResponse<T = unknown> {
    success: boolean
    message?: string
    data?: T
}

export async function createOrder(formData: CheckoutFormData, cartItems: CartItemType[]): Promise<ApiResponse> {
    try {
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // jika API butuh session/auth
            body: JSON.stringify({ formData, cartItems }),
        })
        return res.json()
    } catch (error) {
        console.error("Checkout error:", error)
        const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan server"
        return { success: false, message: errorMessage }
    }
}
