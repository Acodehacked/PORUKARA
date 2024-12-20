'use client'
import { useState } from 'react';
import Options from './Options';
import * as XLSX from 'xlsx'
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, PlusCircle, Trash2Icon, X } from 'lucide-react';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { BiX } from 'react-icons/bi';
import { Advent_Pro } from 'next/font/google';
import { Button } from '@/components/ui/button';
import { deleteQuestion, ExportExcel, updatenummber } from './api';
import { useRouter } from 'next/navigation';
import { ENV } from '@/constants/places';
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
    console.log(Questions)
    console.log(Responses)
    const router = useRouter();
    const [deletedialogOpen, setdeletedialogOpen] = useState(-1);
    const [detailsOpen, setdetailsOpen] = useState(-1);
    const [detailssubOpen, setdetailssubOpen] = useState(-1);
    // "{"optiontitle0":"name","optiontype0":"text","optiontitle1":"house name","optiontype1":"text"}"
    TimeAgo.addDefaultLocale(en)

    const [multipleAnswers, setmultipleAnswers] = useState<string[]>([]);
    const DeleteEvent = async () => {
        const response = await deleteQuestion(deletedialogOpen);
        if (response?.error == null) {
            setdeletedialogOpen(-1)
            router.refresh();
            alert('deleted successfully');
        }
    }
    const downloadData = async () => {
        const { data } = await ExportExcel();
        var exportjson: any[] = [];
        var colno = 2;
        var headers: string[] = [
            'Sl No.',
            'Surveyor'
        ];
        Questions.forEach((question, index) => {
            if (question.type == 'yesno' || question.type == 'havenot') {
                colno++;
                headers.push(question.title);
            } else {
                if ((question?.option_len ?? 0) > 0) {
                    var otion = ENV == 'live' ? question.options_list as object : JSON.parse(question.options_list as unknown as string) as object;

                    var opttype = Object.getOwnPropertyDescriptor(otion, `optiontype0`);
                    if (opttype?.value == 'select') {
                        colno++;
                        headers.push(question.title);
                    } else {
                        for (var y = 0; y < (question?.option_len ?? 0); y++) {
                            var opttype = Object.getOwnPropertyDescriptor(otion, `optiontype${y}`);

                            if (y == 0) {

                            }
                        }
                    }
                } else {
                    colno++;
                }
            }
            // var options = ENV == 'live' ? question
        })
        data.forEach((reponse, index) => {
            var objects = [];
            // Object.defineProperty(objects, 'Sl No.', {
            //     value: index + 1,
            //     writable: true,
            //     enumerable: true,
            //     configurable: true
            // });
            // Object.defineProperty(objects, 'Surveyor', {
            //     value: reponse.author_id,
            //     writable: true,
            //     enumerable: true,
            //     configurable: true
            // });

            // exportjson.push(...objects);
        })

        console.log(exportjson)
        const worksheet = XLSX.utils.json_to_sheet(exportjson, {
            header: headers
        });
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    }
    const AddNumber = async (item: number) => {
        const response = await updatenummber(item);
        if (response?.error == null) {
            setdeletedialogOpen(-1)
            router.refresh();
        } else {
            alert('error');
        }
    }
    const SetDetailsPage = (quesno: number, option: number) => {
        setmultipleAnswers([]);
        console.log(`${Questions[quesno].question_no}${option}`)

        let multipleanswers: string[] = [];
        // let Json = ;
        let Json = ENV == 'live' ? Questions[quesno].options_list as object : JSON.parse(Questions[quesno].options_list as string) as object;
        for (let q = 0; q < Responses.length; q++) {
            // let responsey: object = ;
            let responsey: object = ENV == 'live' ? Responses[q].responses as object : JSON.parse(Responses[q].responses as string) as object;
            let otype = Object.getOwnPropertyDescriptor(Json, `optiontype${option}`);
            console.log('mutliple:' + otype?.value)
            if (otype?.value == 'select_text') {
                var value = Object.getOwnPropertyDescriptor(responsey, `${Questions[quesno].question_no}optionvalue`);
                var subtext = Object.getOwnPropertyDescriptor(responsey, `${Questions[quesno].question_no}optionvalueM`);
                if (subtext != undefined) {
                    if (subtext?.value != '') {
                        multipleanswers.push(subtext.value);
                    }
                }
            }
            if (otype?.value == 'text') {
                console.log(responsey)
                let ovalue = Object.getOwnPropertyDescriptor(responsey, `${Questions[quesno].question_no}optionvalue${option}`);
                console.log(ovalue?.value)
                if (ovalue != undefined) {
                    multipleanswers.push(ovalue?.value);
                }
            }
        }
        setmultipleAnswers(multipleanswers)
        setdetailsOpen(quesno);
    }
    const ShowtextAnswers = (quesno: number) => {
        setmultipleAnswers([]);
        let multipleanswers: string[] = [];
        // let Json = ;
        let Json = ENV == 'live' ? Questions[quesno].options_list as object : JSON.parse(Questions[quesno].options_list as string) as object;
        for (let q = 0; q < Responses.length; q++) {
            // let responsey: object = ;
            let responsey: object = ENV == 'live' ? Responses[q].responses as object : JSON.parse(Responses[q].responses as string) as object;
            let responsetext = Object.getOwnPropertyDescriptor(responsey, `${Questions[quesno].question_no}response`);
            console.log(responsey)
            // console.log(responsetext?.value);
            if (responsetext?.value != undefined) {
                multipleanswers.push(responsetext?.value)
            }
        }
        setmultipleAnswers(multipleanswers)
        setdetailsOpen(Questions[quesno].question_no);
    }

    return (
        <div className="flex md:flex-row flex-col w-full items-start relative">

            <div className='w-full flex max-w-[600px] mx-auto flex-col gap-2'>
                <div className="flex justify-between w-full items-center max-w-[600px] mx-auto ">
                    <span>Export Data :</span>
                    <Button onClick={() => downloadData()} className="text-white bg-green-600 hover:bg-green-700">Export Data to Excel</Button>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                    <h3 className='bg-violet-800 p-3 rounded-xl flex gap-3 items-center text-white'>total Questions: <b className='text-[30px]'>{Questions.length}</b></h3>
                    <h3 className='bg-green-800 p-3 rounded-xl flex gap-3 items-center text-white'>total Responses: <b className='text-[30px]'>{Responses.length}</b></h3>
                </div>
                {Questions.map((item, index) => {
                    let row = [];
                    let textvalues = [];


                    if (item.option_len != 0) {
                        const len = item.option_len ?? 0;
                        for (let i = 0; i < len; i++) {
                            let Json = ENV == 'live' ? item.options_list as object : JSON.parse(item.options_list as string) as object;
                            let responses = '';

                            // "{F"1optionvalue0":"fff",
                            // "1optionvalue1":"erfre1",
                            // "5optionvalue":"മുസ്ലിം",
                            // "7response":"34321",
                            // "8response":"rgbgf",
                            // "9optionvalue":"mattullava",
                            // "9optionvalueM":"fbr",
                            // "10response":"ഉണ്ട്",
                            // "11optionvalue0":"SDA",
                            // "12optionvalue0M":"",
                            // "12optionvalue1":"bike",
                            // "12optionvalue1M":"33",
                            // "16optionvalue0M":"",
                            // "16optionvalue1":"kozhi",
                            // "16optionvalue1M":"23"}"



                            let otitle = Object.getOwnPropertyDescriptor(Json, `optiontitle${i}`);
                            let otype = Object.getOwnPropertyDescriptor(Json, `optiontype${i}`);
                            var numberofpeople = 0;
                            var multiplevalues = [];
                            let numberonly = false;
                            let rev = ["SA", "A", "CS", "DA", "SDA"];
                            let revA = [0, 0, 0, 0, 0];
                            let average = 0;
                            //not needed
                            var text = '';
                            for (let q = 0; q < Responses.length; q++) {
                                let responsey: object = ENV == 'live' ? Responses[q].responses as object : JSON.parse(Responses[q].responses as string) as object;
                                // text += Responses[q].responses;

                                if (otype?.value == 'number') {
                                    numberonly = true;
                                    var value = Object.getOwnPropertyDescriptor(responsey, `${item.question_no}optionvalue${i}`);
                                    if(value?.value != '') numberofpeople += parseInt(value?.value ?? "0");
                                }
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
                                    if (value != undefined) {
                                        for (let re = 0; re < rev.length; re++) {
                                            if (value?.value == rev[re]) {
                                                revA[re] = revA[re] + 1;
                                            }
                                        };
                                    }
                                }
                                if (otype?.value == 'checkbox') {
                                    var value = Object.getOwnPropertyDescriptor(responsey, `${item.question_no}optionvalue${i}`);
                                    let adev = Object.getOwnPropertyDescriptor(responsey, `${item.question_no}optionvalue${i}M`);
                                    if (!Number.isNaN(adev?.value) && adev != undefined) {
                                        average = average + parseInt(adev?.value);
                                    }
                                    if (value != undefined) {
                                        if (value.value == otitle?.value) {
                                            numberofpeople++;
                                        }
                                    }
                                }

                            }
                            let percent = numberofpeople == 0 ? '0' : ((numberofpeople / Responses.length) * 100);

                            row.push(
                                <>
                                    <Options
                                        numeronly={numberonly}
                                        SetDetailsPage={SetDetailsPage}
                                        question={index}
                                        i={i}
                                        totalResponses={Responses.length}
                                        otitle={`${otitle?.value}`}
                                        numberofpeople={numberofpeople}
                                        percent={percent}
                                        reviews={revA}
                                        averagevalue={average ?? 0}
                                        type={otype?.value == 'select_text' || item.type == 'text' || otype?.value == 'text' ? "extra" : otype?.value == 'review' ? 'review' : otype?.value == 'checkbox' ? 'checkboxtype' : ' '} />
                                </>)
                        }
                    } else {
                        var numberofpeople = 0;
                        var yespeople = 0;
                        var nopeople = 0;
                        for (let q = 0; q < Responses.length; q++) {
                            let responsey: object = ENV == 'live' ? Responses[q].responses as object : JSON.parse(Responses[q].responses as string) as object;
                            var value1 = Object.getOwnPropertyDescriptor(responsey, `${item.question_no}response`);
                            if (value1?.value != undefined && value1?.value != null) {
                                if (value1?.value == 'ഉണ്ട്' || value1?.value == 'അതെ') {
                                    yespeople++;
                                }
                                if (value1?.value == 'ഇല്ലാ' || value1?.value == 'അല്ലാ') {
                                    nopeople++;
                                }
                                numberofpeople++;
                                // textvalues.push(value1?.value);
                                // if (value.value == otitle?.value) {
                                //     numberofpeople++;
                                // }
                            }

                        }
                        var yespercent = (yespeople / numberofpeople) * 100;
                        var nopercent = (nopeople / numberofpeople) * 100;
                        if (Questions[index].type == 'havenot') {
                            row.push(<>
                                <span className='text-[12px] text-blue-800'>total {numberofpeople} people attended</span>
                                <div className='flex justify-between p-3 gap-3'>
                                    <div className='w-full bg-zinc-100 p-3 font-bold mal rounded-xl'>{'ഉണ്ട്'} - {yespercent.toString().substring(0, 4)} % <span className='text-zinc-400 font-medium text-[13px]'>({yespeople} people)</span></div>
                                    <div className='w-full bg-zinc-100 p-3 font-bold mal rounded-xl'>{'ഇല്ലാ'} - {nopercent.toString().substring(0, 4)} % <span className='text-zinc-400 font-medium text-[13px]'>({nopeople} people)</span></div>
                                </div>
                            </>);
                        }
                        if (Questions[index].type == 'yesno') {
                            row.push(<div className='flex justify-between p-3 gap-3'>
                                <div className='w-full bg-zinc-100 p-3 font-bold mal rounded-xl'>{'അതെ'} - {yespercent.toString().substring(0, 4)} %</div>
                                <div className='w-full bg-zinc-100 p-3 font-bold mal rounded-xl'>{'അല്ലാ'} - {nopercent.toString().substring(0, 4)} %</div>
                            </div>);
                        }
                        if (Questions[index].type == 'text') {
                            row.push(
                                <motion.div onClick={() => {
                                    ShowtextAnswers(index)
                                }} whileTap={{ scale: 0.97 }} className='px-3 mt-2 flex items-center py-1 w-max hover:bg-sky-900 bg-sky-800 text-white select-none rounded-full cursor-pointer text-[13px]'>
                                    Open Answers&nbsp;<ChevronRight size={16} />
                                </motion.div>
                            );
                        }

                        // ShowtextAnswers
                        //  console.log(textvalues);
                    }

                    return <div key={index} className="bg-white shadow-md w-full p-4 flex flex-col items-start rounded-xl">
                        <h3><span className="pe-2 text-[15px] mal">{item.question_no}.</span><span className="mal text-[16px]">{item.title}</span></h3>
                        <div className="flex gap-2">
                            <div className="border-blue-300 rounded-full px-3 py-1 text-[10px] mt-2 text-zinc-600 border-[0.01rem]">{item.type}</div>
                            <div className='flex gap-2'>
                                {item.required ? <div className="border-blue-300 rounded-full px-3 py-1 text-[10px] mt-2 text-zinc-600 border-[0.01rem]">Required</div> : ''}
                                {/* <Button variant={'destructive'} onClick={() => {
                                    setdeletedialogOpen(item.question_no);
                                    DeleteEvent();
                                }} size={'icon'}><Trash2Icon className='text-white' /></Button>
                                <Button variant={'outline'} onClick={() => {
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
            </div >
            <AnimatePresence>
                {detailsOpen != -1 && <motion.div transition={{ stiffness: 1 }} initial={{ opacity: 0, x: 500 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 500 }} className='max-w-[350px] w-full h-screen bg-white md:sticky fixed left-0 md:rounded-sm rounded-none bottom-0 top-[0px] md:shadow-md shadow-2xl z-[9999]'>
                    <div className='px-5 py-2 flex w-full justify-between'>
                        <h2>Question: {detailsOpen + 1}</h2>
                        <div onClick={() => setdetailsOpen(-1)}>
                            <BiX size={30} className='p-3 bg-zinc-300 rounded-sm' />
                        </div>
                    </div>
                    <div className='h-full mt-2 flex flex-col p-2 gap-1 max-h-[90vh] overflow-y-scroll'>
                        {multipleAnswers.map((item, index) => {
                            const timeAgo = new TimeAgo('en-US')

                            return <div key={index} className='p-2 mal flex items-start w-full bg-zinc-50 rounded-sm'>
                                {index + 1}. <div>
                                    {item}
                                </div>
                            </div>
                        })}
                    </div>
                </motion.div>}
            </AnimatePresence>

        </div>
    )
}

export default QuestionsList