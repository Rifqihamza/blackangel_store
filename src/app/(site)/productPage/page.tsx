"use client"

import ProductCard from "@/components/ProductComponent/ProductCard"
import { useProducts } from "@/hooks/useProducts"

export default function ProductPage() {
    const { products, loading, error } = useProducts()

    return (
        <section id="productPage">
            <div className="container mx-auto px-6 py-10 w-full">
                <h1 className="text-2xl font-semibold mb-6">Our Products</h1>

                {/* Error State */}
                {error && (
                    <p className="text-center text-red-500">Failed to load products.</p>
                )}

                {/* Loading State → tampilkan skeleton */}
                {loading ? (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductCard key={i} isLoading />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <p className="text-center text-gray-500">No products available.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
