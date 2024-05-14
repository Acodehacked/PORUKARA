import { ArrowRight, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
    title: 'Faculty ',
    description: 'Faculty of Fr. Porukara CMI College,Champakulam'
}
export default function Page() {
    return <main>
        <div className="bg-foreground h-[350px]">
        </div>
        <div className="mt-[-150px] px-5 flex items-center">
            <h3 className="text-[30px] text-white w-full nd:mt-0  items-center text-center font-bold flex flex-col min-h-[200px]">
                <span>Our Faculty</span>
                <span className="text-[15px] font-light">Porukara college {'>'} Faculty</span>
            </h3>
        </div>
        <div className="screen flex md:flex-row flex-col mt-3">
            <div className="w-full bg-zinc-50 pt-6 px-6  text-[18px]">
                <h3>Faculties Page Coming Soon!</h3>
            </div>
            <div className="flex flex-col items-center md:max-w-[350px] w-full bg-white">
                <h5 className="text-[23px] pt-3 font-semibold px-2 text-center">Related Contents</h5>
                <Link href={'/Latest-Events'} className="pt-4 justify-between bg-black/10 mt-3 pb-4 px-5 text-[15px] flex w-full">
                    Latest Events <ChevronRight />
                </Link>
                <Link href={'/Announcements'} className="pt-4 justify-between bg-black/10 mt-3 pb-4 px-5 text-[15px] flex w-full">
                    Announcements <ChevronRight />
                </Link>
            </div>
        </div>
        
    </main>
}