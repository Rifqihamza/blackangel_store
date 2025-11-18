"use client"

interface ConfirmationModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    title?: string
    message?: string
    confirmText?: string
    cancelText?: string
}

export default function ConfirmationModal({
    open,
    onClose,
    onConfirm,
    title = "Hapus Item?",
    message = "Apakah Anda yakin ingin menghapus item ini dari keranjang?",
    confirmText = "Hapus",
    cancelText = "Batal"
}: ConfirmationModalProps) {
    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 bg-opacity-40">
            <div className="bg-white rounded-lg p-6 shadow-lg min-w-[300px]">
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="py-4">{message}</p>
                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="btn">
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm()
                            onClose()
                        }}
                        className="btn btn-error text-white"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}