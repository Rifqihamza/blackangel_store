"use client"
import { useState } from "react"
import { useCheckout } from "../../hooks/useCheckout"
import PaymentMethod from "../../features/checkout/components/PaymentMethod"
import OrderSummary from "./OrderSummary"

export default function CheckoutForm({ cartItems }: { cartItems: any[] }) {
    const { handleCheckout, loading, error, success } = useCheckout()
    const [form, setForm] = useState({
        userId: 1, // nanti ambil dari session
        address: "",
        city: "",
        province: "",
        postalCode: "",
        recipient: "",
        phone: "",
        paymentMethod: "COD",
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
                <input
                    type="text"
                    placeholder="Nama Penerima"
                    value={form.recipient}
                    onChange={(e) => setForm({ ...form, recipient: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    required
                />
                <input
                    type="text"
                    placeholder="No. Telepon"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    required
                />
                <input
                    type="text"
                    placeholder="Alamat Lengkap"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full border rounded-lg p-2"
                    required
                />
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Kota"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="flex-1 border rounded-lg p-2"
                    />
                    <input
                        type="text"
                        placeholder="Provinsi"
                        value={form.province}
                        onChange={(e) => setForm({ ...form, province: e.target.value })}
                        className="flex-1 border rounded-lg p-2"
                    />
                </div>
                <input
                    type="text"
                    placeholder="Kode Pos"
                    value={form.postalCode}
                    onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                    className="w-full border rounded-lg p-2"
                />
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
