import useSWR from "swr"
import api from "@/lib/axios"
import { ProductType } from "@/types/variable"

export function useProducts() {
    const fetcher = (url: string) => api.get(url).then(r => r.data)
    const { data, error } = useSWR<{ data: ProductType[] }>("/products", fetcher)
    return {
        products: data?.data ?? [],
        loading: !error && !data,
        error
    }
}
