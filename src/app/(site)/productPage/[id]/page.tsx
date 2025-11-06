"use client"

import Image from "next/image"
import { useProduct } from "@/hooks/useProduct"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
    const { id } = useParams()
    const productId = Number(id)
    const { product, loading, error } = useProduct(productId)

    if (loading) return <p className="text-center py-10">Loading...</p>
    if (error) return <p className="text-center text-red-500">Failed to load</p>
    if (!product) return <p className="text-center py-10">Product not found</p>

    return (
        <section className="container mx-auto px-6 py-10">
            <div className="grid md:grid-cols-2 gap-10">
                <div className="relative w-full h-96 bg-gray-100 rounded-2xl overflow-hidden">
                    {product.image && (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="text-2xl font-semibold text-blue-600 mb-6">
                        Rp {product.price.toLocaleString("id-ID")}
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
                        Add to Cart
                    </button>
                </div>
            </div>
        </section>
    )
}
