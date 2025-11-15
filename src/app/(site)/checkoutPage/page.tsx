import CheckoutForm from "@/components/CheckoutComponent/CheckoutForm"

import { useCart } from "@/hooks/useCart"
import { useSession } from "next-auth/react"

export default function CheckoutPage() {
    const { items } = useCart()
    const { data: session, status } = useSession();
    if (status === "loading") return <p>Loading...</p>
    if (!session) return <p>Silakan login dulu</p>
    return (
        <section className="container mx-auto py-10">
            <CheckoutForm cartItems={items} userId={session?.user.id} />
        </section>
    )
}
