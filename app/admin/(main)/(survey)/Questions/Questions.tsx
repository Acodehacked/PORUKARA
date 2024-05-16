'use client'
import { useState } from 'react';
import Options from './Options';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
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
        let multipleanswers: string[] = [];
        // let Json = JSON.parse(Questions[quesno].options_list as string) as object;
        let Json = Questions[quesno].options_list as object;
        for (let q = 0; q < Responses.length; q++) {
            // let responsey: object = JSON.parse(Responses[q].responses as string) as object;
            let responsey: object = Responses[q].responses as object;
            let otype = Object.getOwnPropertyDescriptor(Json, `optiontype${option}`);

            if (otype?.value == 'select_text') {
                var value = Object.getOwnPropertyDescriptor(responsey, `${Questions[quesno].question_no}optionvalue`);
                var subtext = Object.getOwnPropertyDescriptor(responsey, `${Questions[quesno].question_no}optionvalueM`);
                if (subtext != undefined) {
                    if (subtext?.value != '') {
                        multipleanswers.push(subtext.value);
                    }
                }
            }
        }
        setmultipleAnswers(multipleanswers)
        setdetailsOpen(quesno);

    }
    return (
        <div className="flex md:flex-row flex-col w-full items-start relative">
            <div className='w-full flex max-w-[600px] mx-auto flex-col gap-2'>
                <h3>total Questions: <b>{Questions.length}</b></h3>
                <h3>total Responses: <b>{Responses.length}</b></h3>
                {Questions.map((item, index) => {
                    let row = [];
                    if (item.option_len != null) {
                        const len = item.option_len || 0;
                        for (let i = 0; i < len; i++) {
                            let Json = item.options_list as object;
                            // let Json = JSON.parse(item.options_list as string) as object;
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
                            let rev = ["SA", "A", "CS", "DA", "SDA"];
                            let revA = [0, 0, 0, 0, 0];
                            //not needed
                            var text = '';
                            for (let q = 0; q < Responses.length; q++) {
                                // let responsey: object = JSON.parse(Responses[q].responses as string) as object;
                                let responsey: object = Responses[q].responses as object;
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
                                    // if (subtext != undefined) { //4optionvalue0
                                    //     multiplevalues.push(subtext.value);
                                    // }
                                }
                                if (otype?.value == 'review') {
                                    var value = Object.getOwnPropertyDescriptor(responsey, `${item.question_no}optionvalue${i}`);
                                    console.log(value)
                                    if (value != undefined) {
                                        for (let re = 0; re < rev.length; re++) {
                                            if (value?.value == rev[re]) {
                                                revA[re] = revA[re] + 1;
                                            }
                                        };
                                    }
                                }

                            }
                            let percent = numberofpeople == 0 ? '0' : ((numberofpeople / Responses.length) * 100);
                            row.push(
                                <Options
                                    SetDetailsPage={SetDetailsPage}
                                    question={index}
                                    i={i}
                                    otitle={otitle}
                                    numberofpeople={Responses.length}
                                    percent={percent}
                                    reviews={revA}
                                    type={otype?.value == 'select_text' ? "extra" : otype?.value == 'review' ? 'review' : ''} />)
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