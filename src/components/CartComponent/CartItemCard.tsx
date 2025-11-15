"use client"
import Image from "next/image"
import { CartItemType } from "@/types/variable"
import { Trash } from "lucide-react"
import { useState } from "react"

interface Props {
    item: CartItemType
    onUpdate: (id: number, quantity: number) => void
    onRemove: (id: number) => void
}

interface DeleteModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

function DeleteConfirmationModal({ open, onClose, onConfirm }: DeleteModalProps) {
    if (!open) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 bg-opacity-40">
            <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
                <h3 className="font-bold text-lg">Hapus Item?</h3>
                <p className="py-4">Apakah Anda yakin ingin menghapus item ini dari keranjang?</p>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="btn">
                        Batal
                    </button>
                    <button
                        onClick={() => {
                            onConfirm()
                            onClose()
                        }}
                        className="btn btn-error text-white"
                    >
                        Hapus
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function CartItemCard({ item, onUpdate, onRemove }: Props) {
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

                <DeleteConfirmationModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={() => onRemove(item.id)}
                />

                <button
                    onClick={() => setModalOpen(true)}
                    className="text-red-500 hover:text-red-700 ml-4 cursor-pointer"
                >
                    <Trash size={22} />
                </button>
            </div>
        </div>
    )
}
