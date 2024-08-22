'use client'
import { motion } from 'framer-motion';
import { ENV } from "@/constants/places"
import { AdminLoginTable, ClientResponses } from "@/db/schema"
import en from 'javascript-time-ago/locale/en'

import TimeAgo from "javascript-time-ago"
import { useContext, useState } from "react"
import { deleteOneSubmission } from "./api"
import { SnackbarContextProvider } from "@/lib/SnackbarProvider"
import SnackbarContext from "@/lib/Snackbar-context"
import { FaTrashAlt } from "react-icons/fa"
import { BiLoaderAlt, BiLoaderCircle } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import moment from 'moment-timezone';

export const Submitted = ({ responses,permission }: {
    permission: boolean,
    responses: typeof ClientResponses.$inferSelect[]
}) => {
    moment().tz("Asia/Kolkata").format();
    console.log(responses)
    console.log(permission)
    const router = useRouter();
    const [loading, setloading] = useState(false);
    const snackctx = useContext(SnackbarContext);
    const deleteReponses = async (id: number) => {
        const c = confirm('Do you really want to delete this response. It can\'t be undo again!');
        if (c) {
            setloading(true);
            const r = await deleteOneSubmission(id);
            if (r) {
                snackctx.displayMsg('Response Deleted!');
                router.refresh();
            }
            setloading(false);
        }
    }
    return <div className="flex flex-col gap-2 w-full p-3">
        {responses.map((item, index) => {
            var respon = ENV == 'live' ? item.responses as object : JSON.parse(item.responses as unknown as string) as object;
            var name = Object.getOwnPropertyDescriptor(respon, '1optionvalue0');
            var add = Object.getOwnPropertyDescriptor(respon, '1optionvalue1');
            return <div className="bg-white p-2 rounded-xl border-[0.01rem] border-zinc-400" key={index}>
                <div className="flex gap-2 items-center">
                    <span>{index + 1}.  </span>
                    <div className="flex flex-col">
                        <h3 className="text-[18px] p-0 m-0">{name?.value != undefined ? name.value : '-none-'}</h3>
                        <h3 className="text-[12px] m-0 p-0 ">{add?.value != undefined ? add.value : '-none-'}</h3>
                    </div>
                    <span className="ms-auto">{moment(item.added_on.toISOString()).fromNow()}</span>
                    {permission == true && <button className="p-2 hover:bg-zinc-200 text-red-800" onClick={() => deleteReponses(item.id)}><FaTrashAlt /></button>}
                    
                </div>
            </div>
        })}
        {loading && <motion.div initial={{ opacity: 0, pointerEvents: 'none' }} animate={{ opacity: 1, pointerEvents: 'all' }} className='fixed z-[100] bg-black/30 left-0 right-0 bottom-0 top-0 flex items-center justify-center'>
            {loading && <motion.div initial={{ opacity: 0, pointerEvents: 'none' }} animate={{ opacity: 1, pointerEvents: 'all' }} className='bg-white p-6 rounded-xl '>
                <BiLoaderAlt className='text-[40px] animate-spin ease-in-out' />
            </motion.div>}
        </motion.div>}
    </div>
}