// src/features/cart/services/cartService.ts
import { CartItemType } from "@/types/variable"

interface ApiResponse<T = unknown> {
    success: boolean
    data?: T
    error?: string
}

// Helper aman untuk parse JSON
async function safeJson(res: Response) {
    try {
        return await res.json();
    } catch {
        return { success: false, error: "Invalid JSON response" };
    }
}

// Get Cart
export async function apiGetCart(): Promise<ApiResponse<CartItemType[]>> {
    const res = await fetch("/api/cart", { credentials: "include" });

    if (!res.ok) return safeJson(res);
    return safeJson(res);
}

// Add to Cart
export async function apiAddToCart(productId: number, quantity = 1) {
    const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
        credentials: "include",
    });

    if (!res.ok) return safeJson(res);
    return safeJson(res);
}

// Update Item
export async function apiUpdateCartItem(id: number, quantity: number) {
    const res = await fetch(`/api/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity })
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
        throw new Error("Update failed: " + (data.error || ""))
    }

    return data.data;
}


// Remove Item
export async function apiRemoveCartItem(cartItemId: number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/${cartItemId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!res.ok) return safeJson(res);
    return safeJson(res);
}
