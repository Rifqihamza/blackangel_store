import useSWR from "swr";
import api from "@/lib/axios";

const fetcher = (url: string) => api.get(url).then(r => r.data);

export function useDetailProduct(id?: number) {
    const { data, error, isLoading, mutate } = useSWR(
        id ? `/products/${id}` : null,
        fetcher
    );

    return {
        product: data?.product ?? null, // pastikan sesuai dengan struktur API kamu
        loading: isLoading,
        error: error ? "Gagal memuat data produk" : null,
        mutate
    };
}