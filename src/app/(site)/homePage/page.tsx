"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
    return (
        <>
            {/* Background Overlay */}
            <span className="absolute inset-0 w-full h-full bg-secondary/20 -z-50"></span>

            {/* Hero Section */}
            <section
                id="homePage"
                className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden px-6 md:px-16"
            >
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 w-full max-w-6xl">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center gap-4 text-center md:text-left max-w-md">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                                Black Angel Store
                            </h1>
                            <p className="text-lg md:text-3xl font-normal">
                                The Incredible Wear
                            </p>
                            <span className="block text-sm md:text-lg font-light text-gray-600">
                                Find Your Perfect Outfit Now!
                            </span>
                        </div>
                        <a
                            href="#product"
                            className="w-fit mx-auto md:mx-0 flex items-center gap-1 group text-secondary mt-2"
                        >
                            See More
                            <ArrowRight
                                size={18}
                                className="group-hover:ml-2 transition-all duration-300"
                            />
                        </a>
                    </div>

                    {/* Right Image */}
                    <div className="flex items-center justify-center">
                        <Image
                            src="/img/hero2.png"
                            alt="Hero Image"
                            width={400}
                            height={400}
                            className="object-contain w-64 sm:w-80 md:w-[400px]"
                            priority
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
