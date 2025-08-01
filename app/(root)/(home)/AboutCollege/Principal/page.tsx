import { ArrowRight, ChevronRight, Mail, Phone } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Principal\s Message',
    description: 'Message of Fr. Porukara CMI College,Champakulam Principal'
}
export default function Page() {
    return <main>
        <div className="bg-foreground h-[450px]">

        </div>
        <div className="mt-[-160px] px-5 flex md:flex-row items-center flex-col-reverse screen justify-between bg-zinc-50">
            <h3 className="text-[30px] text-black w-full nd:mt-0 mt-3 items-center text-center font-semibold flex flex-col ">
                <span>Principal&#39;s Message</span>
                <span className="text-[15px] font-medium">About College {'>'} Principal&#39;s Message</span>
            </h3>
            <Image src={'/assets/principal.webp'} alt="" width={450} height={450} className="mt-[-100px] w-full  max-w-[400px] rounded-2xl" />
        </div>
        <div className="screen flex md:flex-row flex-col-reverse mt-3">
            <div className="flex flex-col items-center md:max-w-[350px] w-full bg-white">
                <h5 className="text-[13px] pt-3 font-medium text-secondary">Current Principal</h5>
                <h5 className="text-[20px] pt-3 font-semibold px-2 text-center">Fr. Dr. Josey Kollammalil CMI</h5>
                <h5 className="text-[18px] text-black/50">MBA, M.Phil, PGDBE, PhD</h5>
                <p className="pt-4 bg-primary-dark text-white mt-3 pb-4 px-5 text-[15px] flex flex-col w-full">
                    <div className="flex items-center gap-2">
                        <Phone size={14} /> +918281813844<br />
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail size={14} /> seeseajoc@yahoo.com<br />
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail size={14} /> koseykosey@yahoo.com
                    </div>

                </p>
            </div>
            <div className="w-full bg-zinc-50 pt-6 px-6 text-justify text-[15px]">
                <span className="text-[30px]">I</span> have immense pleasure to welcome you to Fr. Porukara CMI College, part of the CMI (Carmelites of Mary Immaculate, the first indigenous Catholic Religious Congregation of India) Educational Agency, one of the biggest educational agencies in India.
                <br />
                <br />
                Our College aims at the overall development of students through a holistic approach with great emphasis on the Spiritual, Emotional, Intellectual and Physical integrity. We frequently update the quality of the curriculum in order to ensure that the students of Fr. Porukara CMI College are able to face and succeed the challenges of this ever-changing world without fear.
                <br />
                We design a curriculum where we value; igniting the spark of creativity and curiosity in our students along with faith in God, love of fellow beings, moral uprightness, Social Responsibility and Pursuit of Excellence.
                <br />

                This institution intends to serve the students with the Mission; that our students should be responsible for themselves, innovative and equipped for new and future challenges and should be engaged intellectually and socially for the growth of the society by being creative.
                <br />

                Pursuing Excellence is our Vision with the aim of motivating and empowering our students to be lifelong learners and productive members of the society.


            </div>
        </div>
        <div className="flex bg-zinc-50 justify-end screen p-3 mb-4">
            <Link className="flex justify-center p-2 gap-2 rounded-xl bg-white border-[0.01rem] border-foreground/30 items-center" href={'/AboutCollege/EducationPolicyStatement'}>
                <h2 className="font-semibold">CMI Education Policy Statement</h2>
                <ChevronRight />
            </Link>
        </div>
    </main>
}