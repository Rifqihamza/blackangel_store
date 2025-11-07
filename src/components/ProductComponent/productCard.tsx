"use client"

import Image from "next/image"
import Link from "next/link"
import { ProductType } from "@/types/variable"

interface ProductTypeProps {
    product?: ProductType
    isLoading?: boolean
}

export default function ProductCard({ product, isLoading }: ProductTypeProps) {
    if (isLoading || !product) {
        return (
            <div className="bg-white rounded-2xl shadow p-4 space-y-3 animate-pulse">
                <div className="w-full h-56 rounded-xl bg-base-300 skeleton"></div>
                <div className="h-5 w-3/4 rounded bg-base-300 skeleton"></div>
                <div className="h-3 w-1/2 rounded bg-base-300 skeleton"></div>
                <div className="h-3 w-full rounded bg-base-300 skeleton"></div>
                <div className="h-4 w-1/3 rounded bg-base-300 skeleton"></div>
            </div>
        )
    }

    return (
        <Link
            href={`/productPage/${product.id}`}
            className="bg-white rounded-2xl shadow group hover:shadow-lg transition p-4"
        >
            {/* Gambar Produk */}
            <div className="relative w-full h-56 overflow-hidden rounded-xl bg-gray-100">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                        No Image
                    </div>
                )}
            </div>

            {/* Info Produk */}
            <div className="mt-3">
                <h3 className="font-semibold text-lg line-clamp-1">
                    {product.name}
                </h3>
                {product.category && (
                    <p className="text-xs text-gray-500">{product.category.name}</p>
                )}
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {product.description}
                </p>
                <div className="mt-3 font-semibold">
                    Rp {product.price.toLocaleString("id-ID")}
                </div>
            </div>
        </Link>
    )
}
