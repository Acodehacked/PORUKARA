import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
    title: 'Admissions | Fr. Porukara CMI College',
    description: 'Fr Porukara College Admission Opened. Apply for BCA, B.Com, BA and other 4 year UG Programmes. Admissions Open Admissions Open for BCA, BCOM with Finance and Taxation, BCOM with Computer Application, BA English Contact: 9446249412',
    keywords: 'Fr. Porukara CMI College, BCA Colleges,Best BCA, B.Com COllege in kerala,Colleges in Kerala,Best Colleges in Kuttanad, Best College in Alappuzha,BCA,B.Com',
    openGraph:{
        images: ["https://porukaracollege.in/assets/thumbnail.webp"],
    }
}
export default function Page() {
    return <main>
        <div className="bg-foreground h-[350px]">

        </div>
        <div className="screen mt-[-150px] flex md:flex-row flex-col">

            <div className="w-full  px-6">

                <Form />
                <p className="w-full text-center  pt-2 mb-10  text-[15px]">
                    Admissions Open
                    Admissions Open for BCA, BCOM with Finance and Taxation, BCOM with Computer Application, BA English Contact: 9446249412
                </p>
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