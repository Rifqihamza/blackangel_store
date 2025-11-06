"use client"
import { BellIcon, ShoppingCart } from "lucide-react"
import Image from "next/image"

export default function Navbar() {
    return (
        <section id="navbar">
            <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
                <nav className="flex items-center justify-between px-6 py-4">

                    {/* LEFT - Logo dan Title */}
                    <div className="flex items-center gap-2 w-1/3">
                        <Image
                            src="/img/blackangel_icon.jpg"
                            alt="Icon Black Angel"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <h1 className="font-thin text-3xl uppercase brightness-125 font-[SaloonGirls]">
                            Black Angel
                        </h1>
                    </div>

                    {/* CENTER - Search Bar */}
                    <div className="w-full flex justify-center">
                        <div className="relative w-full max-w-2xl">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="border border-gray-300 rounded-lg w-full px-4 py-1 pl-10 outline-none"
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* RIGHT - Navigation + Icons */}
                    <div className="w-1/3 flex items-center justify-end gap-6">
                        <div className="flex items-center gap-4">
                            <a href="#">
                                <ShoppingCart size={20} />
                            </a>
                            <a href="#">
                                <BellIcon size={20} />
                            </a>
                            <span>|</span>
                        </div>
                        <ul className="flex items-center gap-4 text-lg">
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Product</a></li>
                            <li><a href="#">Contact</a></li>
                            <li><a href="#" className="border border-gray-300 rounded-lg px-2 py-1 hover:bg-black hover:text-white duration-300">Login</a></li>
                            <li><a href="#" className="border border-gray-300 rounded-lg px-2 py-1 hover:bg-black hover:text-white duration-300">Register</a></li>
                        </ul>

                    </div>

                </nav>
            </header>
        </section>
    )
}
