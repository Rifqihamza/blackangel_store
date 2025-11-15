"use client"

import { useEffect, useState } from "react"
import { ReviewType } from "@/types/variable"

export function useReviews(productId: number) {
    const [reviews, setReviews] = useState<ReviewType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`/api/reviews/${productId}`)
                const data = await res.json()

                if (!data.success) {
                    setError("Gagal memuat review")
                } else {
                    setReviews(data.data || [])
                }
            } catch (e) {
                console.error(e)
                setError("Terjadi kesalahan saat mengambil review")
            } finally {
                setLoading(false)
            }
        }

        fetchReviews()
    }, [productId])

    return { reviews, loading, error }
}
