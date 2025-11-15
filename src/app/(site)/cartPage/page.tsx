"use client"

import { useCart } from "@/hooks/useCart"
import CartItemCard from "@/components/CartComponent/CartItemCard"
import CartSummary from "@/components/CartComponent/CartSummary"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CartPage() {
    const router = useRouter()
    const { items, loading, updateItem, removeItem } = useCart()

    if (loading)
        return (
            <p className="text-center w-full h-screen flex items-center justify-center">
                Loading...
            </p>
        )

    return (
        <main className="relative w-full max-w-7xl h-screen mx-auto px-6 py-6">
            {/* Back button */}
            <div className="mb-6">
                <button
                    onClick={() => router.replace("/")}
                    className="flex flex-row items-center gap-2 hover:opacity-60"
                >
                    <ArrowLeft size={20} />
                    Back Home
                </button>
            </div>

            <h1 className="text-2xl font-semibold mb-6">Keranjang Saya</h1>

            {items.length === 0 ? (
                <p className="text-gray-600 flex items-center justify-center h-64">
                    Keranjang kamu masih kosong.
                </p>
            ) : (
                <div className="flex flex-col h-[calc(100vh-150px)]">
                    <div className="flex-1 overflow-y-auto space-y-4">
                        {items.map((item) => (
                            <CartItemCard
                                key={item.id}
                                item={item}
                                onUpdate={updateItem}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>
                    <div className="mt-4">
                        <CartSummary cartItems={items} />
                    </div>
                </div>
            )}
        </main>
    )
}
