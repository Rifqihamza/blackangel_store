import { CartItemType } from "@/types/variable"

interface Props {
    cartItems: CartItemType[]
}

export default function CartSummary({ cartItems }: { cartItems: Props["cartItems"] }) {
    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity ?? 0), 0)
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.product?.price ?? 0) * (item.quantity ?? 0), 0)

    return (
        <div className="bg-gray-100 p-4 rounded-xl mt-6 ">
            <h2 className="font-semibold mb-3">Ringkasan Belanja</h2>
            <div className="flex justify-between text-sm mb-2">
                <span>Total Item</span>
                <span>{totalItems}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
                <span>Total Harga</span>
                <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>
            <a
                href="/(site)/checkout"
                className="mt-4 block text-center bg-black text-white py-2 rounded-lg font-semibold hover:opacity-90"
            >
                Checkout Sekarang
            </a>
        </div>
    )
}
