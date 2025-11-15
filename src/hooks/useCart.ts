import { useState, useEffect, useCallback } from "react"
import { CartItemType } from "@/types/variable"
import { apiGetCart, apiAddToCart, apiRemoveCartItem, apiUpdateCartItem } from "@/services/cartService"
export function useCart() {
    const [items, setItems] = useState<CartItemType[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const load = useCallback(async () => {
        setLoading(true)
        try {
            const data = await apiGetCart()
            if (data?.success) {
                setItems(data.data ?? [])
            }
        } catch (err) {
            console.error(err)
            setError("Failed to load cart")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        load()
    }, [load])

    const addToCart = async (productId: number, quantity = 1) => {
        setLoading(true)
        try {
            await apiAddToCart(productId, quantity)
            await load()
        } finally {
            setLoading(false)
        }
    }

    const updateItem = async (id: number, quantity: number) => {
        setLoading(true)
        try {
            await apiUpdateCartItem(id, quantity)
            await load()
        } finally {
            setLoading(false)
        }
    }

    const removeItem = async (id: number) => {
        setLoading(true)
        try {
            await apiRemoveCartItem(id)
            await load()
        } finally {
            setLoading(false)
        }
    }

    return { items, loading, error, addToCart, updateItem, removeItem, load }
}
