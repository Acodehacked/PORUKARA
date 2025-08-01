'use client'
import {motion, useScroll, useTransform} from 'framer-motion'
import { Card } from '@/components/ui/card'
import { CORE_VALUES, MISSION_VISION } from '@/constants';
import Image from 'next/image'
import Link from 'next/link';
import React, { useRef } from 'react'

const HomeAboutUs = () => {
  const variants = {

  };
  return (
    <div className='relative w-[100%] z-[2] flex md:px-10 md:py-10 py-4 flex-col'>
      <div className='screen-lg'>
        <h3 className='text-[43px] px-3 font-bold'>Our Head</h3>
      </div>
      <div className='relative flex md:flex-row flex-col overflow-hidden w-full screen-lg  md:h-auto md:rounded-2xl'>
        <div className='w-[650px] h-[300px] pt-[50px] relative overflow-hidden'>
          <img src="/assets/principal.webp" className='flex md:rounded-tl-xl md:rounded-bl-xl md:p-0 h-full w-full object-cover' alt="" width={500} height={500}  />
        </div>
        <div className='bg-foreground relative w-full p-5'>
          <span className="w-[0px] md:block hidden h-[0px] z-[2] absolute left-[-350px] top-0 bottom-0 rightriangle bg-foreground"></span>
          <span className="w-[0px] h-[0px] z-[1] md:block hidden absolute left-[-360px] top-0 bottom-0 rightriangle bg-primary"></span>
          <div className='relative z-[3] flex flex-col pt-3 justify-center h-full md:px-2 px-5'>
            <p style={{ lineHeight: '35px' }} className='text-white font-medium md:text-[16px] text-[17px]'>
              <span className='text-[50px]' >I</span> have immense pleasure to welcome you to Fr. Porukara CMI College, part of the CMI (Carmelites of Mary Immaculate, the first indigenous Catholic Religious Congregation of India) Educational Agency, one of the biggest educational agencies in India.
            </p>
            <div className='w-full flex justify-end mb-2'>
              <Link href={'/AboutCollege/Principal'} className='font-bold text-primary'>ReadMore</Link>
            </div>
            <div className='w-full flex justify-between p-3 mt-2 border-t-[0.01rem] border-white/40'>
              <div className="flex flex-col text-white">
                <h2 className="font-semibold text-[18px]">Fr. Dr. Josey Kollammalil CMI</h2>
                <p className="text-[12px] font-medium">Principal, Porukara College</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const HomeMissionandVision = () => {
  return <motion.div  className='relative w-full z-[2] flex'>
    <div className='w-full flex flex-col max-w-screen-xl mx-auto'>
      <div className='flex flex-col items-center w-full'>
        {MISSION_VISION.map((m) => {
          return <div className='h-min-[200px] w-fulltext-white px-4 py-3 border-t-[0.001rem] border-t-zinc-50/30' key={m.title}>
            <div className='flex p-2 items-center justify-center'>
              <h3 className='text-[30px] text-yellow-300 font-bold ms-2'>{m.title}</h3>
            </div>
            <p className='p-2 text-white text-[16px] text-center'>
              {m.description}
            </p>
          </div>
        })}
      </div>
    </div>
  </motion.div>
}

export {
  HomeAboutUs,
  HomeMissionandVision
}