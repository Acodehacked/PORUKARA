import { DEMOEVENTS } from "@/constants";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Latest Events | Fr.Porukara CMI College, Champakulam',
    description: 'Latest Events of Fr.Porukara CMI College, Champakulam'
}
export default function Page() {
    return <main className="min-h-[100vh] screen px-2 pt-[160px]">
        <div>
            <h1 className="text-[35px] mt-3 left-primary ps-2">Latest Events</h1>
        </div>
        <div className="mt-4 text-[18px] grid md:grid-cols-4 gap-3">
            {DEMOEVENTS.map((event, index) => {
                return <div key={index} className="flex flex-col p-3">
                    <Image src={event.image} width={400} height={300} alt="Graduate" />
                    <h2 className="text-[26px] mt-2 font-semibold">{event.title}</h2>
                    <p className="text-[17px]">{event.desc}</p>
                    <div className="flex justify-end">
                        {/* <Link className="text-foreground text-[15px] px-2 py-1 bg-zinc-300 rounded-sm" href={'/'}>Read more</Link> */}
                    </div>
                </div>
            })}
        </div>
    </main>
}
