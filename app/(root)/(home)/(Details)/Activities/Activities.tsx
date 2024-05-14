'use client'
import { ACTIVITIES } from '@/constants'
import Link from 'next/link'
import React from 'react'

const Activities = () => {
  return (
    <div className='screen  flex flex-col items-center gap-2 mt-[50px] p-4'>
            <div className='flex justify-center items-center w-full ' >
                <h2 className='text-[30px] mt-4 mb-3 font-bold text-white'>Activities</h2>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 justify-center w-full gap-5'>
                {ACTIVITIES.map((item, index) => {
                    return <Link href={item.path} className='mb-3 select-none cursor-pointer text-center min-w-[50px] w-full px-5 py-4 rounded-sm mt-2 text-[18px] bg-white shadow-lg text-foreground' key={index}>
                        <h4 className='text-[19px] font-semibold mb-1'>{item.title}</h4>
                        <hr />
                        <p className='text-[15px] mt-2'>{item.desc}</p>
                    </Link>
                })}
            </div>
         
        </div>
  )
}

export default Activities