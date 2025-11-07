"use client"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface LoginAlertModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function LoginAlertModal({ isOpen, onClose }: LoginAlertModalProps) {
    const router = useRouter()

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-50">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-sm text-center"
            >
                <h2 className="text-xl font-semibold mb-3">
                    Kamu belum login!
                </h2>
                <p className="mb-5">
                    Silakan login terlebih dahulu untuk melanjutkan.
                </p>
                <div className="flex justify-center gap-3">
                    <button
                        onClick={() => router.push("/login")}
                        className="cursor-pointer px-4 py-2 bg-primary hover:bg-secondary text-white rounded-lg transition-colors"
                    >
                        Login
                    </button>
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-4 py-2 bg-gray-600 text-white hover:bg-secondary rounded-lg transition-colors"
                    >
                        Batal
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
