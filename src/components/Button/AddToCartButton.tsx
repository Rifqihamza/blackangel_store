"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/hooks/useCart"
import { useAuth } from "@/hooks/useAuth"
import ToastComponent from "@/components/Toast/Toast"
import AlertModal from "@/components/Modal/AlertModal"

interface AddToCartButtonProps {
    productId: number
    quantity?: number
}

export default function AddToCartButton({ productId, quantity }: AddToCartButtonProps) {
    const { addToCart } = useCart()
    const { isAuthenticated } = useAuth()

    const [showAlertModal, setShowAlertModal] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastType, setToastType] = useState<"success" | "error">("success")


    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            setShowAlertModal(true)
            return
        }

        setIsAdding(true)


        try {
            await addToCart(productId, quantity)
            setToastType("success")
            setToastMessage("Produk berhasil ditambahkan ke keranjang!")
        } catch (error) {
            console.error("Error adding to cart:", error)
            setToastType("error")
            setToastMessage("Gagal menambahkan produk ke keranjang.")
        } finally {
            setIsAdding(false)
        }
    }

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(""), 3000)
            return () => clearTimeout(timer)
        }
    }, [toastMessage])
    return (
        <>
            <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-1/2 cursor-pointer border bg-secondary text-white hover:bg-white hover:text-secondary hover:border-secondary transition-colors px-4 py-2 rounded-lg"
            >
                {isAdding ? "Menambah..." : "+ Keranjang"}
            </button>

            {toastMessage && (
                <ToastComponent message={toastMessage} type={toastType} />
            )}

            <AlertModal
                isOpen={showAlertModal}
                onClose={() => setShowAlertModal(false)}
                title="Akses Dibatasi"
                message="Kamu perlu login untuk menambahkan produk ke keranjang."
                pathToGo="/authPage/login"
            />
        </>
    )
}