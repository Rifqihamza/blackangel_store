'use client';

interface ToastType {
    message: string;
    type: "success" | "error";
}

export default function ToastComponent({ message, type }: ToastType) {
    return (
        <div className="toast toast-end z-50">
            <div className={`alert ${type === "success" ? "alert-success" : "alert-error"}`}>
                <span>{message}</span>
            </div>
        </div>
    )

}