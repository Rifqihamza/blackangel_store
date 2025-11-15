"use client"
import { useState } from "react"
import { useCheckout } from "@/hooks/useCheckout"
import PaymentMethod from "@/components/CheckoutComponent/PaymentMethod"
import OrderSummary from "./OrderSummary"
import { CartItemType, AddressType } from "@/types/variable"

interface Props {
    cartItems: CartItemType[]
    userId: number
}

export default function CheckoutForm({ cartItems, userId }: Props) {
    const { handleCheckout, loading, error, success } = useCheckout()
    const [form, setForm] = useState<Omit<AddressType, "id" | "label" | "isDefault"> & { paymentMethod: string; userId: number }>({
        recipient: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        paymentMethod: "COD",
        userId, // tambahkan userId di sini
    })


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleCheckout(form, cartItems)
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ADDRESS FORM */}
            <div className="space-y-3">
                <h2 className="text-lg font-semibold">Alamat Pengiriman</h2>
                {["recipient", "phone", "address", "city", "province", "postalCode"].map((key) => (
                    <input
                        key={key}
                        type="text"
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full border rounded-lg p-2"
                        required
                    />
                ))}
            </div>

            {/* ORDER SUMMARY */}
            <div>
                <OrderSummary cartItems={cartItems} />
                <PaymentMethod
                    selected={form.paymentMethod}
                    onChange={(val) => setForm({ ...form, paymentMethod: val })}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full bg-black text-white rounded-lg py-2"
                >
                    {loading ? "Memproses..." : "Buat Pesanan"}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">Pesanan berhasil dibuat!</p>}
            </div>
        </form>
    )
}
