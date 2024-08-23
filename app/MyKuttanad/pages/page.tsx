import { getDb2 } from "@/db";
import { AppShareTable, app_place } from "@/db/schema";
import '../../globals.css'
import Image from "next/image";
import { Link2OffIcon, Star, StarIcon, StarOff } from "lucide-react";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { BiLink } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Comments from "./Comments";
import Categories from "./Categories";
export default async function Page() {

    const img = [
        "https://mykuttanadu.s3.us-west-1.amazonaws.com/1715524885391.jpg",
        "https://mykuttanadu.s3.us-west-1.amazonaws.com/1715524885391.jpg",
        "https://mykuttanadu.s3.us-west-1.amazonaws.com/1715524885391.jpg",
        "https://mykuttanadu.s3.us-west-1.amazonaws.com/1715524885391.jpg",
    ]
    const { db, connection } = await getDb2();
    const place = await db.select().from(app_place).limit(0);;
    connection.end();
    return <div className="screen flex flex-col items-center">
        {/* {
            place != null ? <div className="w-full max-h-[350px] flex items-center mx-auto rounded-xl overflow-hidden">
                <Image src={`https://mykuttanadu.s3.us-west-1.amazonaws.com/1715524885391.jpg`} width={900} height={900} style={{ objectPosition: 'center' }} className="w-full h-full object-cover object-center" alt='' />
            </div> : ''
        }
        <section className="w-full md:px-10 px-4">
            <div className="w-full mt-[-150px]">
                <div className="w-full no-scrollbar flex justify-end gap-2 px-2 pt-2 overflow-scroll">
                    {img.map((item, index) => {
                        return <div key={index} className="h-[50px] bg-white p-[4px] border-[0.01rem] border-zinc-300 w-[50px] rounded-sm shadow-lg">
                            <Image src={item} width={50} height={50} className="w-full h-full rounded-sm object-cover" alt="" />
                        </div>
                    })}
                </div>
                <div className="bg-white w-full rounded-md overflow-hidden shadow-md">
                    <div className="flex justify-between w-full items-center">
                        <div className="px-6 py-3 flex items-center">
                            <h2>shared by </h2>
                            <div className="bg-foreground text-white px-2 py-1 rounded-sm ms-2">Abin Antony</div>
                        </div>
                        <Link href={'/'} className="bg-green-600 flex items-center gap-2 me-3 shadow-sm rounded-sm text-white px-3 py-2">Read in App <BiLink /></Link>
                    </div>
                    <div className="px-6 flex flex-col py-1">
                        <div className="flex gap-2 items-center">
                            <div className="flex items-center gap-2">
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                                <FaStar className="text-yellow-400" />
                            </div>
                            <span>4.2</span>
                        </div>
                        <h3 className="text-[24px] font-bold">{place != null ? place[0].name : ''}</h3>
                        <p>Champakulam, Alappuzha, Kerala</p>
                    </div>
                    <hr />
                    <div className="flex md:flex-row flex-col md:gap-2 gap-3">
                        <div className="flex flex-col w-full">
                            <div className="px-6 w-full pt-3 pb-4 flex flex-col text-justify">
                                <span className="text-black/50 mb-2">Description</span>
                                This destination is a bustling metropolis with a skyline dominated by impressive skyscrapers, yet it holds onto its rich cultural heritage with pride.
                                <br />
                                Stroll through its vibrant streets, and you'll encounter a harmonious blend of old and new. Historic temples and shrines stand alongside contemporary art installations and cutting-edge architecture. The city is renowned for its meticulously maintained gardens, offering serene escapes amidst the urban hustle and bustle. During spring, these gardens transform into enchanting wonderlands with cherry blossoms painting the landscape in shades of pink and white....
                            </div>
                            <div className="px-6 w-full pt-3 pb-4 flex flex-col text-justify">
                                <span className="text-black/50 mb-2">Facilities</span>
                                escapes amidst the urban hustle and bustle. During spring, these gardens transform into enchanting wonderlands with cherry blossoms painting the landscape in shades of pink and white....
                            </div>
                        </div>
                        <div className="md:max-w-[350px] max-w-[500px] w-full relative group">
                            <div className="w-full h-full items-center justify-center absolute top-0 left-0 right-0 bottom-0 flex bg-black/50 group-hover:opacity-100 opacity-0">
                                <Link href={'https://maps.app.goo.gl/xeMu3iNUi5seAiGA7'} className="bg-white rounded-full px-3 py-1">Open Location</Link>
                            </div>
                            <Image src={'/assets/app/locationmap.jpg'} width={500} height={500} className="w-full h-full object-cover" alt="" />
                        </div>
                    </div>
                </div>
                <Comments />
                <Categories />
            </div>
        </section>
        <div className="bg-white z-[999] fixed flex w-full shadow-md justify-between left-0 bottom-0 right-0 px-5 py-3">
            <div className="flex flex-col">
                <h2 className="text-[18px] text-green-900 font-bold">My Kuttanad App</h2>
                <h2 className="text-[12px]">Open in App</h2>
            </div>
            <Link href={'/'} className="flex gap-2 items-center">
                <Image src={'/assets/app/google_play.png'} width={150} height={70} alt="Kuttanad App" />
            </Link>
        </div> */}
    </div>
}