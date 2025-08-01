import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LabExtraDepartments from '@/components/reusable/public/private/LabExtraDepartments'
import SlideupText from "@/components/reusable/public/SlideupText";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Core Values',
    description: 'Core Values of Fr. Porukara CMI College,Champakulam'
}
export default function page() {
    return <section className="relative">
        <main className="screen z-[1] pt-[100px] min-h-[100vh] ">
            <div className="w-full flex flex-col items-center md:p-2 p-4" >
                <SlideupText text="Core-Values" className="flex font-[900] justify-center text-[35px] text-center w-full mt-[45px]"/>
            <p className="md:px-2 px-4 text-secondary/40 underline">About {'>'} Core Values</p>
            </div>
            <div className="p-3 mt-5 text-[17px] flex gap-3 md:flex-row flex-col">
                <Image className="[object-fit:'cover']" alt="" src={'/assets/bcom1.webp'} objectFit="cover" width={500} height={500} />
                <div className="px-3 py-4 mt-5 bg-white relative">
                    <Image alt="" src={'/assets/bg.webp'} width={100} height={50} className="absolute top-0 right-[20px]" />
                    <p className="p-5 text-secondary border-b border-muted mb-3 font-semibold">About Commerce Department</p>
                    <p className="p-2">Department of Commerce exists from the very beginning of the college (2012). This department is the largest department in the college with over 250 students and still growing. The department not only concentrates on the academic excellence of its students but also nurtures their co-curricular activities.</p>
                    <div className="flex justify-end">
                        <div className="flex flex-col items-end pe-3">
                            <span className="text-secondary flex gap-3 text-[16px]"><Book className="text-secondary" /> Related Courses</span>
                            <div className="flex md:flex-row flex-col gap-3 mt-3">
                                <h3 className="bg-zinc-100 p-3 rounded-sm">B.Com [Computer Application]</h3>
                                <h3 className="bg-zinc-100 p-3 rounded-sm">B.Com [Computer Application]</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
            <LabExtraDepartments />
    </section>

}