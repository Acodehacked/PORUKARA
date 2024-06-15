import { ADDONCOURSES } from "@/constants"
import { ArrowRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { BiNetworkChart } from "react-icons/bi"

export default function Page() {
    const techologyb = ADDONCOURSES.filter((item) => item.category == 'computer')
    const resourceb = ADDONCOURSES.filter((item) => item.category == 'resource')
    const languageb = ADDONCOURSES.filter((item) => item.category == 'language')
    return <div className="min-h-screen md:pt-[190px] pt-[140px] pb-[50px]">
        <div className="flex justify-center items-center pb-8 p-4 screen rounded-full">
            <h3 className="text-foreground text-[39px]  font-semibold">Addon Courses</h3>
        </div>
        <CourseList text="Technology" list={techologyb} />
        <CourseList text="Management" list={resourceb} />
        <CourseList text="Language" list={languageb} />
    </div>
}

const CourseList = (({list,text}:{
    text:string,
    list:{
        text: string;
        description: string;
        path: string;
        category: string;
        image: string;
    }[]
}) => <>
        <div className="px-5 screen flex justify-start relative">
            <div className="flex relative z-[2] items-center gap-4 px-5 py-1 border-[0.01rem] border-primary bg-zinc-100 rounded-sm">
                <BiNetworkChart className="text-primary" />
                <h3 className="text-[20px] text-foreground">{text}</h3>
            </div>
            <span className="absolute z-[1] w-full h-[1px] bg-primary top-[50%]">
            </span>
        </div>
        <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 mb-8 gap-4 mt-3 px-8  rounded-xl pt-6 mx-4 screen">
            {list.map((item, index) => {
                return <Link href={`${item.path}`} key={index} className=" overflow-hidden relative shadow-sm">
                    <div className="flex flex-col justify-start items-start">
                        <Image src={item.image} className="w-full h-[130px] object-cover rounded-xl" width={580} height={580} alt="" />
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
    </>);