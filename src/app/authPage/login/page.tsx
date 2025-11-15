"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import ToastComponent from "@/components/ToastComponent/Toast"

export default function LoginPage() {
    const router = useRouter()
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

    const [form, setForm] = useState({ email: "", password: "" })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await signIn("credentials", {
            redirect: false,
            email: form.email,
            password: form.password,
        })

        if (res?.error) {
            setToast({ message: "Email atau password salah", type: "error" })
        } else {
            setToast({ message: "Login berhasil!", type: "success" })
            setTimeout(() => router.push("/"), 1200)
        }

        setTimeout(() => setToast(null), 2000)
    }

    return (
        <section className="relative">
            {toast && <ToastComponent message={toast.message} type={toast.type} />}

            <button
                onClick={() => router.replace("/")}
                className="cursor-pointer flex flex-row items-center gap-2 absolute top-4 left-4 hover:opacity-60"
            >
                <ArrowLeft size={20} />
                Back Home
            </button>

            <div className="w-full max-w-6xl h-dvh mx-auto">
                <div className="flex min-h-full flex-col justify-center px-6 py-12">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="mt-2 block w-full rounded-md border px-3 py-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-900">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="mt-2 block w-full rounded-md border px-3 py-2"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-secondary hover:bg-primary text-white py-2 rounded-md"
                            >
                                Sign in
                            </button>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{" "}
                            <a href="/authPage/register" className="text-primary font-semibold">
                                Register Now!
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
