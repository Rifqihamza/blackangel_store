"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
    const router = useRouter();
    return (
        <section className="min-h-screen flex items-center justify-center px-6 py-8">
            {/* Back Home */}
            <button onClick={() => router.replace("/")} className="cursor-pointer flex flex-row items-center justify-center absolute top-4 left-4 gap-2 hover:opacity-60">
                <ArrowLeft size={20} />
                Back Home
            </button>
            <div className="w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Reset Your Password
                </h2>
                <form className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            className="w-full border border-secondary outline-none rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            className="w-full border border-secondary outline-none rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block mb-2 text-sm font-medium"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="••••••••"
                            className="w-full border border-secondary outline-none rounded-lg px-3 py-2"
                            required
                        />
                    </div>

                    <div className="flex items-start">
                        <input
                            id="terms"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-secondary text-secondary dark:bg-gray-700 dark:border-gray-600"
                            required
                        />
                        <label
                            htmlFor="terms"
                            className="ml-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                            I accept the{" "}
                            <a href="#" className="text-secondary hover:underline">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-secondary text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition"
                    >
                        Reset Password
                    </button>

                    <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-3">
                        Remember your password?{" "}
                        <Link href="/authPage/login" className="text-secondary hover:underline">
                            Back to Login
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    )
}
