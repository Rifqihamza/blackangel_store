"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
    return (
        <>
            <span className="bg-secondary/20 -z-50 absolute inset-0 w-full h-full"></span>
            <section id="homePage" className="relative w-full min-h-dvh overflow-hidden">
                <div className="w-full h-full flex flex-row">
                    <div className="absolute inset-0 flex flex-row justify-between items-center">
                        {/* Title */}
                        <div className="flex flex-col justify-center gap-2 max-w-md">
                            <h1 className="text-5xl font-semibold leading-tight">Black Angel Store</h1>
                            <div>
                                <p className="text-4xl font-normal">The Incredible Wear</p>
                                <span className="text-lg font-thin">Find Your Perfect Outfit Now!</span>
                            </div>
                            <a
                                href="#product"
                                className="w-fit flex flex-row items-center gap-1 group text-secondary"
                            >
                                See More
                                <ArrowRight size={18} className="group-hover:ml-1 duration-300" />
                            </a>
                        </div>

                        {/* Image */}
                        <div className="flex items-center justify-center border">
                            <Image
                                src="/img/hero2.png"
                                alt="Picture Man for Hero"
                                width={400}
                                height={400}
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}