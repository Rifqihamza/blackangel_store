import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
    return (
        <section>
            <div className="w-full min-h-dvh flex items-center justify-center relative bg-secondary/20">
                <div className="absolute inset-0 flex flex-row items-stretch gap-10 justify-around w-full mx-auto overflow-hidden">
                    {/* Title */}
                    <div className="flex flex-col justify-center gap-2">
                        <h1 className="text-5xl font-semibold">Black Angel Store</h1>
                        <div>
                            <p className="text-4xl font-normal">The Incredible Wear</p>
                            <span className="text-lg font-thin">Find Your Perfect Outfit Now!</span>
                        </div>
                        <a href="#product" className="w-fit flex flex-row items-center gap-1">
                            See More
                            <ArrowRight size={18} />
                        </a>
                    </div>
                    {/* Image */}
                    <div className="flex">
                        <Image src="/img/hero.png" alt="Picture Man for Hero" width={400} height={400} className=" object-contain" />
                    </div>
                </div>
            </div>
        </section>
    )
}