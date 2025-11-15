"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useRegister } from "@/hooks/useRegister"
import ToastComponent from "@/components/ToastComponent/Toast"

export default function RegisterPage() {
    const router = useRouter()
    const { register, loading, error } = useRegister()
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await register(form)

        if (res?.success) {
            setToast({ message: "Akun berhasil dibuat!", type: "success" })
            setTimeout(() => router.push("/authPage/login"), 1500)
        } else {
            setToast({ message: res?.message || "Pendaftaran gagal", type: "error" })
        }

        setTimeout(() => setToast(null), 2500)
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-white relative">
            {toast && <ToastComponent message={toast.message} type={toast.type} />}

            <button
                onClick={() => router.replace("/")}
                className="cursor-pointer flex items-center gap-2 absolute top-4 left-4 hover:opacity-60"
            >
                <ArrowLeft size={20} />
                Back Home
            </button>

            <div className="w-full max-w-md p-8 space-y-6">
                <h2 className="text-center text-2xl font-bold text-gray-900">Create your account</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                    />

                    <div className="flex items-start gap-2">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={form.terms}
                            onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                            className="w-4 h-4 border border-gray-300"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-600">
                            I accept the{" "}
                            <a className="text-blue-700 hover:underline">Terms and Conditions</a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-secondary hover:bg-primary text-white py-2.5 rounded-md"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/authPage/login" className="text-blue-700 hover:underline">
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </section>
    )
}
