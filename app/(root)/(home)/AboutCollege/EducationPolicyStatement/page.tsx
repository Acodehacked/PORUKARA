import { ArrowRight, ChevronRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'CMI Education Policy',
    description: 'CMI Education Policy of Fr. Porukara CMI College,Champakulam'
}
export default function Page() {
    return <main>
        <div className="bg-foreground h-[350px]">

        </div>
        <div className="mt-[-150px] px-5 flex items-center">
            <h3 className="text-[30px] text-white w-full nd:mt-0  items-center text-center font-bold flex flex-col min-h-[200px]">
                <span>CMI Education Policy Statement</span>
                <span className="text-[15px] font-light">About College {'>'} CMI Education Policy Statement</span>
            </h3>
        </div>
        <div className="screen flex md:flex-row flex-col mt-3">

            <div className="w-full bg-zinc-50 pt-6 px-6 text-justify text-[15px]">
                <span className="text-[25px]">We</span>, the Carmelites of Mary Immaculate, after the example
                of our founder Saint Kuriakose Elias Chavara, consider
                education as integral formation of the human person for the
                fulfillment	of	his/her	individual	and		social	responsibilities.
                <br />
                Our Educational endeavours aim at forming leaders who  are
                intellectually competent, spiritually mature, morally  upright,
                psychologically integrated, physically healthy and socially
                acceptable; who will champion the cause of justice, love,
                truth and peace and who are ever open to further growth.
                The secret of the success of our educational institutions  is a
                community of teachers who are committed to their   vocation,
                professionally competent, morally upright, just and humane
                in dealings, and who grow in the true vision of education.
                We aspire towards creating a just human society where
                dignity of the human person is respected, where unjust
                structures are challenged, where our cultural heritage of
                ahimsa, religious harmony and national integration is upheld,
                and where the poor and the marginalized are specially taken
                care of.
                <br />
                We have to reach out to the families, primarily of the
                students, to assist them in their needs, to share in their joys
                and sorrows, and to help them experience love and freedom
                so that the students realize that our educational institutions
                are on extension of their homes.
                <br />
                Our institutions are open to all students irrespective of  caste
                and creed; they are accepted and cherished as they are and
                are helped to grow in their cultural, social and religious
                traditions. As they are privileged to be in our institutions, they
                will also have the right to get acquainted with the person of
                Jesus Christ and His gospel. Being institutions established by
                and for a majority community based on religion, they will
                give preference to Christians in admissions and appointments
                and have a special  concern for the faith formation of the
                Christian youth.
                <br />
                Our institutions have to be open to society at large by
                making their resources available for the ongoing education
                and non-formal teaching.
                For the realization of this CMI goal of education, we expect
                students, parents and teachers to share this vision and to
                cooperate with us whole-heartedly.
                <br />
                <br />
                Issued by
                <br />
                <br />
                <b> CMI General Department of Education Prior General’s House
                    <br />
                    Kochi- 682 011</b>
            </div>
            <div className="flex flex-col items-center md:max-w-[350px] w-full bg-white">
                <h5 className="text-[23px] pt-3 font-semibold px-2 text-center">Related Contents</h5>
                <Link href={'/Latest-Events'} className="pt-4 justify-between bg-black/10 mt-3 pb-4 px-5 text-[15px] flex w-full">
                    Latest Events <ChevronRight />
                </Link>
                <Link href={'/Announcements'} className="pt-4 justify-between bg-black/10 mt-3 pb-4 px-5 text-[15px] flex w-full">
                    Announcements <ChevronRight />
                </Link>
            </div>
        </div>
        <div className="flex bg-zinc-50 justify-end screen p-3 mb-4">
            <Link className="flex justify-center p-2 gap-2 rounded-xl bg-white border-[0.01rem] border-foreground/30 items-center" href={'/AboutCollege/Management'}>
                <h2 className="font-semibold">Management</h2>
                <ChevronRight />
            </Link>
        </div>
    </main>
}