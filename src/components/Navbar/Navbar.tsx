"use client"

import { useCallback, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import AvatarDaisy from "../Avatar/ProfileAvatar"
import NotificationButton from "../Button/NotificationButton"
import Link from "next/link"
import Image from "next/image"
import {
    House,
    Menu,
    Shirt,
    ShoppingCart,
    X,
    Phone,
    User,
    Settings,
    LogOut
} from "lucide-react"

export default function NavbarComponent() {
    const { data: session } = useSession()
    const pathname = usePathname()
    const router = useRouter()
    const [sideNav, setSideNav] = useState(false)

    const closeSideNav = useCallback(() => setSideNav(false), [])
    const openSideNav = useCallback(() => setSideNav(true), [])

    const handleScroll = (id: string) => {
        const offset = 90

        if (pathname === "/") {
            const section = document.querySelector(id)
            if (section) {
                const y = section.getBoundingClientRect().top + window.scrollY - offset
                window.scrollTo({ top: y, behavior: "smooth" })
            }
        } else {
            router.push(`/${id}`)
        }
        closeSideNav()
    }

    return (
        <section id="navbar" className="sticky top-0 left-0 w-full bg-white shadow z-50">
            <nav className="flex items-center justify-between px-6 py-4">
                {/* LEFT */}
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

                {/* CENTER */}
                <div className="w-full flex justify-center items-center gap-4">
                    {/* Mobile Menu Button */}
                    <button className="md:hidden block cursor-pointer" onClick={openSideNav}>
                        <Menu size={28} />
                    </button>
                </div>


                {/* RIGHT - Desktop */}
                <div className="w-1/3 md:flex items-center justify-end gap-6 hidden md:pl-4">
                    {session ? (
                        <div className="flex items-center">
                            <Link href="/cartPage" className="btn btn-ghost btn-circle relative">
                                <ShoppingCart size={20} />
                            </Link>
                            <Link href="/settingPage">
                                <NotificationButton />
                            </Link>
                            <span className="ml-2">|</span>
                        </div>
                    ) : (
                        <div></div>
                    )}


                    <ul className="flex items-center gap-4 text-lg">
                        <li><button className="cursor-pointer group relative" onClick={() => handleScroll("#homePage")}>
                            Home
                            <span className="w-0 absolute bottom-0 left-0 h-0.5 group-hover:w-full bg-secondary duration-300"></span>
                        </button>
                        </li>
                        <li><button className="cursor-pointer group relative" onClick={() => handleScroll("#productPage")}>
                            Product
                            <span className="w-0 absolute bottom-0 left-0 h-0.5 group-hover:w-full bg-secondary duration-300"></span>
                        </button>
                        </li>
                        <li><button className="cursor-pointer group relative" onClick={() => handleScroll("#contactPage")}>
                            Contact
                            <span className="w-0 absolute bottom-0 left-0 h-0.5 group-hover:w-full bg-secondary duration-300"></span>
                        </button>
                        </li>

                        {session ? (
                            <li className="relative group cursor-pointer">
                                {/* Avatar DaisyUI */}
                                <AvatarDaisy />

                                {/* Dropdown */}
                                <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-300">
                                    <Link href="/profile" className="px-3 py-2 hover:bg-gray-100 rounded flex flex-row items-center gap-1">
                                        <User size={18} />
                                        Profile
                                    </Link>
                                    <Link href="/profile" className="px-3 py-2 hover:bg-gray-100 rounded flex flex-row items-center gap-1">
                                        <Settings size={18} />
                                        Setting
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full text-red-600 px-3 py-2 hover:bg-gray-100 rounded flex flex-row items-center gap-1"
                                    >
                                        <LogOut size={18} />
                                        Logout
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link href="/authPage/login" className="border border-gray-300 rounded-lg px-2 py-1 hover:bg-black hover:text-white duration-300">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/authPage/register" className="border border-gray-300 rounded-lg px-2 py-1 hover:bg-black hover:text-white duration-300">
                                        Register
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>


            {/* Mobile Side Nav */}
            <>
                <div
                    className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${sideNav ? "opacity-100 visible" : "opacity-0 invisible"}`}
                    onClick={closeSideNav}
                />
                <aside
                    className={`fixed top-0 right-0 h-full w-full bg-white z-50 shadow-lg px-6 py-4 overflow-auto transform transition-transform duration-300 ${sideNav ? "translate-x-0" : "-translate-x-full"}`}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Image src="/img/blackangel_icon.jpg" alt="Icon Black Angel" width={40} height={40} className="rounded-full" />
                            <h2 className="text-2xl uppercase font-[SaloonGirls]">Black Angel</h2>
                        </div>
                        <button onClick={closeSideNav} className="p-1">
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-4 text-lg">
                        <button onClick={() => handleScroll("#homePage")} className="text-left text-2xl flex items-center gap-2">
                            <House size={24} /> Home
                        </button>
                        <button onClick={() => handleScroll("#productPage")} className="text-left text-2xl flex items-center gap-2">
                            <Shirt size={24} /> Product
                        </button>
                        <button onClick={() => handleScroll("#contactPage")} className="text-left text-2xl flex items-center gap-2">
                            <Phone /> Contact
                        </button>

                        <div className="mt-6 flex items-center gap-2">
                            <Link href="/cartPage" className="btn btn-ghost btn-circle relative">
                                <ShoppingCart size={20} />
                            </Link>
                            <NotificationButton />
                        </div>

                        <div className="border-t border-gray-200 my-4" />

                        {session ? (
                            <div className="mt-4">
                                <div className="flex items-center gap-3">
                                    <AvatarDaisy />

                                    <div>
                                        <p className="font-semibold">{session.user?.name}</p>
                                        <p className="text-sm text-gray-500">{session.user?.email}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { signOut(); closeSideNav(); }}
                                    className="mt-3 w-full border border-gray-300 rounded-lg px-3 py-2 text-center hover:bg-black hover:text-white duration-300"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-row items-center justify-between gap-4">
                                <Link href="/authPage/login" className="block border w-full text-center border-gray-300 rounded-lg px-3 py-2 hover:bg-black hover:text-white duration-300">
                                    Login
                                </Link>
                                <Link href="/authPage/register" className="block border w-full text-center border-gray-300 rounded-lg px-3 py-2 hover:bg-black hover:text-white duration-300">
                                    Register
                                </Link>
                            </div>
                        )}
                    </nav>
                </aside>
            </>
        </section>
    )
}
