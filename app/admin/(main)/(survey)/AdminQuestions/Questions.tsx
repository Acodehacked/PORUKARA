'use client'
import { useState } from 'react';
import Options from './Options';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CloseSurvey, DeleteAllResponses, GetPermission, OpenSurvey } from './api';
import { useRouter } from 'next/navigation';
import { AdminLoginTable } from '@/db/schema';
import { cn } from '@/lib/utils';
import { BiLoaderAlt } from 'react-icons/bi';
import { Close } from '@radix-ui/react-dialog';
const QuestionsList = ({ Questions, Admins }: {
    Admins: typeof AdminLoginTable.$inferSelect,
    Questions: {
        type: "null" | "select" | "text" | "checkbox" | "int" | "yesno" | "havenot" | null;
        id: number;
        question_no: number;
        title: string;
        option_len: number | null;
        options_list: unknown;
        required: boolean;
        added_on: Date | null;
    }[],

}) => {
    const router = useRouter();
    // const [deletedialogOpen, setdeletedialogOpen] = useState(-1);
    const [detailsOpen, setdetailsOpen] = useState(-1);
    const [loading, setloading] = useState(false);
    const [permission, setpermission] = useState(Admins.permission);
    const [detailssubOpen, setdetailssubOpen] = useState(-1);
    const [multipleAnswers, setmultipleAnswers] = useState<string[]>([]);
    const OpenEvent = async () => {
        setloading(true)
        const response = await OpenSurvey();
        if (response?.error == null) {
            router.refresh();
        }
        setloading(false);
        GetAllData()

    }
    const GetAllData = async () => {
        const response = await GetPermission();
        setpermission(response);
    }
    const CloseEvent = async () => {
        setloading(true)
        const response = await CloseSurvey();
        if (response?.error == null) {
            router.refresh();
        }
        setloading(false);
        GetAllData()
    }
    const SetDetailsPage = (quesno: number, option: number) => {
        setmultipleAnswers([]);

    }
    const handleDelete = async () => {
        const response = await DeleteAllResponses();
        if (response.error == null) {
            router.refresh();
        }
    }
    return (
        <div className="flex md:flex-row flex-col w-full items-start relative">
            <div className='w-full flex max-w-[600px] mx-auto flex-col gap-2'>
                <div className='flex justify-between p-2 w-full items-center'>
                    <h3>total Questions: <b>{Questions.length}</b></h3>
                    <Button className='w-auto' onClick={() => handleDelete()}>Delete All Responses</Button>
                </div>
                <div className={cn('bg-green-400 items-center flex justify-between rounded-xl text-black w-full p-3', permission == false ? 'bg-red-500 text-white' : '')}>
                    <span>{permission ? 'Web Survey is Open Now' : 'Web survey is closed Now'}</span>
                    <Button onClick={()=>{
                        if(permission){
                            CloseEvent();
                        }else{
                            OpenEvent();
                        }
                    }} className='bg-white text-black px-4 py-2 rounded-sm hover:bg-zinc-200'>{permission ? 'Stop Survey' : 'Start Survey'}</Button>
                </div>
                {Questions.map((item, index) => {
                    if (item.option_len != null) {
                        const len = item.option_len || 0;

                    }

                    // console.log(item.options_list);
                    return <div key={index} className="bg-white shadow-md w-full p-4 flex flex-col items-start rounded-xl">
                        <div className='flex justify-between w-full'>
                            <h3>
                                <span className="pe-2 text-[15px] mal">{item.question_no}.</span>
                                <span className="mal text-[16px]">{item.title}</span>
                            </h3>
                            <Link href={`/admin/EditQuestion/${item.id}`}><i className='bx bx-edit'></i></Link>
                        </div>
                        <div className="flex gap-2">
                            <div className="border-blue-300 rounded-full px-3 py-1 text-[10px] mt-2 text-zinc-600 border-[0.01rem]">{item.type}</div>
                            <div className='flex gap-2'>
                                {item.required ? <div className="border-blue-300 rounded-full px-3 py-1 text-[10px] mt-2 text-zinc-600 border-[0.01rem]">Required</div> : ''}
                                {/* <Button variant={'destructive'} onClick={()=>{
                                    setdeletedialogOpen(item.question_no);
                                }} size={'icon'}><Trash2Icon className='text-white' /></Button>
                                <Button variant={'outline'} onClick={()=>{
                                    AddNumber(item.question_no)
                                }} size={'icon'}><PlusCircle className='' /></Button> */}
                            </div>
                        </div>
                        <div className="ps-3 w-full flex flex-col mt-3">
                            {/* {item.option_len != null ? <h2 className="text-[11px]">{item?.option_len > 0 ? 'Sub Questions' : ''}</h2> : ''} */}
                        </div>
                    </div>
                })}
            </div>
            <AnimatePresence>
                {detailsOpen != -1 && <motion.div transition={{ stiffness: 1 }} initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 500 }} className='max-w-[350px] w-full h-screen bg-white md:sticky fixed left-0 md:rounded-sm rounded-none bottom-0 top-[0px] md:shadow-md shadow-2xl'>
                    <div className='px-5 py-2 flex w-full justify-between'>
                        <h2>Question: {detailsOpen + 1}</h2>
                        <div onClick={() => setdetailsOpen(-1)}>
                            <X />
                        </div>
                    </div>
                    <div className='h-full mt-2 flex flex-col p-2 gap-1 max-h-[90vh] overflow-y-scroll'>
                        {multipleAnswers.map((item, index) => {
                            return <div key={index} className='p-2 bg-zinc-50 rounded-sm'>
                                {item}
                            </div>
                        })}
                    </div>
                </motion.div>}
            </AnimatePresence>
            <AnimatePresence>
                {loading && <motion.div initial={{ opacity: 0, pointerEvents: 'none' }} animate={{ opacity: 1, pointerEvents: 'all' }} className='fixed z-[100] bg-black/30 left-0 right-0 bottom-0 top-0 flex items-center justify-center'>
                    {loading && <motion.div initial={{ opacity: 0, pointerEvents: 'none' }} animate={{ opacity: 1, pointerEvents: 'all' }} className='bg-white p-6 rounded-xl '>
                        <BiLoaderAlt className='text-[40px] animate-spin ease-in-out' />
                    </motion.div>}
                </motion.div>}
            </AnimatePresence>
        </div>
    )
}

export default QuestionsList