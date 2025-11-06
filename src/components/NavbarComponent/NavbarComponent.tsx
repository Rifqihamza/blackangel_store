'use client'
import { BellIcon, Menu, ShoppingCart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useState } from "react"

export default function NavbarComponent() {
    const [sideNav, setSideNav] = useState(false)

    const closeSideNav = useCallback(() => setSideNav(false), [])
    const openSideNav = useCallback(() => setSideNav(true), [])

    return (
        <section id="navbar">
            <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
                <nav className="flex items-center justify-between px-6 py-4">
                    {/* LEFT - Logo dan Title */}
                    <div className="flex items-center gap-2 md:w-1/3 w-full">
                        <Image
                            src="/img/blackangel_icon.jpg"
                            alt="Icon Black Angel"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <h1 className="font-thin md:text-3xl text-2xl uppercase brightness-125 font-[SaloonGirls]">
                            Black Angel
                        </h1>
                    </div>

                    {/* CENTER - Search Bar */}
                    <div className="w-full flex justify-center items-center gap-4">
                        <div className="relative w-full">
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

                        {/* Mobile Menu Button */}
                        <div>
                            <button
                                className="md:hidden block cursor-pointer"
                                aria-label="Open menu"
                                onClick={openSideNav}
                            >
                                <Menu size={28} />
                            </button>
                        </div>
                    </div>

                    {/* RIGHT - Navigation + Icons (desktop) */}
                    <div className="w-1/3 md:flex items-center justify-end gap-6 hidden">
                        <div className="flex items-center gap-4">
                            <a href="#"><ShoppingCart size={20} /></a>
                            <a href="#"><BellIcon size={20} /></a>
                            <span>|</span>
                        </div>
                        <ul className="flex items-center gap-4 text-lg">
                            <li><a href="#">Home</a></li>
                            <li><a href="#productPage">Product</a></li>
                            <li><a href="#contactPage">Contact</a></li>
                            <li><Link href="/authPage/login" className="border border-gray-300 rounded-lg px-2 py-1 hover:bg-black hover:text-white duration-300">Login</Link></li>
                            <li><Link href="/authPage/register" className="border border-gray-300 rounded-lg px-2 py-1 hover:bg-black hover:text-white duration-300">Register</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            {/* Mobile Side Nav */}
            <>
                {/* Overlay */}
                <div
                    className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${sideNav ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                    onClick={closeSideNav}
                    aria-hidden="true"
                />

                {/* Drawer */}
                <aside
                    className={`fixed top-0 right-0 h-full w-full bg-white z-50 shadow-lg px-6 py-4 overflow-auto transform transition-transform duration-300 ${sideNav ? 'translate-x-0' : '-translate-x-full'}`}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/img/blackangel_icon.jpg"
                                alt="Icon Black Angel"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <h2 className="text-2xl uppercase font-[SaloonGirls]">Black Angel</h2>
                        </div>
                        <button
                            aria-label="Close menu"
                            onClick={closeSideNav}
                            className="p-1"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-4 text-lg">
                        <Link href="#" onClick={closeSideNav} className="block">Home</Link>
                        <Link href="#productPage" onClick={closeSideNav} className="block">Product</Link>
                        <Link href="#contactPage" onClick={closeSideNav} className="block">Contact</Link>

                        <div className="border-t border-gray-200 my-4" />

                        <Link href="/authPage/login" onClick={closeSideNav} className="block border border-gray-300 rounded-lg px-3 py-2 hover:bg-black hover:text-white duration-300">Login</Link>
                        <Link href="/authPage/register" onClick={closeSideNav} className="block border border-gray-300 rounded-lg px-3 py-2 hover:bg-black hover:text-white duration-300">Register</Link>

                        <div className="mt-6 flex items-center gap-4">
                            <a href="#" onClick={closeSideNav}><ShoppingCart size={24} /></a>
                            <a href="#" onClick={closeSideNav}><BellIcon size={24} /></a>
                        </div>
                    </nav>
                </aside>
            </>
        </section>
    )
}