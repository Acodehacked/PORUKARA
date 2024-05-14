'use client'
import { Button } from '@/components/ui/button';
import { GlobalAnimationVariant } from '@/constants';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { deleteQuestion, updatenummber } from './api';
import { PlusCircle, Trash2Icon, X } from 'lucide-react';
const QuestionsList = ({ Questions }: {
    Questions: {
        type: "null" | "select" | "text" | "checkbox" | "int" | "yesno" | "havenot" | null;
        id: number;
        question_no: number;
        title: string;
        option_len: number | null;
        options_list: unknown;
        required: boolean;
        added_on: Date | null;
    }[]
}) => {
    const router = useRouter();
    const [deletedialogOpen, setdeletedialogOpen] = useState(-1);
    const DeleteEvent = async () => {
        const response = await deleteQuestion(deletedialogOpen);
        if (response?.error == null) {
            setdeletedialogOpen(-1)
            router.refresh();
        } else {

        }
    }
    const AddNumber = async (quesno:number) =>{
        const response = await updatenummber(quesno);
        if(response.error == null){
            router.refresh()
        }
    }
    return (
        <>
            <div className='w-full'>{Questions.map((item, index) => {
                let row = [];
                if (item.option_len != null) {
                    const len = item.option_len || 0;
                    const alp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm']
                    for (let i = 0; i < len; i++) {
                        let Json = item.options_list as object;

                        let otitle = Object.getOwnPropertyDescriptor(Json, `optiontitle${i}`);
                        let otype = Object.getOwnPropertyDescriptor(Json, `optiontype${i}`);
                        row.push(
                            <div key={i} className="bg-black flex justify-between items-center rounded-sm px-3 py-1 text-[11px] mt-2 text-white">
                                <h2>{`${alp[i]}. ${otitle?.value}`}</h2>
                                <div className="flex gap-1">
                                    <div className="bg-blue-700 rounded-full px-3 py-1 text-[11px] text-white">Required</div>
                                    <div className="bg-blue-700 rounded-full px-3 py-1 text-[11px] text-white">{otype?.value}</div>
                                </div>
                            </div>
                        )
                    }
                }

                // console.log(item.options_list);
                return <div key={index} className="bg-zinc-200 w-full p-2 flex flex-col items-start rounded-xl">
                    <h3><span className="pe-2 text-[22px] font-bold">{item.question_no}.</span>{item.title}</h3>
                    <div className="flex gap-2">
                        <div className="bg-blue-700 rounded-full px-3 py-1 text-[11px] mt-2 text-white">{item.type}</div>
                        <div className='flex gap-2'>
                            {item.required ? <div className="bg-blue-700 rounded-full px-3 py-1 text-[11px] mt-2 text-white">Required</div> : ''}
                            <Button variant={'destructive'} onClick={()=>{
                                setdeletedialogOpen(item.question_no);
                            }} size={'icon'}><Trash2Icon className='text-white' /></Button>
                            <Button variant={'outline'} onClick={()=>{
                                AddNumber(item.question_no)
                            }} size={'icon'}><PlusCircle className='' /></Button>
                        </div>
                    </div>
                    <div className="ps-3 w-full flex flex-col mt-3">
                        {item.option_len != null ? <h2 className="text-[11px]">{item?.option_len > 0 ? 'Sub Questions' : ''}</h2> : ''}
                        {row}
                    </div>
                </div>
            })}</div>
            <AnimatePresence>
                {deletedialogOpen != -1 && <motion.div transition={{ duration: 0.1 }} variants={GlobalAnimationVariant} initial="hidden" animate="visible" exit="hidden" className='fixed top-0 z-[40] bottom-0 left-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)]'>
                    <div className='bg-white rounded-lg p-2'>
                        <div className='flex justify-between'>
                            <h2>Alert</h2>
                            <X onClick={() => setdeletedialogOpen(-1)} />
                        </div>
                        <div className='px-3 py-6'>
                            <h3 className='text-red-400 font-bold'>Are you sure about deleting question number {deletedialogOpen}? </h3>
                        </div>
                        <div className='flex justify-end gap-3'>
                            <Button variant={'secondary'} className='text-black bg-zinc-200' onClick={() => setdeletedialogOpen(-1)}>Cancel</Button>
                            <Button onClick={() => DeleteEvent()} variant={'destructive'}>Delete</Button>
                        </div>
                    </div>
                </motion.div>}
            </AnimatePresence>
        </>
    )
}

export default QuestionsList