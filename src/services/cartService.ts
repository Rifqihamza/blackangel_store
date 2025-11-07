// src/features/cart/services/cartService.ts
export async function apiGetCart() {
    const res = await fetch("/api/cart", { credentials: "include" })
    return res.json()
}

export async function apiAddToCart(productId: number, quantity = 1) {
    const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
        credentials: "include",
    })
    return res.json()
}

export async function apiUpdateCartItem(cartItemId: number, quantity: number) {
    const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
        credentials: "include",
    })
    return res.json()
}

export async function apiRemoveCartItem(cartItemId: number) {
    const res = await fetch(`/api/cart/${cartItemId}`, {
        method: "DELETE",
        credentials: "include",
    })
    return res.json()
}
