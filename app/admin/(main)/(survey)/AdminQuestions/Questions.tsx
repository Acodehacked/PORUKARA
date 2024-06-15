'use client'
import { useState } from 'react';
import Options from './Options';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Link from 'next/link';
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
    }[],

}) => {
    // const router = useRouter();
    // const [deletedialogOpen, setdeletedialogOpen] = useState(-1);
    const [detailsOpen, setdetailsOpen] = useState(-1);
    const [detailssubOpen, setdetailssubOpen] = useState(-1);
    const [multipleAnswers, setmultipleAnswers] = useState<string[]>([]);
    // const DeleteEvent = async () => {
    //     const response = await deleteQuestion(deletedialogOpen);
    //     if (response?.error == null) {
    //         setdeletedialogOpen(-1)
    //         router.refresh();
    //     } else {

    //     }
    // }
    const SetDetailsPage = (quesno: number, option: number) => {
        setmultipleAnswers([]);

    }
    return (
        <div className="flex md:flex-row flex-col w-full items-start relative">
            <div className='w-full flex max-w-[600px] mx-auto flex-col gap-2'>
                <h3>total Questions: <b>{Questions.length}</b></h3>
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

        </div>
    )
}

export default QuestionsList