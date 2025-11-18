"use client"
import Image from "next/image"
import { CartItemType } from "@/types/variable"
import { Trash } from "lucide-react"
import { useState } from "react"
import ConfirmationModal from "../Modal/ConfirmationModal"

interface CardProps {
    item: CartItemType
    onUpdate: (id: number, quantity: number) => void
    onRemove: (id: number) => void
}

export default function CartItemCard({ item, onUpdate, onRemove }: CardProps) {
    const [modalOpen, setModalOpen] = useState(false)

    return (
        <div className="flex items-center justify-between border-b py-4">
            <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                    {item.product?.image && (
                        <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
                <div>
                    <h3 className="font-semibold">{item.product?.name}</h3>
                    <p className="text-gray-600 text-sm">
                        Rp {item.product?.price?.toLocaleString("id-ID")}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => onUpdate(item.id, Math.max(1, item.quantity - 1))}
                    className="px-2 py-1 text-lg cursor-pointer"
                >
                    -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                    onClick={() => onUpdate(item.id, item.quantity + 1)}
                    className="px-2 py-1 text-lg cursor-pointer"
                >
                    +
                </button>

                <button
                    onClick={() => setModalOpen(true)}
                    className="text-red-500 hover:text-red-700 ml-4 cursor-pointer"
                >
                    <Trash size={22} />
                </button>

                <ConfirmationModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={() => onRemove(item.id)}
                    title="Remove from cart?"
                    message="Do you really want to remove this item from your cart?"
                    confirmText="Yes, remove it"
                    cancelText="No, keep it"
                />
            </div>
        </div>
    )
}
