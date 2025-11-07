export async function createOrder(formData: any, cartItems: any[]) {
    try {
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ formData, cartItems }),
        })
        return await res.json()
    } catch (error) {
        console.error("Checkout error:", error)
        return { success: false, message: "Terjadi kesalahan server" }
    }
}
