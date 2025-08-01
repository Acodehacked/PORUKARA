'use client'
import 'boxicons/css/boxicons.css'
import AnimatedImage from '@/components/ui/AnimatedImage';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Computer, Library, LibraryBig } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { LABFACILITIES } from '@/constants';

export default function LabExtraDepartments() {


    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })
    var widthper = useTransform(scrollYProgress, [0, 1], [0, 100])

    return <>
        <motion.div
            className="z-[2] bg-white pb-10 mt-6">
            <span className="w-full flex justify-center text-[30px] p-2">Facilities</span>
            <div className='p-6 flex gap-6 mb-3 screen-lg sm:flex-row flex-col'>
                <div className='bg-slate-100 sm:w-[50%] w-full'></div>
                <div className='flex flex-col gap-2'>
                    {LABFACILITIES.map((item, index) => {
                        return <span key={index} className='flex gap-3 items-start'><i className='bx bxs-check-circle p-2 text-green-500 flex justify-center items-center rounded-full bg-zinc-50'></i><span className='font-semibold'>{item}</span></span>
                    })}
                </div>
            </div>
            <div className="w-full flex justify-center flex-col screen items-start">
                <motion.div
                    ref={ref}
                    style={{
                        scaleX: scrollYProgress
                    }}
                    transition={{
                        type: "spring",
                        damping: 10,
                        stiffness: 10
                    }}
                    className="bg-primary h-[5px] w-full rounded-full bg-gradient-to-r from-foreground to-primary" >&nbsp;</motion.div>
                <div className="flex md:flex-row flex-col">
                    <div className='p-3 mt-10'>
                        <div className="flex items-center gap-3">
                            <div className="bg-red-400 p-2 rounded-xl">
                                <LibraryBig className="text-white" />
                            </div>
                            <h4 className='text-[30px] font-semibold'>Library</h4>
                        </div>
                        <p className='p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam recusandae velit quam rerum fugit labore eligendi autem laborum perferendis, facilis inventore odit doloremque quis praesentium, aut amet porro cumque? Ipsam.</p>
                    </div>
                    <div className='w-full flex gap-2 justify-end items-center p-3'>
                        <AnimatedImage src={'/assets/library1.webp'} classname="rounded-sm transition-all hover:scale-105" delay={0} width={300} height={400} alt="lib1" />
                        <AnimatedImage src={'/assets/library2.webp'} classname="rounded-sm transition-all hover:scale-105" delay={0.2} width={300} height={400} alt="lib1" />
                        <AnimatedImage src={'/assets/library3.webp'} classname="rounded-sm transition-all hover:scale-105" delay={0.4} width={300} height={400} alt="lib1" />
                    </div>
                </div>
                <hr />
                <div className="flex md:flex-row flex-col">
                    <div className='p-3 mt-10'>
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-400 p-2 rounded-xl">
                                <Computer className="text-white" />
                            </div>
                            <h4 className='text-[30px] font-semibold'>Computer Lab</h4>
                        </div>
                        <p className='p-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam recusandae velit quam rerum fugit labore eligendi autem laborum perferendis, facilis inventore odit doloremque quis praesentium, aut amet porro cumque? Ipsam.</p>
                    </div>
                    <div className='w-full flex gap-2 justify-end items-center p-3'>
                        <AnimatedImage src={'/assets/computer_lab1.webp'} classname="rounded-sm transition-all hover:scale-105" delay={0} width={300} height={400} alt="lib1" />
                        <AnimatedImage src={'/assets/computer_lab2.webp'} classname="rounded-sm transition-all hover:scale-105" delay={0.2} width={300} height={400} alt="lib1" />
                        <AnimatedImage src={'/assets/computer_lab3.webp'} classname="rounded-sm transition-all hover:scale-105" delay={0.4} width={300} height={400} alt="lib1" />
                    </div>
                </div>
                <hr />
                <div className='flex md:flex-row flex-col w-full border-[0.001rem] border-slate-300'>
                    <div className="md:w-[60%] w-full p-4">
                        <h1 className='text-[25px] font-bold mt-3 mb-2'>About Labs</h1>
                        <p>Well equipped and state-of-the-art labs with updated technology are one of strongest assets of the college. The college takes pride at its labs that harbors favorable nurturing ground for personal growth, research and social progress. The maximum number of graduate students who return for post-graduation itself is an evidence of the quality of labs that the college offers. The college has computer lab and language lab to give practical training in respective field.</p>
                    </div>
                    <div className='bg-slate-200 p-5 md:w-[40%] w-full'>
                        <h2 className='text-[20px] text-primary-dark font-semibold'>Opening Hours</h2>
                        <div className='flex justify-between mt-2 gap-3'>
                            <p className='text-foreground flex flex-col justify-between h-full'>
                                <p>The Library is available for the use of all members of Fr. Porukara CMI College</p>
                                <div className='font-bold mt-5 p-3 bg-white/80 flex justify-between items-center'>Monday - Saturday<p className='w-max bg-slate-600 px-5 py-2 rounded-sm text-white'>9:00am - 5:00pm</p></div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </>
}