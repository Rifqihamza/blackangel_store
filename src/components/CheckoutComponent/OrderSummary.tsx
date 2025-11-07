export default function OrderSummary({ cartItems }: { cartItems: any[] }) {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold mb-3">Ringkasan Pesanan</h2>
            {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm mb-2">
                    <span>{item.name} × {item.quantity}</span>
                    <span>Rp {(item.price * item.quantity).toLocaleString("id-ID")}</span>
                </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
            </div>
        </div>
    )
}
