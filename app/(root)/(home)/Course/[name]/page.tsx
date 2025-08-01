import Course from "@/components/reusable/public/Course";
import { Button } from "@/components/ui/button";
import { COURSES } from "@/constants";
import { ArrowRightCircle, ArrowRightCircleIcon, ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BiDownload, BiInfoCircle, BiLink, BiLinkExternal } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";

type courseType = {
    duration: string,
    title: string,
    link: string,
    eligibility: string,
    image: string,
    description: string,
    specializations?: string[]
} | null;
type Props = {
    params: { name: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    var Coursee: courseType = {
        title: 'dfd',
        duration: 'dd',
        link: '/fdfdfd',
        eligibility: 'fgfg',
        image: 'dffdfdf',
        description: 'dd',
        specializations: undefined
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
    return {
        title: Coursee?.title + ' - Courses - Fr.Porukara CMI College, Chapakulam',
        generator: 'porukaracollege, PorukaraCollege, Porukara Website, porukara, Fr Porukara School, Official Website of Porukara CMI College, Kerala ',
        description: 'Official Website of Porukara CMI Colllege, Champakulam, Kerala, India. Fr Porukara College Admission Opened. Apply for BCA, B.Com, BA and other 4 year UG Programmes. Admissions Open Admissions Open for BCA, BCOM with Finance and Taxation, BCOM with Computer Application, BA English Contact: 9446249412',
        keywords: 'Fr. Porukara CMI College, BCA Colleges,Best BCA, B.Com COllege in kerala,Colleges in Kerala,Best Colleges in Kuttanad, Best College in Alappuzha,BCA,B.Com ,' + Coursee?.title + " College in Alappuzha, Best " + Coursee?.title + " College in Kuttanad, Top 10 Colleges in Kuttanad",
        openGraph: {
            type: "website",
            url: "https://porukaracollege.in",
            title: "Fr. Porukara CMI Colllege of Advanced Studies",
            description: "Offical website of Fr. Porukara CMI College of advanced Studies, Gagultha Monastry,Champakulam , Kerala",
            siteName: "Fr. Porukara CMI College",
            images: ["https://porukaracollege.in/assets/thumbnail.webp"],
        }
    }
}
export default function Page({ params }: { params: { name: string } }) {
    var Coursee: courseType = {
        title: 'dfd',
        duration: 'dd',
        link: '/fdfdfd',
        eligibility: 'fgfg',
        image: 'dffdfdf',
        description: 'dd',
        specializations: undefined
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
    return <main className=" relative pb-[60px] bg-foreground">
        {/* <h2 className="text-[30px]">{params.name}</h2> */}
        <div className="min-h-[650px] w-full relative">
            <div className="z-[1] relative">
                <div className="md:absolute relative flex flex-col items-start sm:pt-[200px] pt-[140px] left-0 right-0 bottom-0 top-0 bg-gradient-to-l via-foreground/80 from-foreground/40 to-foreground z-[3]">
                    <div className="flex justify-between flex-col md:flex-row screen">
                        <div className="flex flex-col items-start md:p-0 p-5 w-full">
                            <Image src={'/assets/graduatehat.webp'} height={80} width={80} alt="Logo" />
                            <h3 className="text-white/80">{Coursee?.duration} Course</h3>
                            <h2 className="text-white text-[30px] md:text-[39px] font-semibold">{Coursee?.title}</h2>
                            <div className='flex gap-3 md:flex-row flex-row mt-6 px-4 pb-6'>
                                {/* /assets/applicationform.pdf */}
                                <Button variant={'outline'} asChild={true} className='sm:min-w-[200px]'>
                                    <Link href={'/assets/PorukaraApplicationForm.pdf'}>Download Application Form&nbsp;<BiDownload /></Link></Button>
                                <Button variant={'default'} asChild={true} className='sm:min-w-[200px]'>
                                    <Link href={`/Admission?appliedCourse=${Coursee?.title}`}>Apply Now&nbsp;<BiLinkExternal /></Link></Button>
                            </div>
                        </div>
                        <div className="w-full flex justify-center items-center">
                            {
                                Coursee?.specializations?.length != undefined ? <div className=' bg-zinc-50 w-full max-w-[460px] mt-3 rounded-sm gap-1 flex flex-col '>
                                    {Coursee?.specializations?.length != undefined ? <h2 className='py-2 font-semibold text-zinc-500 px-3'>Specializations</h2> : ""}
                                    <hr />
                                    <div className="flex flex-col gap-2 ps-2 pe-2 md:pe-10 mt-2 pb-3">
                                        {Coursee?.specializations?.map((spec, index) => {
                                            return <div key={index} className='flex ms-2 items-center gap-2'>
                                                <FaCheckCircle size={15} className='text-green-600' />
                                                <h2>{spec}</h2>
                                            </div>
                                        })}</div>
                                </div> : <h3 className="text-zinc-100 flex items-center gap-4"><BiInfoCircle /> No Specializations</h3>
                            }
                        </div>
                    </div>
                    {Coursee?.title.includes('M') ? '' : <div className="flex flex-col text-white rounded-xl mb-5 p-3 screen w-full  mt-6">
                        <h3 className="text-white/60 py-2 text-[20px]">Available Minors</h3>
                        <div className="flex me-auto minors select-none gap-x-10 gap-y-3 text-[15px] w-full  bg-blue-900/30 rounded-sm sm:rounded-full flex-wrap sm:w-auto py-2 text-white px-5">
                            <span><ArrowRightCircleIcon size={10} /> Computer Application</span>
                            <span><ArrowRightCircleIcon size={10} /> English</span>
                            <span><ArrowRightCircleIcon size={10} /> Hindi</span>
                            <span><ArrowRightCircleIcon size={10} /> Malayalam</span>
                            <span><ArrowRightCircleIcon size={10} /> Commerce</span>
                        </div>
                    </div>}
                </div>
                <Image className="z-[2] hidden sm:block w-full h-full max-h-[650px] object-cover" src="/assets/porukara.webp" height={800} width={1000} alt="/assets/porukara.webp" />
            </div>



            {/* <Course specializations={Coursee?.specializations} duration={Coursee?.duration || '1 year'} id={Coursee?.title} applylink={Coursee?.link || '/'} eligibility={Coursee?.eligibility || 'Plus Two'} title={Coursee?.title || ''} image={Coursee?.image}>
                {Coursee?.description || ''}
            </Course> */}
        </div>
        <div className="flex flex-col bg-zinc-200 pb-8 px-3 overflow-visible">
            <div className="screen ">
                <div className="mt-10 mb-2">
                    <h2>UG Courses</h2>
                </div>
                <div className="mt-2 md:px-1 px-4 w-full md:overflow-visible overflow-hidden pt-2 pb-3 hover-cards-p grid gap-3 md:grid-cols-5 sm:grid-cols-2 grid-cols-1">
                    {otheru.map((item, index) => {
                        return <Link href={`${item.path}`} key={index} className="bg-white hover-cards rounded-md relative shadow-sm hover:shadow-xl p-3">
                            <div className="flex flex-col justify-start items-start gap-3">
                                <Image src={'/assets/logo-gold.webp'} width={80} height={80} alt="" />
                                <div className="flex flex-col">
                                    <h2 className="text-[17px] mt-1 font-semibold">{item.title}</h2>
                                    <p className=" text-black text-[12px] mt-2 w-max px-3 py-1 rounded-sm border-[0.01rem] border-zinc-200">{item.duration}</p>
                                </div>
                                <div className="absolute flex gap-2 bottom-[10px] right-[10px] z-[1]">
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
                                <Image src={'/assets/logo-gold.webp'} width={80} height={80} alt="" />
                                <div className="flex flex-col">
                                    <h2 className="text-[17px] mt-1 font-semibold">{item.title}</h2>
                                    <p className=" text-black text-[12px] mt-2 w-max px-3 py-1 rounded-sm border-[0.01rem] border-zinc-200">{item.duration}</p>
                                </div>
                                <div className="absolute flex gap-2 bottom-[10px] right-[10px] z-[1]">
                                    <div className=" text-foreground text-[12px] w-max pb-2 pe-2 rounded-full">
                                        <ArrowRightIcon size={20} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    })}
                </div>
            </div>
        </div>
    </main>
}