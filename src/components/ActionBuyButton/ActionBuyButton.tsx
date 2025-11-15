"use client"

import { useState } from "react"
import { useCart } from "@/hooks/useCart"
import { useAuth } from "@/hooks/useAuth"
import LoginAlertModal from "@/components/LoginAlertModal/LoginAlertModal"

interface AddToCartButtonProps {
    productId: number
    quantity?: number
}

export default function ActionBuyButton({ productId, quantity }: AddToCartButtonProps) {
    const { addToCart } = useCart()
    const { isAuthenticated } = useAuth()

    const [showLoginModal, setShowLoginModal] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [isBuying, setIsBuying] = useState(false)

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            setShowLoginModal(true)
            return
        }
        setIsAdding(true)

        await addToCart(productId, quantity)
        setIsAdding(false)
    }

    const handleBuyNow = async () => {
        if (!isAuthenticated) {
            setShowLoginModal(true)
            return
        }

        setIsBuying(true)

        await addToCart(productId, quantity)

        setIsBuying(false)

        window.location.href = "/checkout"
    }

    return (
        <>
            <div className="flex gap-3 w-full">
                {/* ADD TO CART */}
                <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-1/2 cursor-pointer border bg-secondary text-white hover:bg-white hover:text-secondary hover:border-secondary transition-colors px-4 py-2 rounded-lg"
                >
                    {isAdding ? "Menambah..." : "+ Keranjang"}
                </button>

                {/* BUY NOW */}
                <button
                    onClick={handleBuyNow}
                    disabled={isBuying}
                    className="w-1/2 cursor-pointer border border-secondary bg-white text-secondary hover:bg-secondary hover:text-white transition-colors px-4 py-2 rounded-lg"
                >
                    {isBuying ? "Memproses..." : "Beli Sekarang"}
                </button>
            </div>

            <LoginAlertModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
            />
        </>
    )
}
