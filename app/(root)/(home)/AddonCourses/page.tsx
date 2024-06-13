import { ADDONCOURSES } from "@/constants"
import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Page() {
    return <div className="min-h-screen pt-[190px]">
        <div className="flex justify-center items-center p-4 screen rounded-full">
            <h3 className="text-foreground text-[39px] font-semibold">Addon Courses</h3>
        </div>
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 mb-8 gap-4 mt-3 px-2 mx-4 screen">
            {ADDONCOURSES.map((item, index) => {
                return <Link href={`${item.path}`} key={index} className="bg-white overflow-hidden rounded-md relative shadow-sm hover:shadow-xl">
                    <div className="flex flex-col justify-start items-start">
                        <Image src={'/assets/porukara.jpeg'} className="w-full h-[150px] object-cover" width={580} height={580} alt="" />
                        <div className="flex flex-col px-5 py-2">
                            <h2 className="text-[17px] mt-1 font-semibold">{item.text}</h2>
                        </div>
                        {/* <div className="absolute flex gap-2 bottom-[10px] right-[10px] z-[1]">
                            <div className=" text-foreground text-[12px] w-max pb-2 pe-2 rounded-full">
                                <ArrowRightIcon size={20} />
                            </div>
                        </div> */}
                    </div>
                </Link>
            })}
        </div>
    </div>
}