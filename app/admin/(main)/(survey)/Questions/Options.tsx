'use client'
import React from 'react'
import { motion } from 'framer-motion';
import ProgressBar from "@ramonak/react-progress-bar";
import { ArrowRight, ChevronRight } from 'lucide-react';
import { int } from 'drizzle-orm/mysql-core';

const Options = ({ numeronly, question, i, otitle, percent, type, SetDetailsPage, numberofpeople, totalResponses, reviews, averagevalue }:
    {
        numeronly: boolean,
        question: number,
        i: number,
        reviews: number[];
        numberofpeople: number,
        totalResponses: number,
        SetDetailsPage: (quesno: number, option: number) => void,
        type: "extra" | "review" | " " | "checkboxtype",
        otitle: string,
        percent: number | string,
        averagevalue?: number | undefined
    }) => {
    let rev = ["SA", "A", "CS", "DA", "SDA"];
    const alp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'o', 'p', 'q']
    return (
        <>
            <div key={i} className="bg-white flex flex-col justify-between items-start rounded-sm px-3 py-1 text-[11px] mt-2">
                {/* {text} */}
                <h2 className='mal text-[15px]'>{`${alp[i]}. ${otitle}`}</h2>
                {type == " " && <div className='flex w-full justify-between my-1 p-3 rounded-sm bg-zinc-200'>
                    {numeronly == false && <h3><b>{`${percent.toString().substring(0, 4)}%`}</b> people answered</h3>}
                    <h3>Total <b>{numberofpeople}</b> people choosed</h3>
                </div>}
                {type == "checkboxtype" && <div className='flex w-full justify-between my-1 p-3 rounded-sm bg-zinc-200'>
                    {/* <h3><b>{`${percent.toString().substring(0, 4)}%`}</b> people answered</h3> */}
                    <h3>Total <b>{numberofpeople}</b> people choosed</h3>
                    <h4 className='text-white bg-foreground p-1 rounded-sm'>Total {Number.isNaN(averagevalue) ? 0 : averagevalue}</h4>
                </div>}
                {/* <span>{`${(numberofpeople/Responses.length)*100}% people done`}</span> */}
                {/* <ProgressBar className='w-[150px]' completed={`${percent.toString().substring(0,4)}`} /> */}
                {/* <div className="flex gap-1">
                                    <div className="bg-blue-700 rounded-full px-3 py-1 text-[10px] text-white">Required</div>
                                    <div className="bg-blue-700 rounded-full px-3 py-1 text-[10px] text-white">{otype?.value}</div>
                                </div> */}
            </div>
            {type == 'extra' ? <motion.div onClick={() => {
                SetDetailsPage(question, i)
            }} whileTap={{ scale: 0.97 }} className='px-3 mt-2 flex items-center py-1 w-max hover:bg-sky-900 bg-sky-800 text-white select-none rounded-full cursor-pointer text-[13px]'>
                Open Answers&nbsp;<ChevronRight size={16} />
            </motion.div> : ''}
            {type == 'review' ? <div className='flex flex-wrap gap-3 px-6'>
                {rev.map((r, index) => {
                    var per = (reviews[index] / totalResponses) * 100;
                    return <div key={index} className="flex min-w-[50px] items-center">
                        <h3 className='font-semibold '>{r}</h3> : <div className="bg-purple-900 py-[0.10rem] px-2 text-white rounded-sm">
                            {`${per.toString().substring(0, 4)}%`}
                        </div>
                    </div>
                })}
            </div> : ''}

        </>
    )
}

export default Options