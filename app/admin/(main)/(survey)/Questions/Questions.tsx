'use client'
import { Button } from '@/components/ui/button';
import ProgressBar from "@ramonak/react-progress-bar";
import { GlobalAnimationVariant } from '@/constants';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { deleteQuestion, updatenummber } from './api';
import { PlusCircle, Trash2Icon, X } from 'lucide-react';
const QuestionsList = ({ Questions, Responses }: {
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
    Responses: {
        id: number;
        gen_id: string;
        status: "progress" | "started" | "completed" | null;
        responses: unknown;
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
    const AddNumber = async (quesno: number) => {
        const response = await updatenummber(quesno);
        if (response.error == null) {
            router.refresh()
        }
    }
    return (
        <>
            {Responses.map((response, index) => {
                // let responsey: object = JSON.parse(response.responses as unknown as string) as object;
                let responsey: object = response.responses as object;
                console.log(responsey)
                console.log(Object.getOwnPropertyDescriptors(responsey))

            })}
            <div className='w-full flex max-w-[600px] mx-auto flex-col gap-2'>{Questions.map((item, index) => {
                let row = [];
                if (item.option_len != null) {
                    const len = item.option_len || 0;
                    const alp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm']
                    for (let i = 0; i < len; i++) {
                        // let Json = item.options_list as object;
                        let Json = JSON.parse(item.options_list as string) as object;
                        let responses = '';

                        // {
                        //     '0optionvalue': 'ക്രിസ്ത്യന്‍',
                        //     '1response': 'ABin Antony',
                        //     '2optionvalue': 'mattullava',
                        //     '2optionvalueM': 'w456',
                        //     '3response': 'ഇല്ലാ',
                        //     '4optionvalue0': 'SA',
                        //     '5optionvalue0': 'car',
                        //     '5optionvalue1': 'bike',
                        //     '6optionvalue0': 'addu',
                        //     '6optionvalue0M': '345',
                        //     '6optionvalue1': 'kozhi',
                        //     '6optionvalue1M': '3451'
                        //   }



                        let otitle = Object.getOwnPropertyDescriptor(Json, `optiontitle${i}`);
                        let otype = Object.getOwnPropertyDescriptor(Json, `optiontype${i}`);
                        var numberofpeople = 0;
                        var multiplevalues = [];
                        var percent = '0%';
                        //not needed
                        var text = '';
                        for (let q = 0; q < Responses.length; q++) {
                            let responsey: object = JSON.parse(Responses[q].responses as string) as object;
                            text += Responses[q].responses;
                            if (otype?.value == 'select') {
                                var value = Object.getOwnPropertyDescriptor(responsey, `${item.question_no}optionvalue`);
                                if (value != undefined) {
                                    if (value.value == otitle?.value) {
                                        numberofpeople++;
                                    }
                                }
                            }
                            if (otype?.value == 'select_text') {
                                var value = Object.getOwnPropertyDescriptor(responsey, `${item.question_no}optionvalue`);
                                var subtext = Object.getOwnPropertyDescriptor(responsey, `${item.question_no}optionvalueM`);
                                if (value != undefined) {
                                    if (value.value == otitle?.value) {
                                        numberofpeople++;
                                    }
                                }
                                if(subtext != undefined){
                                    multiplevalues.push(subtext.value);
                                }
                            }
                        }
                        row.push(
                            <div key={i} className="bg-white flex justify-between items-center rounded-sm px-3 py-1 text-[11px] mt-2">
                                {/* {text} */}
                                <h2 className='mal text-[15px]'>{`${alp[i]}. ${otitle?.value}`}</h2>
                                {/* <span>{`${(numberofpeople/Responses.length)*100}% people done`}</span> */}
                                <ProgressBar className='w-[150px]' completed={(numberofpeople/Responses.length)*100} />
                                {/* <div className="flex gap-1">
                                    <div className="bg-blue-700 rounded-full px-3 py-1 text-[10px] text-white">Required</div>
                                    <div className="bg-blue-700 rounded-full px-3 py-1 text-[10px] text-white">{otype?.value}</div>
                                </div> */}
                            </div>
                        )
                    }
                }

                // console.log(item.options_list);
                return <div key={index} className="bg-white shadow-md w-full p-4 flex flex-col items-start rounded-xl">
                    <h3><span className="pe-2 text-[15px] mal">{item.question_no}.</span><span className="mal text-[16px]">{item.title}</span></h3>
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