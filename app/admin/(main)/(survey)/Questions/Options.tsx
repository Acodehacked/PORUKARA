'use client'
import React from 'react'
import ProgressBar from "@ramonak/react-progress-bar";

const Options = ({i,otitle,numberofpeople,responselength}:
    {
        i:number,
        otitle:PropertyDescriptor | undefined,
        numberofpeople: number,
        responselength:number
    }) => {
    const alp = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm']
    return (
        <div key={i} className="bg-white flex justify-between items-center rounded-sm px-3 py-1 text-[11px] mt-2">
            {/* {text} */}
            <h2 className='mal text-[15px]'>{`${alp[i]}. ${otitle?.value}`}</h2>
            {/* <span>{`${(numberofpeople/Responses.length)*100}% people done`}</span> */}
            <ProgressBar className='w-[150px]' completed={(numberofpeople / responselength) * 100} />
            {/* <div className="flex gap-1">
                                    <div className="bg-blue-700 rounded-full px-3 py-1 text-[10px] text-white">Required</div>
                                    <div className="bg-blue-700 rounded-full px-3 py-1 text-[10px] text-white">{otype?.value}</div>
                                </div> */}
        </div>
    )
}

export default Options