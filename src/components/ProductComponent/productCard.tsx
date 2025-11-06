"use client"

import Image from "next/image"
import Link from "next/link"
import { ProductType } from "@/types/variable"

interface ProductTypeProps {
    product: ProductType;
}

export default function ProductCard({ product }: ProductTypeProps) {
    return (
        <article className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4">
            <Link href={`/products/${product.id}`}>
                <div className="relative w-full h-56 overflow-hidden rounded-xl bg-gray-100">
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-105 transition"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                            No Image
                        </div>
                    )}
                </div>
            </Link>

            <div className="mt-3">
                <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg line-clamp-1 hover:text-blue-600">
                        {product.name}
                    </h3>
                </Link>
                {product.category && (
                    <p className="text-xs text-gray-500">{product.category.name}</p>
                )}
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {product.description}
                </p>
                <div className="mt-3 font-semibold text-blue-600">
                    Rp {product.price.toLocaleString("id-ID")}
                </div>
            </div>
        </article>
    )
}
