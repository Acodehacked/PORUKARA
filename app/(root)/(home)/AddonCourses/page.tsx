import JsonLd from "@/components/reusable/JsonStructured"
import { ADDONCOURSES } from "@/constants"
import { ArrowRightIcon } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { BiNetworkChart } from "react-icons/bi"

export const metadata: Metadata = {
    title: 'Addon Courses | Fr. Porukara CMI College,Champakulam',
    description: 'Courses offered by Fr. Porukara CMI College,Champakulam, Official Website of Porukara CMI Colllege, Champakulam, Kerala, India. Fr Porukara College Admission Opened. Apply for BCA, B.Com, BA and other 4 year UG Programmes. Admissions Open Admissions Open for BCA, BCOM with Finance and Taxation, BCOM with Computer Application, BA English Contact: 9446249412',
    keywords: `${ADDONCOURSES.map((course, index) => {
        return course.text + ', ';
    })} courses provided by Fr.Porukara College Champakulam, Best Colleges in kuttanad, Best College in Alappuzha,Top 10 colleges in kerala, Top BCA College in Kerala,Top B.Com college in alappuzha, kerala, Fr.Porukara College, CMI College in kerala, Colleges in India,Best Colleges, Porukara, Porukara College, Champakulam Porukara, Courses in Porukara College, Courses provided by Fr.Porukara CMI College, Champakulam`,
    openGraph: {
        images: ["https://porukaracollege.in/assets/thumbnail.webp"]
    }
}
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
            <JsonLd data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
                ADDONCOURSES.map((course, index) => {
                    return {
                        "@type": "ListItem",
                        "position": `${index + 1}`,
                        "item": {
                            "@type": "Course",
                            "url": `https://www.porukaracollege.in${course.path}`,
                            "name": `${course.text}`,
                            "description": `${course.text} course provided by Fr.Porukara CMI College, Gagultha Monastery, Champakulam, Alappuzha, Kerala`,
                            "provider": {
                                "@type": "Organization",
                                "name": "Fr.Porukara College",
                                "sameAs": "https://www.porukaracolleg.in"
                            },
                            "hasCourseInstance": {
                                "@type": "CourseInstance",
                                "courseMode": "Onsite",
                                "endDate": "2025-06-01",
                                "startDate": "2024-07-01",
                                "location": "Fr.Porukara College,Champakulam,Kuttanad, Kerala",
                                "courseSchedule": {
                                  "@type": "Schedule",
                                  "duration": "PT3H",
                                  "repeatFrequency": "Daily",
                                  "repeatCount": 31,
                                  "startDate": "2024-06-01",
                                  "endDate": '2025-06-01'
                                },
                            },
                            "offers": {
                                "@type": "Offer",
                                "category": "Offline Class",
                                "priceSpecification": {
                                    "@type": "PriceSpecification",
                                    "price": 10000,
                                    "priceCurrency": "INR"
                                }
                            }
                        }
                    };
                })
            ]
        }} />
        </div>
    </>);