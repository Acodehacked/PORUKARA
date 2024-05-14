import Course from "@/components/reusable/public/Course";
import { COURSES } from "@/constants";
import { ArrowRightCircle, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type courseType = {
    duration: string,
    title: string,
    link: string,
    eligibility: string,
    image: string,
    description: string
} | null;
export default function Page({ params }: { params: { name: string } }) {
    var Coursee: courseType = {
        title: 'dfd',
        duration: 'dd',
        link: '/fdfdfd',
        eligibility: 'fgfg',
        image: 'dffdfdf',
        description: 'dd'
    };
    var find = false;
    COURSES.forEach((course) => {
        if ('/Course/' + params.name == course?.path) {
            Coursee = course;
            find = true;
        }
    })
    if (Coursee?.title == 'dfd') {
        return notFound()
    }
    var otheru = COURSES.filter((item) => item.title != Coursee?.title && item.eligibility == '+2 or Equivalent Course');
    var otherp = COURSES.filter((item) => item.title != Coursee?.title && item.eligibility != '+2 or Equivalent Course');
    return <main className="pt-[200px] pb-[60px] screen">
        <div className="px-3 pb-3 pt-1 ">
            {Coursee?.title?.includes('*') && <div className="bg-zinc-300 w-max px-2 py-1 rounded-sm">
                Course subjected to university approval
            </div>}
        </div>
        {/* <h2 className="text-[30px]">{params.name}</h2> */}
        <Course duration={Coursee?.duration || '1 year'} id={Coursee?.title} applylink={Coursee?.link || '/'} eligibility={Coursee?.eligibility || 'Plus Two'} title={Coursee?.title || ''} image={Coursee?.image}>
            {Coursee?.description || ''}
        </Course>
        <div className="mt-10 mb-2">
            <h2>UG Courses</h2>
        </div>
        <div className="mt-2 md:px-1 px-4 w-full md:overflow-visible overflow-hidden pt-2 pb-3 hover-cards-p grid gap-3 md:grid-cols-5 sm:grid-cols-2 grid-cols-1">
            {otheru.map((item, index) => {
                return <Link href={`${item.path}`} key={index} className="bg-white hover-cards rounded-md relative shadow-sm hover:shadow-xl p-3">
                    <div className="flex flex-col justify-start items-start gap-3">
                        <Image src={'/assets/logo-gold.png'} width={80} height={80} alt="" />
                        <div className="flex flex-col">
                            <h2 className="text-[17px] mt-1 font-semibold">{item.title}</h2>
                            <p className=" text-black text-[12px] mt-2 w-max px-3 py-1 rounded-sm border-[0.01rem] border-zinc-200">{item.duration}</p>
                        </div>
                        <div  className="absolute flex gap-2 bottom-[10px] right-[10px] z-[1]">
                            <div className=" text-foreground text-[12px] w-max pb-2 pe-2 rounded-full">
                                <ArrowRightIcon size={20} />
                            </div>
                        </div>
                    </div>
                </Link>
            })}
        </div>
        <div className="mt-10 mb-2">
            <h2>PG Courses</h2>
        </div>
        <div className="mt-2 md:px-1 px-4 w-full md:overflow-visible overflow-hidden pt-2 pb-3 hover-cards-p grid gap-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {otherp.map((item, index) => {
                return <Link href={`${item.path}`} key={index} className="bg-white hover-cards rounded-md relative shadow-sm hover:shadow-xl p-3">
                    <div className="flex justify-start items-start gap-3">
                        <Image src={'/assets/logo-gold.png'} width={80} height={80} alt="" />
                        <div className="flex flex-col">
                            <h2 className="text-[17px] mt-1 font-semibold">{item.title}</h2>
                            <p className=" text-black text-[12px] mt-2 w-max px-3 py-1 rounded-sm border-[0.01rem] border-zinc-200">{item.duration}</p>
                        </div>
                        <div  className="absolute flex gap-2 bottom-[10px] right-[10px] z-[1]">
                            <div className=" text-foreground text-[12px] w-max pb-2 pe-2 rounded-full">
                                <ArrowRightIcon size={20} />
                            </div>
                        </div>
                    </div>
                </Link>
            })}
        </div>
    </main>
}