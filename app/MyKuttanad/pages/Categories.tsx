'use client'
import {motion} from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react'
import { X } from 'lucide-react';

const Categories = () => {
    const [dialog, setdialog] = useState(false);
    return (
        <>
            <div className="min-h-[500px] pb-[60px]">
                <div className="flex flex-col  mt-3">
                    <h2 className="font-semibold md:px-6 px-4 py-3">Related Categories</h2>
                    <div className="bg-white flex w- flex-col rounded-md overflow- py-3 md:px-6 px-4 shadow-md gap-3">
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {
                    dialog && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 px-5 flex items-center justify-center z-[9999]'>
                        <div className='max-w-[500px] w-full flex flex-col items-center rounded-sm bg-white px-3 py-2'>
                            <div className='flex justify-between w-full'>
                                <div className='w-full flex items-center gap-2'>
                                    <Image src={'/assets/app/app_logo.webp'} width={20} height={20} alt="Kuttanad App" />
                                    <h2>Please download our app</h2>
                                </div>
                                <div onClick={() => {
                                    setdialog(false);
                                }} className='p-2 rounded-sm hover:bg-slate-300'>
                                    <X />
                                </div>
                            </div>
                            <Image src={'/assets/app/apps.webp'} width={300} height={100} alt="Kuttanad App" />
                            <Image src={'/assets/app/google_play.webp'} width={250} height={100} alt="Kuttanad App" />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default Categories