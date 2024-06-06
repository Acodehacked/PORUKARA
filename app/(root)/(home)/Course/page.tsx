import JsonLd from "@/components/reusable/JsonStructured";
import Course from "@/components/reusable/public/Course";
import { COURSES } from "@/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Courses | Fr. Porukara CMI College,Champakulam',
    description: 'Courses offered by Fr. Porukara CMI College,Champakulam, Official Website of Porukara CMI Colllege, Champakulam, Kerala, India. Fr Porukara College Admission Opened. Apply for BCA, B.Com, BA and other 4 year UG Programmes. Admissions Open Admissions Open for BCA, BCOM with Finance and Taxation, BCOM with Computer Application, BA English Contact: 9446249412',
    keywords: `${COURSES.map((course, index) => {
        return course.text + ', ';
    })} courses provided by Fr.Porukara College Champakulam, Best Colleges in kuttanad, Best College in Alappuzha,Top 10 colleges in kerala, Top BCA College in Kerala,Top B.Com college in alappuzha, kerala, Fr.Porukara College, CMI College in kerala, Colleges in India,Best Colleges, Porukara, Porukara College, Champakulam Porukara, Courses in Porukara College, Courses provided by Fr.Porukara CMI College, Champakulam`,
    openGraph: {
        images: ["https://porukaracollege.in/assets/thumbnail.jpg"]
    }
}
export default function page() {
    return <main>
        <div className="flex mt-[100px] items-center jusify-center font-bold text-[40px] px-0 h-[340px] text-foreground justify-between relative overflow-hidden bg-zinc-50">
            <div className="flex relative w-full z-[3] md:flex-row flex-col justify-center items-center h-[auto]">
                <div className="flex flex-col">
                    <h3 className="text-link-dark no-hover">Courses We Offer</h3>
                    <p className="text-[15px] font-medium">Explore different courses that we are providing</p>
                </div>
                <Image className="p-0 " src={'/assets/graduatehat.png'} alt="" height={200} width={200} />

            </div>
        </div>
        <div className="flex bg-zinc-200 w-full">
            <div className="flex screen flex-col  md:flex-row min-h-[200vh] ">
                <div className="px-2 max-w-[100%] md:min-w-[100px] w-full md:max-w-[30%] pt-3">
                    <div className="p-2 sticky top-[6rem] w-full rounded-xl bg-white py-5">
                        <div className="flex flex-col gap-2">

                            {COURSES.map((item, index) => {
                                return <Link key={index} className="hover:translate-x-1 hover:text-primary transition-all duration-150 p-2 border-b-2 border-b-black/10 font-semibold" href={`#${item?.title}`} >{item?.title}</Link>
                            })}
                        </div>
                    </div>
                </div>
                <div className="w-full mb-3 mt-3 flex flex-col gap-[20px]">
                    {/* <div className="bg-blue-700 rounded-xl overflow-hidden">
                        <h3 className="text-white px-3 py-2 text-[25px]">Available Minors</h3>
                        <div className="flex flex-col bg-blue-900 py-2 text-white px-5">
                            <span>Computer Application</span>
                            <span>English</span>
                            <span>Hindi</span>
                            <span>Malayalam</span>
                            <span>Commerce</span>
                        </div>
                    </div> */}
                    {COURSES.map((item, index) => {
                        return <Course key={index} specializations={item?.specializations} duration={item?.duration || '1 year'} id={item?.title} applylink={item?.link || '/'} eligibility={item?.eligibility || 'Plus Two'} title={item?.title || ''} image={item?.image}>
                            {item?.description || ''}
                        </Course>
                    })}
                </div>
            </div>
        </div>
        <JsonLd data={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": [
                COURSES.map((course, index) => {
                    return {
                        "@type": "ListItem",
                        "position": `${index + 1}`,
                        "item": {
                            "@type": "Course",
                            "url": `https://www.porukaracollege.in${course.path}`,
                            "name": `${course.title}`,
                            "description": `${course.title} course provided by Fr.Porukara CMI College, Gagultha Monastery, Champakulam, Alappuzha, Kerala`,
                            "provider": {
                                "@type": "Organization",
                                "name": "Fr.Porukara College",
                                "sameAs": "https://www.porukaracolleg.in"
                            },
                            "hasCourseInstance": {
                                "@type": "CourseInstance",
                                "courseMode": "Onsite",
                                "endDate": "2024-06-01",
                                "startDate": `${course.duration == '4 Year' ? "2028-06-30" : '"2026-06-15"'}`,
                                "location": "Fr.Porukara College",
                                "courseSchedule": {
                                  "@type": "Schedule",
                                  "duration": "PT3H",
                                  "repeatFrequency": "Daily",
                                  "repeatCount": 31,
                                  "startDate": "2024-06-01",
                                  "endDate": `${course.duration == '4 Year' ? "2028-06-30" : '"2026-06-15"'}`
                                },
                            },
                            "offers": {
                                "@type": "Offer",
                                "category": "Offline Class",
                                "priceSpecification": {
                                    "@type": "PriceSpecification",
                                    "price": 400000,
                                    "priceCurrency": "INR"
                                }
                            }
                        }
                    };
                })
            ]
        }} />
    </main>
}