"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"

export default function AuthErrorPage() {
    const router = useRouter()
    const params = useSearchParams()
    const error = params.get("error")

    const errorMessage = {
        CredentialsSignin: "Email atau password salah.",
        AccessDenied: "Akses ditolak.",
        Configuration: "Konfigurasi server error.",
        Verification: "Verifikasi gagal atau sudah kadaluarsa.",
        default: "Terjadi kesalahan saat login.",
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md text-center">
                <h1 className="text-2xl font-semibold text-red-600 mb-4">
                    Terjadi Kesalahan
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {errorMessage[error as keyof typeof errorMessage] || errorMessage.default}
                </p>

                <button
                    onClick={() => router.push("/login")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                    Kembali ke Login
                </button>

                <p className="text-sm text-gray-500 mt-4">
                    Atau{" "}
                    <Link href="/" className="text-blue-500 hover:underline">
                        kembali ke beranda
                    </Link>
                </p>
            </div>
        </div>
    )
}
