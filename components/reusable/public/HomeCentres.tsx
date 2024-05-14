'use client'
import { HOMECENTERS } from '@/constants'
import Image from 'next/image';
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react';

const HomeCentres = () => {
    const [show, setshow] = useState(false)
    const [selected, setselected] = useState(0)
    function getRandomColor() {
        const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
        return color;
    }
    return (
        <div style={{ background: 'linear-gradient(0deg,rgba(255,255,255),rgba(255,255,255,0.8),rgba(255,255,255)),url("/assets/linesbg.jpg") no-repeat', backgroundSize: 'cover' }} className='screen relative flex flex-col items-center overflow-hidden'>
            <div className='text-secondary/10 select-none font-bold top-[-30px] left-0 text-[80px] absolute '>
                #Centres & Clubs
            </div>
            <h2 className='Centers mt-4 mb-3 text-[50px] font-semibold'>Centres & Clubs </h2>
            <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 px-4'>
                {HOMECENTERS.map((item, index) => {
                    return <motion.div onClick={() => {
                        setshow(true);
                        setselected(index)
                    }} initial={{ opacity: 0, y: 60 }} transition={{ duration: 0.3 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className=" hover:scale-105 transition-all  rounded-lg flex flex-col items-center"  key={index}>
                        <div className='w-full h-[150px] shadow-md rounded-md overflow-hidden'>
                            <Image src={`/assets/${item?.image}.jpeg`} style={{objectFit:'fill'}} className='w-full h-full' alt='' height={200} width={300} />
                        </div>
                        <h3 className='text-foreground text-[14px] font-semibold mt-3 text-center'>{item?.text}</h3>
                    </motion.div>
                })}
            </div>
            <AnimatePresence>
                {show && <motion.div onClick={() => {
                    setshow(false)
                }} initial={{ opacity: 0, pointerEvents: 'none' }} animate={{ pointerEvents: 'all', opacity: 1 }} exit={{ opacity: 0, pointerEvents: 'none' }} className='bg-[rgba(0,0,0,0.4)] flex justify-center items-center cursor-pointer fixed top-0 bottom-0 left-0 right-0 z-[99]'>
                    <div className='min-w-[150px] max-w-[600px] w-full bg-white rounded-sm p-4'>
                        <div className='flex justify-between'>
                            <h3 className="mb-2 text-[24px]">About this club</h3>
                            <X />
                        </div>
                        <p className='p-3'>{HOMECENTERS[selected]?.desc}</p>
                    </div>
                </motion.div>}
            </AnimatePresence>

        </div>
    )
}

export default HomeCentres