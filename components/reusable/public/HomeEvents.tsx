"use client"
import Link from 'next/link'
import {
    Carousel, CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import { ChevronRight, DownloadCloud } from 'lucide-react';
import { CORE_VALUES, DEMOEVENTS } from '@/constants';
import { motion, useScroll, useTransform } from 'framer-motion'
import { BiLinkExternal } from 'react-icons/bi';
import StaggerHoverButton from '@/components/ui/StaggerTextButton';
const HomeEvents = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div className='bg-zinc-200 relative min-h-[500px] flex md:flex-row flex-col pt-[0] mt-[10px] md:mt-0'>
            <div id="latest-events" style={{ scrollSnapMarginTop: '-200px', scrollPaddingTop: '200px' }} className='mt-[-40px] absolute top-[-50px]'></div>
            <div className='w-full flex flex-col screen px-6 overflow-hidden'>
                <div className='md:w-[40%] w-full h-full flex flex-col justify-between'>
                    <motion.h2 initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        variants={{
                            visible: { opacity: 1, y: 0 },
                            hidden: { opacity: 0, y: -30 }
                        }} className='text-foreground text-[50px] font-semibold p-3'>Latest Events</motion.h2>

                </div>
                <div className='screen modern_scrollbar flex justify-end flex-col pb-6'>
                    <Carousel >
                        <CarouselContent>
                            {DEMOEVENTS.map((item, index) => {
                                return <CarouselItem key={index} className="lg:basis-1/5 sm:basis:1/1.5 basis-1/1.5 cursor-pointer">
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                                        variants={{
                                            visible: { opacity: 1, y: 0 },
                                            hidden: { opacity: 0, y: 200 }
                                        }} key={index} className={`group event_card w-full max-w-[450px] bg-zinc-50 md:h-[330px] h-[270px] mt-2 rounded-sm relative overflow-hidden`}>
                                        <div className="bg absolute group-hover:scale-[1.1] duration-700 transition-all scale-100 top-0 bottom-0 left-0 right-0 z-[1]">
                                            <img src={item.image} className='object-contain  transition-all duration-500 object-fill' alt='d' />
                                        </div>
                                    </motion.div>
                                    <div className="px-3 text-black flex flex-col justify-end z-[2]">
                                        {/* <h5 className="text-[25px] font-bold">{item.title}</h5> */}
                                        {/* <p className='font-medium text-[14px] pt-1 pb-2'>{item.desc}</p> */}
                                        <div className='w-full text-[13px] flex justify-between p-2 border-t-2x border-t-primaryx'>
                                            <p>2 days Ago</p>
                                            <Link href={'/Latest-Events'} >Read More..</Link>
                                        </div>
                                    </div>
                                </CarouselItem>
                            })}
                        </CarouselContent>
                    </Carousel>
                </div>
                <div className='flex w-full justify-end mb-3'>
                    <Link href={'/Latest-Events'} className='rounded-full hover:bg-foreground duration-150 transition-all hover:text-white bg-slate-200 ps-3 flex gap-3 items-center'>
                        <span>View All</span> <ChevronRight size={30} className='rounded-full bg-foreground p-2 text-white' />
                    </Link>
                </div>
            </div>
        </div >
    )
}

const HomeCoreValues = () => {
    const [contentVisible, setcontentVisible] = useState(false);
    const constvar = {
        initial: {
            transition: {
                staggerChildren: 0.9
            }
        },
        open: {
            transition: {
                staggerChildren: 0.09
            }
        }
    }
    const variantcard = {
        initial: {
            y: 90,
            opacity: 0,
        },
        open: {
            y: 0,
            opacity: 1,

        }
    }
    return <motion.div className='w-full border-t-zinc-200/40 border-t-[0.01rem] flex'>
        <div className='max-w-screen-xl max-sm:md:mt-[200px] flex-col mx-auto flex items-center w-full justify-center md:mt-0 mt-[100px] overflow-hidden pt-3'>
            <h4 className='text-[28px] text-yellow-300 font-bold  group'>Core Values</h4>
            <motion.div variants={constvar} initial="intial" whileInView="open" className='w-full flex mt-3 flex-wrap justify-center flex-1 sm:grid-cols-2 grid-cols-1 px-3'>
                {
                    CORE_VALUES.map((item, index) => {

                        if (index < 4)
                            return <motion.div variants={variantcard} transition={{
                                duration: 0.4,
                                delay: index * 0.15,
                            }} initial="initial" viewport={{ once: true }} whileInView="open" className='flex flex-1 max-w-[50%] min-w-[300px] flex-shrink  p-3' key={index}>
                                <div className='w-full flex flex-col  transition-colors justify-center items-center bg-primary-dark/90  p-3 rounded-[0.2rem]'>
                                    <h3 className='font-bebas font-[400] text-white text-[27px]'>{item.title}</h3>

                                </div>
                            </motion.div>
                    })
                }
            </motion.div>
            <div className='flex justify-center text-white h-[50px] overflow-hidden'>
                {/* <Link href={'/AboutCollege/CoreValues'} className='w-[150px] h-[100px] bg-primary-dark pt-5 flex justify-center text-center items-start rounded-[50%]'>Read More</Link> */}
            </div>
        </div>
    </motion.div>
}

const HomeHead = () => {

    return <div className='w-full flex m-0 mt-10 overflow-hidden'>
        <div className="screen justify-between w-full flex md:flex-row flex-col py-3 min-h-[500px]">
            <div className="h-[400px] md:w-[500px] w-full md:h-auto relative">
                <img src="/assets/aboutcollege.webp" className='object-contain' alt="" />
            </div>
            <div className="md:p-5 py-0 px-6 md:w-[50%] flex flex-col items-end md:mt-[60px]">
                <span className='topright_lines'></span>
                <h1 className="md:text-[45px] mt-[20px] text-[32px] font-bold">About the College</h1>
                <p className='md:text-[18px] text-[16px] text-end mt-[20px]'>Fr. Porukara CMI College of Advanced Studies,
                    Champakulam was started in the year 2012 under the
                    leadership of Fr. Paul Thamarasserry CMI, the then
                    Prior of Gagultha Monastery</p>
                <StaggerHoverButton link='/AboutCollege' text='Read More' classname="border-[0.01rem] border-foreground text-[20px] rounded-full mt-4 px-4 py-1"></StaggerHoverButton>
                <span className='bottomright_lines [align-self:flex-start] mt-[50px]'></span>

            </div>
        </div>
    </div>
}
const AdmssionForm = () => {
    return <div className='w-full mb-20 min-h-[50vh] bg-primary flex justify-center items-center font-bold text-white text-[50px] flex-col overflow-hidden'>
        <h1 className='sm:mt-[0px] mt-[30px] sm:text-[50px] text-[30px]'>Join Our College?</h1>
        <div className='mt-10 gap-2 flex md:flex-row flex-col'>
            <Link target='_blank' className='sm:text-[23px] text-[18px] font-medium flex items-center gap-3 p-3 border-2 border-white/50 rounded-sm hover:bg-white/40 hover:text-foreground transition-all duration-200' href={'/assets/PorukaraApplicationForm.pdf'}>Download Admission Form <DownloadCloud /></Link>
            <Link className='sm:text-[23px] text-[18px]  font-medium flex items-center gap-3 p-3 border-2 border-white/50 rounded-sm hover:bg-white/40 hover:text-foreground transition-all duration-200' href={'/Admission'}>Register Now <BiLinkExternal /></Link>
        </div>
        <img className='mb-[-100px] animate-pulse' src={'/assets/graduatehat.webp'} width={200} height={200} alt='' />
    </div>
}

export {
    HomeEvents,
    HomeHead,
    HomeCoreValues,
    AdmssionForm
};