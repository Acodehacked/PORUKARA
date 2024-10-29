'use client'
import { AdminLoginTable, ClientResponses } from "@/db/schema";
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'
import { useEffect, useState } from "react";
import { getResponses } from "./api";
export const Submissions = ({
    allAdmins,
    Responses,
}: {
    allAdmins: typeof AdminLoginTable.$inferSelect[],
    Responses: typeof ClientResponses.$inferSelect[]
}) => {
    TimeAgo.addDefaultLocale(en)
    const [Rsesponses, setResponses] = useState(Responses);
    // Create formatter (English).
    const timeAgo = new TimeAgo('en-US')

    const GetAllData = async () => {
        const r = await getResponses();
        setResponses(r.data);

        setTimeout(() => {
            GetAllData();
        }, 20000);
    }
    useEffect(() => {
        setTimeout(() => {
            GetAllData();
        }, 3000);
    }, [GetAllData]);
    return <div className="w-full">
        <div className="flex justify-between">
            <div className="flex flex-col">
                <h2 className="text-[23px]">Subsmissions</h2>
                <span>by admins</span>
            </div>
            <span>Total : {Rsesponses.length}</span>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-3 w-full gap-3">
            {allAdmins.map((item, index) => {
                const r = Rsesponses.filter((ri) => ri.author_id == item.email);
                return <div className="bg-white border-[0.01rem] border-black/20 p-3  rounded-sm shadow-sm flex flex-col gap-2" key={index}>
                    <div className="flex gap-2 items-center">
                        <i className='text-[23px] text-zinc-400 bx bxs-user-rectangle' ></i>
                        <div className="flex flex-col gap-0">
                            <h3 className="font-medium p-0 m-0">{item.name}</h3>
                            <span className="text-[10px] ">{item.email}</span>
                        </div>
                    </div>
                    <div className="p-2 rounded-sm bg-zinc-100">
                        <span className="text-[14px] text-green-800 flex items-center gap-1">submissions : <span className="text-[19px] font-semibold">{r.length}</span></span>
                        <span className="text-[14px] text-green-800 flex items-center gap-1">last submission : {r.length == 0 ? 'N/A' : timeAgo.format(new Date(r[r.length - 1].added_on.toISOString() ?? ''))}
                        </span>
                    </div>
                </div>
            })}
        </div>
    </div>
}