export default function PaymentMethod({
    selected,
    onChange,
}: {
    selected: string
    onChange: (val: string) => void
}) {
    return (
        <div className="mt-4 space-y-2">
            <h2 className="font-semibold">Metode Pembayaran</h2>
            {["COD", "Transfer Bank", "E-Wallet"].map((method) => (
                <label key={method} className="flex items-center gap-2">
                    <input
                        type="radio"
                        checked={selected === method}
                        onChange={() => onChange(method)}
                    />
                    {method}
                </label>
            ))}
        </div>
    )
}
