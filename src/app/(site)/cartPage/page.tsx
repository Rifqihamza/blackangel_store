"use client"

import { useCart } from "@/hooks/useCart"

import CartItemCard from "@/components/CartComponent/CartItemCard"
import CartSummary from "@/components/CartComponent/CartSummary"

export default function CartPage() {
    const { items, loading, updateItem, removeItem } = useCart()

    if (loading) return <p className="text-center py-10">Loading...</p>

    return (
        <main className="container max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-2xl font-semibold mb-6">Keranjang Saya</h1>

            {items.length === 0 ? (
                <p className="text-gray-600">Keranjang kamu masih kosong.</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <CartItemCard
                                key={item.id}
                                item={item}
                                onUpdate={updateItem}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>
                    <CartSummary items={items} />
                </>
            )}
        </main>
    )
}
