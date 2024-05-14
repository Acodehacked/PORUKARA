import { ArrowRight, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Fr. Porukara CMI College,Champakulam, Gagultha Monastry Campus,Champakulam, Alappuzha District,Kerala, 688505, Phone: 0477-2737399, Email:porukaracmicollege@gmail.com, Website:https://www.porukaracollege.in'
}
export default function Page() {
    return <main>
        <div className="bg-foreground h-[350px]">

        </div>
        <div className="mt-[-150px] px-5 flex items-center">
            <h3 className="text-[30px] text-white w-full nd:mt-0  items-center text-center font-bold flex flex-col min-h-[200px]">
                <span>Contact</span>
                <span className="text-[15px] font-light">About College {'>'} Contact</span>
            </h3>
        </div>
        <div className="screen flex md:flex-row flex-col mt-3">

            <div className="w-full bg-white pt-6 px-6  text-[18px]">
                <h1 className="ps-2 text-secondary mt-3 mb-4">Address</h1>
                <div className="pt-2 px-4 my-5 mt-5">
                    <h2 className="text-[22px] m-0 p-0 ">Fr. Porukara CMI College of Advanced Studies</h2><br />
                    <span className="text-[14px]">(Affiliated to Mahatma Gandhi University & Managed by CMI Fathers)</span><br />
                    Gagultha Monastry Campus,<br /> Champakulam, Alappuzha District,<br /> Kerala, 688505
                </div>
                <h1 className="ps-2 text-secondary mt-3 mb-4">Contact</h1>
                <div className="pt-2 px-4 mt-1 mb-5">
                    Phone : 0477-2737399 <br />
                    Email : <Link className="hover:underline" href={'mailto:porukaracmicollege@gmail.com'}>porukaracmicollege@gmail.com</Link> <br />
                    Website : <Link className="hover:underline" href='https://porukaracollege.in'>https://www.porukaracollege.in</Link>
                </div>
                <div className="bg-foreground text-white p-3 mt-4 text-center flex justify-center">
                    Location Map
                </div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15744.267797482053!2d76.41671018593155!3d9.415526815875735!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b089d0008c67519%3A0x1865d4282cb17cc5!2sFr.Porukara%20CMI%20College%20Of%20Advanced%20Studies!5e0!3m2!1sen!2sin!4v1715431388030!5m2!1sen!2sin" className="border-0 w-full h-[450px]" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="flex flex-col sm:mt-0 mt-3 items-center md:max-w-[350px] w-full bg-white">
                <h5 className="text-[23px] pt-3 font-semibold px-2 text-center">Related Contents</h5>
                <Link href={'/Latest-Events'} className="pt-4 justify-between bg-black/10 mt-3 pb-4 px-5 text-[15px] flex w-full">
                    Latest Events <ChevronRight />
                </Link>
                <Link href={'/Announcements'} className="pt-4 justify-between bg-black/10 mt-3 pb-4 px-5 text-[15px] flex w-full">
                    Announcements <ChevronRight />
                </Link>
                <Link href={'/Admission'} className="pt-4 justify-between bg-black/10 mt-3 pb-4 px-5 text-[15px] flex w-full">
                    Admission <ChevronRight />
                </Link>
                <Link href={'/AboutCollege'} className="pt-4 justify-between bg-black/10 mt-3 pb-4 px-5 text-[15px] flex w-full">
                    About the College <ChevronRight />
                </Link>
            </div>
        </div>
        {/* <div className="flex bg-zinc-50 justify-end screen p-3 mb-4">
            <Link className="flex justify-center p-2 gap-2 rounded-xl bg-white border-[0.01rem] border-foreground/30 items-center" href={'/AboutCollege/Management'}>
                <h2 className="font-semibold">Management</h2>
                <ChevronRight />
            </Link>
        </div> */}
    </main>
}