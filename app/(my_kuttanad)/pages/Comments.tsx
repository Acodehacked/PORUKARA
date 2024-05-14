'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import Image from 'next/image'
import { X } from 'lucide-react'

const Comments = () => {
    const [dialog, setdialog] = useState(false);
    return (
        <>
            <div className="">
                <div className="flex flex-col  mt-3">
                    <h2 className="font-semibold md:px-6 px-4 py-3">Reviews & Ratings</h2>
                    <div className="bg-white flex w- flex-col rounded-md overflow- py-3 md:px-6 px-4 shadow-md gap-3">
                        <div className="max-w-[500px] w-full flex gap-3 justify-start items-start">
                            <div style={{ width: '40px', height: '40px' }} className="px-4 flex items-center justify-center rounded-full h-[40px] w-[40px] bg-blue-600 text-white font-bold">
                                AB
                            </div>
                            <div className="w-full">
                                <Input placeholder="Enter your review" className="w-full" />
                            </div>
                            <Button onClick={() => {
                                setdialog(true)
                            }}>Send</Button>
                        </div>
                        <hr />
                        <div className='px-2 py-2 mt-2 bg-zinc-50 rounded-lg flex flex-col gap-6'>
                            <Comment name="abin antony" message="nice place" rating="3.5" />
                            <Comment name="Solly antony" message="Must watch place" rating="5.0" />
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {
                    dialog && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 px-5 flex items-center justify-center z-[9999]'>
                        <div className='max-w-[500px] w-full flex flex-col items-center rounded-sm bg-white px-3 py-2'>
                            <div className='flex justify-between w-full'>
                                <div className='w-full flex items-center gap-2'>
                                    <Image src={'/assets/app/app_logo.png'} width={20} height={20} alt="Kuttanad App" />
                                    <h2>Please download our app</h2>
                                </div>
                                <div onClick={() => {
                                    setdialog(false);
                                }} className='p-2 rounded-sm hover:bg-slate-300'>
                                    <X />
                                </div>
                            </div>
                            <Image src={'/assets/app/apps.webp'} width={300} height={100} alt="Kuttanad App" />
                            <Image src={'/assets/app/google_play.png'} width={250} height={100} alt="Kuttanad App" />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export const Comment = ({ name, message, rating }: { name: string, message: string, rating?: string }) => {
    return <div className="max-w-[500px] w-full flex gap-3 justify-start items-start">
        <div style={{ width: '40px', height: '40px' }} className="px-4 flex items-center justify-center rounded-full h-[40px] w-[40px] bg-blue-600 text-white font-bold">
            {name.slice(0, 2).toUpperCase()}
        </div>
        <div className="w-full flex flex-col">
            <div className='flex gap-2 items-center'>
                <h2 className='text-[12px] font-semibold'>@{name}</h2>
                <span className='text-[13px] text-zinc-500'>1 hour ago</span>
            </div>
            <div className='flex w-full justify-between'>
                <p className='text-[18px]'>{message}</p>
                <div className='flex gap-2 items-center'>
                    <div className='flex gap-2 items-center'>
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                        <FaStar className="text-yellow-400" />
                    </div>
                    <h2>{rating}</h2>
                </div>
            </div>
        </div>
    </div>
}

export default Comments