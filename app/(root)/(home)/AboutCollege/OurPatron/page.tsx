import { ArrowRight, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Our Patron',
    description: 'Patron of Fr. Porukara CMI College,Champakulam'
}
export default function Page() {
    return <main>
        <div className="p-4 pt-[60px] md:pt-[170px] ">
            <h3 className="text-[30px] text-black w-full text-center font-bold flex flex-col items-center">
                <span>Our Patron</span>
                <span className="text-[15px] font-medium">About College {'>'} Our Patron</span>
            </h3>
        </div>
        <div className="screen flex md:flex-row flex-col mt-3">
            <div className="flex flex-col items-center md:max-w-[350px] w-full bg-white">
                <Image src={'/assets/thomasporukara.webp'} alt="" width={250} height={250} className="pt-4" />
                <h5 className="text-[23px] pt-3 font-semibold">Fr. Thomas Porukara</h5>
                <h1> (27 December 1799 – 8 January 1846)</h1>
            </div>
            <div className="w-full bg-zinc-50 pt-6 px-6 text-justify text-[15px]">
                Fr. Thomas Porukara, Co-Founder of CMI Congregation and the Patron of Fr. Porukara CMI Group of Institutions, Champakulam was born on 27 December 1799 in Parukara family, Champakulam. He was ordained on 22 September 1823 at the age of 23 and was first appointed to his home parish, Champakulam. His abiding Interest in silence and prayer prompted him to work for the foundation of the first indigenous religious congregation of India, Carmelites of Mary Immaculate (CMI) cooperating with Fr. Thomas Palackal and St. Kuriakose Elias Chavara in the year of 1831. He was called to eternal rest on 8th January 1846 and was buried in Mannanam.
            </div>
        </div>
        <div className="flex bg-zinc-50 justify-end screen p-3 mb-4">
            <Link className="flex justify-center p-2 gap-2 rounded-xl bg-white border-[0.01rem] border-foreground/30 items-center" href={'/AboutCollege/Principal'}>
                <h2 className="font-semibold">Principals&#39;s Message</h2>
                <ChevronRight />
            </Link>
        </div>
    </main>
}