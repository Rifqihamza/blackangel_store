"use client"

import Image from "next/image"

export default function CartItemCard({ item, onUpdate, onRemove }: any) {
    return (
        <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    {item.product.image && (
                        <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
                <div>
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm">
                        Rp {item.product.price.toLocaleString("id-ID")}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => onUpdate(item.id, Math.max(1, item.quantity - 1))}
                    className="px-3 py-1 border rounded-lg"
                >
                    -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                    onClick={() => onUpdate(item.id, item.quantity + 1)}
                    className="px-3 py-1 border rounded-lg"
                >
                    +
                </button>

                <button
                    onClick={() => onRemove(item.id)}
                    className="text-red-500 hover:underline ml-4"
                >
                    Hapus
                </button>
            </div>
        </div>
    )
}
