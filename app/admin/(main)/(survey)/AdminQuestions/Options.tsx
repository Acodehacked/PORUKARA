'use client'
import React from 'react'
import { motion } from 'framer-motion';
import ProgressBar from "@ramonak/react-progress-bar";
import { ArrowRight, ChevronRight } from 'lucide-react';

const Options = ({ question, i, otitle, percent, type, SetDetailsPage, numberofpeople, reviews }:
    {
        question: number,
        i: number,
        reviews: number[];
        numberofpeople: number,
        SetDetailsPage: (quesno: number, option: number) => void,
        type: "extra" | "review" | "",
        otitle: PropertyDescriptor | undefined,
        percent: number | string
    }) => {
    let rev = ["SA", "A", "CS", "DA", "SDA"];
    const alp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm','o','p','q']
    return (
        <>
            <div key={i} className="bg-white flex justify-between items-center rounded-sm px-3 py-1 text-[11px] mt-2">
                {/* {text} */}
                <h2 className='mal text-[15px]'>{`${alp[i]}. ${otitle?.value}`}</h2>
                {/* <span>{`${(numberofpeople/Responses.length)*100}% people done`}</span> */}
                <ProgressBar className='w-[150px]' completed={`${percent}`} />
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
                    return <div key={index} className="flex min-w-[170px] items-center">
                        <h3 className='font-semibold '>{r}</h3> : <div className="bg-purple-900 py-[0.10rem] px-2 text-white rounded-sm">
                            {`${(reviews[index] / numberofpeople) * 100}% people`}
                        </div>
                    </div>
                })}
            </div> : ''}
        </>
    )
}

export default Options