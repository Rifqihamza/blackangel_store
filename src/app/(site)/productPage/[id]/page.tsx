"use client"

import Image from "next/image"
import { useProduct } from "@/hooks/useProduct"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import ActionBuyButton from "@/components/ActionBuyButton/ActionBuyButton"
// Contoh data dummy ulasan
interface Review {
    id: number
    user: string
    rating: number
    comment: string
    date: string
}

export default function ProductDetailPage() {
    const { id } = useParams()
    const productId = Number(id)
    const { product, loading, error } = useProduct(productId)
    const [quantity, setQuantity] = useState(1)
    const [reviews, setReviews] = useState<Review[]>([])
    const router = useRouter();

    // Simulasi fetch ulasan (nanti bisa diganti pakai API asli)
    useEffect(() => {
        const mockReviews: Review[] = [
            {
                id: 1,
                user: "Reza Rahadian",
                rating: 5,
                comment: "Kualitas bagus, pengiriman cepat banget. Recommended seller!",
                date: "2025-11-01",
            },
            {
                id: 2,
                user: "Dimas Mentai",
                rating: 4,
                comment: "Barang sesuai deskripsi, cuma packing agak kurang rapi.",
                date: "2025-11-02",
            },
        ]
        // schedule update asynchronously to avoid synchronous state update inside effect
        const timer = setTimeout(() => setReviews(mockReviews), 0)
        return () => clearTimeout(timer)
    }, [productId])

    if (loading) return <p className="text-center py-10">Loading...</p>
    if (error) return <p className="text-center text-red-500">Failed to load</p>
    if (!product) return <p className="text-center py-10">Product not found</p>

    return (
        <main className="w-full mt-6">
            {/* === DETAIL PRODUK === */}

            <section className="relative container w-full max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
                {/* Back Home */}
                <button onClick={() => router.replace("/")} className="cursor-pointer flex flex-row items-center justify-center absolute top-0 left-4 gap-2 hover:opacity-60">
                    <ArrowLeft size={20} />
                    Back Home
                </button>
                {/* LEFT: Product Images */}
                <div className="col-span-1">
                    <div className="relative w-full h-[400px] bg-gray-100 rounded-xl overflow-hidden">
                        {product.image && (
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-3 mt-4">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 cursor-pointer border border-gray-200 hover:border-secondary transition"
                            >
                                {product.image && (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        width={80}
                                        height={80}
                                        className="object-cover"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* MIDDLE: Product Info */}
                <div className="col-span-1">
                    <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
                    <p className="text-gray-600 mb-3">⭐ 4.8 | Terjual 10+</p>
                    <div className="text-3xl font-bold text-secondary mb-6">
                        Rp {product.price.toLocaleString("id-ID")}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Detail Produk</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="mt-4 text-sm text-gray-500">
                            <p>Stok: <span className="text-gray-800 font-medium">{product.stock ?? 10}</span></p>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Add to Cart Section */}
                <div className="col-span-1">
                    <div className="border border-gray-200 rounded-xl shadow-sm p-6 sticky top-24">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Atur Jumlah dan Catatan</h2>
                        <div className="flex items-center gap-4 mb-4">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                            >
                                -
                            </button>
                            <span className="text-lg font-semibold">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                            >
                                +
                            </button>
                            <p className="text-sm text-gray-500">Sisa {product.stock ?? 5}</p>
                        </div>

                        <div className="flex justify-between text-lg font-semibold mb-6">
                            <span>Subtotal</span>
                            <span>Rp {(product.price * quantity).toLocaleString("id-ID")}</span>
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <ActionBuyButton productId={product.id} />
                            <ActionBuyButton productId={product.id} />
                        </div>
                    </div>
                </div>
            </section>

            {/* === REVIEWS SECTION === */}
            <div className="container max-w-7xl mx-auto px-6 py-10 border-t border-gray-200">
                <h2 className="text-2xl font-semibold mb-6">Ulasan Pembeli</h2>

                {reviews.length === 0 ? (
                    <p className="text-gray-500">Belum ada ulasan untuk produk ini.</p>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <div
                                key={review.id}
                                className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-semibold text-gray-800">{review.user}</p>
                                    <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                                    {"⭐".repeat(review.rating)}
                                    {"☆".repeat(5 - review.rating)}
                                </div>
                                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
