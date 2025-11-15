"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import ActionBuyButton from "@/components/ActionBuyButton/ActionBuyButton"
import { ProductType } from "@/types/variable"
import { useReviews } from "@/hooks/useReviews"

export default function ProductDetailPage() {
    const { id } = useParams()
    const router = useRouter()
    const productId = Number(id)

    const [product, setProduct] = useState<ProductType | null>(null)
    // const [reviews, setReviews] = useState<ReviewType[]>([])
    const { reviews, loading: reviewLoading } = useReviews(productId)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${productId}`)
                const data = await res.json()

                if (data.error) {
                    setError("Produk tidak ditemukan")
                } else {
                    setProduct(data.product) // match API format
                }
            } catch (err) {
                console.error(err)
                setError("Gagal memuat data produk")
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [productId])

    if (loading) return <p className="text-center py-10">Loading...</p>
    if (error) return <p className="text-center text-red-500">{error}</p>
    if (!product) return <p className="text-center py-10">Product not found</p>

    return (
        <main className="container max-w-7xl mx-auto px-6 py-10">
            {/* Back button */}
            <button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 mb-6 hover:opacity-70 transition"
            >
                <ArrowLeft size={20} /> Back Home
            </button>

            {/* === GRID PRODUK === */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* LEFT: GAMBAR PRODUK */}
                <div className="col-span-1">
                    <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden">
                        {product.image && (
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>
                </div>

                {/* MIDDLE: DETAIL PRODUK */}
                <div className="col-span-1">
                    <h1 className="text-2xl font-semibold mb-3">
                        {product.name}
                    </h1>

                    <p className="text-3xl font-bold text-secondary mb-5">
                        Rp {product.price.toLocaleString("id-ID")}
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                        {product.description}
                    </p>

                    <p className="mt-4 text-sm text-gray-500">
                        Stok: <span className="text-gray-800 font-medium">{product.stock}</span>
                    </p>
                </div>

                {/* RIGHT: BELI */}
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
                            <ActionBuyButton productId={product.id} quantity={quantity} />
                        </div>
                    </div>
                </div>
            </div>

            {/* === REVIEW SECTION === */}
            <div className="mt-12 border-t pt-10">
                <h2 className="text-2xl font-semibold mb-6">Ulasan Pembeli</h2>

                {reviewLoading ? (
                    <p className="text-gray-500">Memuat ulasan...</p>
                ) : reviews.length === 0 ? (
                    <p className="text-gray-500">Belum ada ulasan.</p>
                ) : (
                    <div className="space-y-6">
                        {reviews.map((r) => (
                            <div key={r.id} className="border p-5 rounded-lg">
                                <div className="flex justify-between mb-1">
                                    <p className="font-semibold">{r.user?.name || "User"}</p>
                                    <span className="text-sm text-gray-500">
                                        {new Date(r.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-yellow-500">{"⭐".repeat(r.rating)}</p>
                                <p className="text-gray-700 mt-1">{r.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}
