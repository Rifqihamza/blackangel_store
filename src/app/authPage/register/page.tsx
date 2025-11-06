"use client"
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
    const router = useRouter();
    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-white">
            <button onClick={() => router.back()} className="cursor-pointer flex flex-row items-center justify-center absolute top-4 left-4 gap-2 hover:opacity-60">
                <ArrowLeft size={20} />
                Back Home
            </button>
            <div className="w-full max-w-md p-8 space-y-6">


                <h2 className="text-center text-2xl font-bold text-gray-900">
                    Create your account
                </h2>

                <form className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Confirm Password
                        </label>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-start gap-2">
                        <input
                            id="terms"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm text-gray-600"
                        >
                            I accept the{" "}
                            <a href="#" className="text-blue-700 hover:underline">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary hover:bg-blue-700 text-white py-2.5 rounded-md font-medium transition"
                    >
                        Create Account
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <a href="/authPage/login" className="text-blue-700 font-medium hover:underline">
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </section>
    );
}
