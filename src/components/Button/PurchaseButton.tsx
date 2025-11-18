"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/hooks/useCart"
import { useAuth } from "@/hooks/useAuth"
import ToastComponent from "@/components/Toast/Toast"
import AlertModal from "../Modal/AlertModal"

interface BuyNowButtonProps {
    productId: number
    quantity?: number
}

export default function PurchaseButton({ productId, quantity }: BuyNowButtonProps) {
    const { addToCart } = useCart()
    const { isAuthenticated } = useAuth()

    const [showAlertModal, setShowAlertModal] = useState(false)
    const [isBuying, setIsBuying] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastType, setToastType] = useState<"success" | "error">("success")

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(""), 3000)
            return () => clearTimeout(timer)
        }
    }, [toastMessage])

    const handleBuyNow = async () => {
        if (!isAuthenticated) {
            setShowAlertModal(true)
            return
        }

        setIsBuying(true)

        try {
            await addToCart(productId, quantity)
            setToastType("success")
            setToastMessage("Produk ditambahkan, menuju checkout...")
            setTimeout(() => {
                window.location.href = "/checkout"
            }, 1000)
        } catch (error) {
            console.error("Error buying product:", error)
            setToastType("error")
            setToastMessage("Gagal memproses pembelian.")
        } finally {
            setIsBuying(false)
        }
    }

    return (
        <>
            <button
                onClick={handleBuyNow}
                disabled={isBuying}
                className="w-1/2 cursor-pointer border border-secondary bg-white text-secondary hover:bg-secondary hover:text-white transition-colors px-4 py-2 rounded-lg"
            >
                {isBuying ? "Memproses..." : "Beli Sekarang"}
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