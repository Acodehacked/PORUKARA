import { ArrowRight, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
    title: 'Founder',
    description: 'Founder of Fr. Porukara CMI College,Champakulam'
}
export default function Page() {
    return <main>
        <div className="p-4 pt-[60px] md:pt-[170px] ">
            <h3 className="text-[30px] text-black w-full text-center font-bold flex flex-col items-center">
                <span>Founder</span>
                <span className="text-[15px] font-medium">About College {'>'} Founder</span>
            </h3>
        </div>
        <div className="screen flex md:flex-row flex-col mt-3">
            <div className="flex flex-col items-center md:max-w-[350px] w-full bg-white">
                <img src={'/assets/stchavara.webp'} alt="" width={250} height={250} className="pt-4" />
                <h5 className="text-[23px] pt-3 font-semibold">Kuriakose Elias Chavara</h5>
                <h1> (10 February 1805 – 3 January 1871)</h1>
                <p className="px-5 pt-2 text-justify text-[13px]">
                    He was the co-founder and first prior general of the first congregation for men in the Syro-Malabar Church, the Carmelites of Mary Immaculate (CMI), and of a similar one for women, the Congregation of the Mother of Carmel (CMC).</p>
            </div>
            <div className="w-full text-justify bg-zinc-50 pt-6 px-6  text-[15px]">
                Kuriakose Elias Chavara was an Indian Syro-Malabar Catholic priest, religious, philosopher and social reformer.He is the first canonised Catholic male saint of Indian origin and was a member of the Syro-Malabar Church, an Eastern Catholic church.He was born on 10 February 1805 at Kainakary, Kerala in a Nasrani Christian family as the son of Iko (Kuriakose) Chavara and Mariam Thoppil.<br /><br/> Nasranis are Saint Thomas Christians (also known as Syriac Christians) who trace their lineage to the ancient Christians of Kerala baptised by Thomas the Apostle. The name Kuriakose is derived from the Syriac Aramaic name ܩܘܪܝܩܘܣ (Quriaqos).He was baptised on 17 February 1805 at St. Joseph&#39;s Syro-Malabar Catholic Church, Chennamkary.<br /> On 8 September 1805, Chavara was dedicated to Blessed Virgin Mary at St. Mary&#39;s Church, Vechoor.The Chavara family has derived from the ancient Nasrani family Meenappally in Kainakary.

                In his childhood, Kuriakose attended the village school. There he studied language and elementary sciences. He entered the seminary in 1818 in Pallipuram where Palackal Thoma Malpan was the Rector. He was ordained a priest on 29 November 1829 and celebrated first Holy Qurbana at St. Andrew&#39;s Basilica, Arthunkal, Alappuzha. His special intention during the first Holy Qurabana was the realization of the religious institute which was being contemplated by Palackal Thomas Malpan, Porukara Thomas Kathanar, Brother Jacob Kaniathara and himself
            </div>
        </div>
        <div className="flex bg-zinc-50 justify-end screen p-3 mb-4">
            <Link className="flex justify-center p-2 gap-2 rounded-xl bg-white border-[0.01rem] border-foreground/30 items-center" href={'/AboutCollege/OurPatron'}>
                <img src={'/assets/thomasporukara.webp'} alt="Thomas Porukara" height={50} width={50} />
                <h2 className="font-semibold">Our Patron</h2>
                <ChevronRight />
            </Link>
        </div>
    </main>
}