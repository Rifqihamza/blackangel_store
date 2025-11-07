export default function CartSummary({ items }: { items: any[] }) {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

    return (
        <div className="bg-gray-100 p-4 rounded-xl mt-6">
            <h2 className="font-semibold mb-3">Ringkasan Belanja</h2>
            <div className="flex justify-between text-sm mb-2">
                <span>Total Item</span>
                <span>{items.length}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
                <span>Total Harga</span>
                <span>Rp {total.toLocaleString("id-ID")}</span>
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
