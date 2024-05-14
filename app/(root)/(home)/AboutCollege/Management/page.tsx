import { ArrowRight, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Management',
    description: 'Management of Fr. Porukara CMI College,Champakulam'
}
export default function Page() {
    return <main>
        <div className="bg-foreground h-[350px]">

        </div>
        <div className="mt-[-150px] px-5 flex items-center">
            <h3 className="text-[30px] text-white w-full nd:mt-0  items-center text-center font-bold flex flex-col min-h-[200px]">
                <span>Management</span>
                <span className="text-[15px] font-light">About College {'>'} Management</span>
            </h3>
        </div>
        <div className="screen flex md:flex-row flex-col mt-3">

            <div className="w-full bg-zinc-50 pt-6 px-6  text-[18px]">
                <h1 className="ps-2 text-secondary mt-3 mb-4">About Management</h1>
                <span className="pt-2 px-3 my-5 mt-5">
                    Fr. Porukara CMI College of Advanced Studies is
                    owned and managed by Gagultha Monastery Champakulam.
                    The Prior of Gagultha Monastery is the Manger of the College.
                    The General Management of the college is vested in the
                    Managing	Board	whose	Ex	–	officio	President	is	the	Manager.
                </span>
                <div className="bg-foreground text-white p-3 mt-4 text-center flex justify-center">
                    Managing Board (FOR THE YEAR 2023 -2024)
                </div>
                <div className="flex flex-col p-4 gap-2 mb-10">
                    <div>
                        1. Rev. Fr. Chacko Akkathara CMI (President)
                    </div>
                    <div>
                        2. Rev. Fr. Dr. Josey Kollammalil CMI (Secretary)
                    </div>
                    <div>
                        3. Rev. Fr. James Mullassery CMI (Councilor for Education)
                    </div>
                    <div>
                        4. Rev. Fr. Jacob Meenappally CMI (Member)
                    </div>
                    <div>
                        5.	Rev.	Fr.	Subin	Kottoor	CMI	(Member)
                    </div>
                </div>
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
        {/* <div className="flex bg-zinc-50 justify-end screen p-3 mb-4">
            <Link className="flex justify-center p-2 gap-2 rounded-xl bg-white border-[0.01rem] border-foreground/30 items-center" href={'/AboutCollege/Management'}>
                <h2 className="font-semibold">Management</h2>
                <ChevronRight />
            </Link>
        </div> */}
    </main>
}