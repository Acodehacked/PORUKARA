'use client'
import { FaRegNewspaper } from "react-icons/fa";
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import AnimatedText from './AnimatedText';
import { Button } from '@/components/ui/button';
import { BiRightArrow } from 'react-icons/bi';
import Image from 'next/image';
import Link from 'next/link';
import { Worker } from 'worker_threads';
import { UPCOMING_EVENTS } from "@/constants";
import { NewspaperIcon } from "lucide-react";
import Marquee from "react-fast-marquee";
const child = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 19,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 50,
    transition: {
      type: "spring",
      damping: 19,
      stiffness: 100,
    },
  },
};
const HeroPage = () => {
  const [uindex, setuindex] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setuindex((prev) => {
        if (prev < UPCOMING_EVENTS.length - 1) {
          return prev + 1
        } else {
          return 0
        }
      })
    }, 3000)
  }, [uindex]);
  return (
    <div className='screen flex justify-between w-full md:flex-row flex-col sm:pt-0 pt-6'>
      <div className='md:px-4 py-1 w-full ps-6 flex md:w-[100%] relative flex-col items-center top-0  text-white '>
        <div className='top-0 left-0 w-full px-4 right-0 bottom-0 flex flex-col items-start justify-start absolute z-[5]'>
          <div className='w-full'>
            <div className='md:grid flex grid-cols-4 mb-6 md:max-w-[550px]'>
              <div className='flex justify-start gap-2 flex-col items-center p-2'>
                <Image src={'/assets/jesus.jpg'} className='rounded-full overflow-hidden' width={50} height={50} alt="jesus" />
                <span className="text-[13px] text-center font-medium sm:block hidden">Our Guiding force</span>
              </div>
              <div className='flex justify-start gap-2 flex-col items-center p-2'>
                <Image src={'/assets/stchavara.png'} width={50} height={50} alt="jesus" />
                <span className="text-[13px] text-center font-medium sm:block hidden">Our Inspiration</span>
              </div>
              <div className='flex justify-start gap-2 flex-col items-center p-2'>
                <Image src={'/assets/thomasporukara.jpg'} className='rounded-full overflow-hidden' width={50} height={50} alt="jesus" />
                <span className="text-[13px] text-center font-medium sm:block hidden">Our Patron</span>
              </div>
              <div className='flex justify-start gap-2 flex-col items-center p-2'>
                <Image src={'/assets/mary.jpg'} className='rounded-full overflow-hidden' width={50} height={50} alt="jesus" />
                <span className="text-[13px] text-center  font-medium sm:block hidden">Our Protection</span>
              </div>
            </div>
          </div>
          <AnimatedText text='Shaping_Futures,- Inspiring_Excellence' className='z-[1] mx-0 mt-2 mb-0 text-start sm:text-[42px] text-white [text-shadow:1px_4px_5px_rgba(0,0,0,0.8)] text-[36px] font-extrabold' />
          <p className='p-0 m-0 mb-4 sm:text-[24px] font-semibold px-2 text-[18px] text-white/60 text-start z-[1]'>Your Pathway to Advanced Learning and Success.</p>
          <div className='px-5 rounded-md py-3 bg-black/60'>
            <h2 className="pb-2 text-yellow-200 [text-shhadow:0px_0px_1px_rgba(0,0,0,0.7)] md:text-[14px] text-[13px]">&gt; &gt; Upcoming Events</h2>
            <div className='link-footer flex flex-col h-[50px] overflow-hidden ps-2 relative border-t-[0.01rem] border-t-zinc-50/30 text-white gap-1 '>
              <motion.div transition={{ duration: 0.5 }} style={{ marginTop: `${uindex * -50}px` }} className={`h-[${UPCOMING_EVENTS.length * 50}px] transition-all duration-1000`}>
                {UPCOMING_EVENTS.map((item, index) => {
                  return <div key={index} className="h-[50px] flex gap-2 items-center font-light text-yellow-400">
                    <FaRegNewspaper size={20} />
                    <p className="text-[16px] " style={{ lineHeight: '20px' }}>{item.text}</p>
                  </div>
                })}
              </motion.div>
            </div>
          </div>
          <div className='flex gap-5 mt-4'>
            <Button className='text-[15px] z-[1]' asChild variant={'default'}><Link href={'/Course'}>Explore Courses<BiRightArrow className='ms-2' /></Link></Button>
            <Button asChild className='text-[15px] z-[1] text-black' variant={'lightsecondary'}><Link className='flex items-center' href={'#latest-events'}>Latest Events<BiRightArrow className='ms-2' /></Link></Button>
          </div>
        </div>
        {/* <div className='min-h-[300px] w-full md:p-4'> 
            <Image src='/assets/bg.jpg' alt='bg image' fill={true} className='opacity-[0.07] object-contain' />
        </div> */}
      </div>
      <div className='md:w-[45%] w-full md:flex hidden select-none'>
        <Image src='/assets/logo-gold.png' className='select-none absolute opacity-20 right-[-10%] top-[-50%] z-[10] bottom-0 ' style={{ objectFit: 'cover', height: '900px', width: '900px' }} width={1000} height={600} alt='Hero Image' />
      </div>
    </div>
  )
}

export default HeroPage