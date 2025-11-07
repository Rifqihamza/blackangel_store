"use client"

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
    const router = useRouter()
    return (
        <section>
            <button onClick={() => router.replace("/")} className="cursor-pointer flex flex-row items-center justify-center absolute top-4 left-4 gap-2 hover:opacity-60">
                <ArrowLeft size={20} />
                Back Home
            </button>
            <div className="w-full max-w-6xl h-dvh mx-auto">
                <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="#" method="POST" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input id="email" type="email" name="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Password</label>
                                    <div className="text-sm">
                                        <a href="/authPage/forgot" className="font-semibold text-primary hover:text-indigo-500">Forgot password?</a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input id="password" type="password" name="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="flex w-full justify-center rounded-md bg-secondary hover:bg-primary duration-300 cursor-pointer px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs">Sign in</button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm/6 text-gray-500 flex items-center justify-center gap-2">
                            Not a member?
                            <a href="/authPage/register" className="font-semibold text-primary hover:text-indigo-500">Register Now!</a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}