"use client"

import ProductCard from "@/components/ProductComponent/productCard"
import { useProducts } from "@/hooks/useProducts"

export default function ProductPage() {
    const { products, loading, error } = useProducts()

    if (loading) return <p className="text-center py-10">Loading...</p>
    if (error) return <p className="text-center text-red-500">Failed to load</p>

    return (
        <section id="productPage">
            <div className="container mx-auto px-6 py-10 w-full">
                <h1 className="text-2xl font-semibold">Our Products</h1>
                {products.length === 0 ? (
                    <p>No products available.</p>
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
