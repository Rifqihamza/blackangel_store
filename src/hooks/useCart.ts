"use client"

import { useEffect, useState, useCallback } from "react"
import {
    apiGetCart,
    apiAddToCart,
    apiUpdateCartItem,
    apiRemoveCartItem,
} from "@/services/cartService"

interface CartItem {
    id: number

}
export function useCart() {
    const [items, setItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const load = useCallback(async () => {
        try {
            setLoading(true)
            const data = await apiGetCart()
            if (data?.success) setItems(data.data)
        } catch (err) {
            console.log(err)
            setError("Failed to load cart")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        load()
    }, [load])

    const addToCart = async (productId: number, quantity = 1) => {
        try {
            setLoading(true)
            await apiAddToCart(productId, quantity)
            await load()
        } catch {
            setError("Failed to add item")
        } finally {
            setLoading(false)
        }
    }

    const updateItem = async (id: number, quantity: number) => {
        try {
            setLoading(true)
            await apiUpdateCartItem(id, quantity)
            await load()
        } finally {
            setLoading(false)
        }
    }

    const removeItem = async (id: number) => {
        try {
            setLoading(true)
            await apiRemoveCartItem(id)
            await load()
        } finally {
            setLoading(false)
        }
    }

    return { items, loading, error, addToCart, updateItem, removeItem, load }
}
