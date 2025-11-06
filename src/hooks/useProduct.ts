import useSWR from "swr";
import api from "@/lib/axios";

const fetcher = (url: string) => api.get(url).then(r => r.data);

export function useProduct(id?: number) {
    const { data, error, mutate } = useSWR(id ? `/products/${id}` : null, fetcher);
    return {
        product: data?.data ?? null,
        loading: !error && !data,
        error,
        mutate
    };
}
