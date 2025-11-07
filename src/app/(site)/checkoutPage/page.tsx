import CheckoutForm from "@/components/CheckoutComponent/CheckoutForm"
import { useCart } from "@/components/CartComponent/CartItemCard"

export default function CheckoutPage() {
    const { items } = useCart()
    return (
        <section className="container mx-auto py-10">
            <CheckoutForm cartItems={items} />
        </section>
    )
}
