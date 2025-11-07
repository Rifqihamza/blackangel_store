"use client"

import { useState } from "react"
import { useCart } from "@/hooks/useCart"
import { useAuth } from "@/hooks/useAuth"
import LoginAlertModal from "@/components/LoginAlertModal/LoginAlertModal"

interface AddToCartButtonProps {
    productId: number
}

export default function ActionBuyButton({ productId }: AddToCartButtonProps) {
    const { addToCart, loading } = useCart()
    const { isAuthenticated } = useAuth()
    const [showLoginModal, setShowLoginModal] = useState(false)

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            setShowLoginModal(true)
            return
        }
        await addToCart(productId)
    }

    const handleBuyNow = async () => {
        if (!isAuthenticated) {
            setShowLoginModal(true)
            return
        }
        await addToCart(productId)
        // Arahkan ke halaman checkout
        window.location.href = "/checkout"
    }

    return (
        <>
            <div className="flex gap-3 w-full">
                <button
                    onClick={handleAddToCart}
                    disabled={loading}
                    className="w-1/2 cursor-pointer border bg-secondary text-white hover:bg-white hover:text-secondary hover:border-secondary transition-colors px-4 py-2 rounded-lg"
                >
                    {loading ? "Menambah..." : "+ Keranjang"}
                </button>

                <button
                    onClick={handleBuyNow}
                    disabled={loading}
                    className="w-1/2 cursor-pointer border border-secondary bg-white text-secondary hover:bg-secondary hover:text-white transition-colors px-4 py-2 rounded-lg"
                >
                    {loading ? "Memproses..." : "Beli Sekarang"}
                </button>
            </div>

            <LoginAlertModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </>
    )
}
