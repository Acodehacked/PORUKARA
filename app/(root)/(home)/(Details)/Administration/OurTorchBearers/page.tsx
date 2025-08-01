import { TORCHBEARERS } from "@/constants";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = {
    title: 'Our Torch Bearers',
    description: 'Torch Bearers of Fr. Porukara CMI College,Champakulam'
}
export default function Page() {
    return <main>
        <div className="bg-foreground h-[350px]">

        </div>
        <div className="mt-[-150px] px-5 flex items-center">
            <h3 className="text-[30px] text-white w-full nd:mt-0  items-center text-center font-bold flex flex-col min-h-[200px]">
                <span>Our Torch Bearers</span>
                <span className="text-[15px] font-light">About College {'>'} Our Torch Bearers</span>
            </h3>
        </div>
        <div className="screen flex md:flex-row flex-col mt-3">

            <div className="w-full bg-white pt-6 px-6  text-[18px]">
                <div className="flex flex-wrap gap-4 mb-[100px] justify-center">
                    {TORCHBEARERS.map((person, index) => {
                        return <div key={index} className="flex min-w-[150px] max-w-[220px] w-max justify-start items-center flex-col">
                            <div style={{width:'150px',height:'200px'}} className="rounded-xl shadow-[0px_2px_10px_rgba(0,0,0,0.1)] overflow-hidden m-2 ">
                                <img src={`/assets/Tb${index + 1}.webp`} className="w-full h-full object-cover " width={150} height={200} alt={person.name} />
                            </div>
                            <h3 className="text-[18px] mt-3 font-bold text-center">{person.name}</h3>
                            <h3 className="text-[12px] text-secondary text-center">{person.place}</h3>
                        </div>
                    })}
                </div>
                {/* <span className="pt-2 px-3 my-5 mt-[100px]">
                    Fr. Porukara CMI College of Advanced Studies is
                    owned and managed by Gagultha Monastery Champakulam.
                    The Prior of Gagultha Monastery is the Manger of the College.
                    The General Management of the college is vested in the
                    Managing	Board	whose	Ex	–	officio	President	is	the	Manager.
                </span> */}
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
            <div className="flex flex-col p-2 items-center md:max-w-[350px] w-full bg-white">
                <h5 className="text-[23px] pt-3 font-semibold px-2 text-center">Related Contents</h5>
                <Link href={'/AboutCollege/Management'} className="pt-4 justify-between bg-black/10 mt-3 pb-4 px-5 text-[15px] flex w-full">
                    Management <ChevronRight />
                </Link>
                <Link href={'/AboutCollege/EducationPolicyStatement'} className="pt-4 justify-between bg-black/10 mt-3 pb-4 px-5 text-[15px] flex w-full">
                    CMI Education Policy <ChevronRight />
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