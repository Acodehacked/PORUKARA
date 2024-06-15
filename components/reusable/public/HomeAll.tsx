'use client'
import 'boxicons/css/boxicons.css'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import HeroPage from './HeroPage'
import CarouselButtons from './CarouselButtons'
import HomeCarousel from './HomeCarousel'
import Link from 'next/link'
import { ArrowRightSquareIcon, Calendar, Link2, Link2Off, NewspaperIcon, Youtube } from 'lucide-react'
import { BiLink } from 'react-icons/bi'
import { HomeMissionandVision } from './HomeAboutUs'
import { HomeCoreValues } from './HomeEvents'
import Marquee from "react-fast-marquee";
import ShadowScroller from './ShadowScroller'
import { DEMOANNOUNCEMENTS, HOME_CAROUSEL } from '@/constants'
import { FaFireAlt } from 'react-icons/fa'
import Tab from '@/components/ui/Tab'
const HomeAll = () => {
    const [visible, setvisible] = useState(false)
    return (
        <>
            <motion.div className='relative z-[1] md:pt-[100px] w-full h-[120vh] md:max-h-[100vh] overflow-hidden min-h-[100dvh] flex md:flex-row flex-col pb-4'>
                <AnimatePresence>
                    {
                        visible && <motion.div transition={{ duration: 0.3 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className='absolute z-[11] pointer-events-none select-none text-white px-4 py-2 rounded-xl right-[2rem] flex justify-center items-center gap-2 bottom-[2rem] '>
                            <motion.h4 className='lg:text-[30px] sm:text-[20px] text-[20px] whitespace-nowrap mix-blend-screen font-regular [text-shadow:0px_10px_20px_rgba(0,0,0,0.8)] md:text-white/80 text-center text-white/60'>{HOME_CAROUSEL[0].text}</motion.h4>
                        </motion.div>
                    }
                </AnimatePresence>
                <div className='absolute left-[2rem] sm:top-[50%] top-[90%] translate-y-[-50%] right-[2rem] z-[6]'>
                    <CarouselButtons index={0} />
                </div>
                <div className='fixed z-[9] left-[50%] md:left-0 md:top-[50%] bottom-[100px] md:translate-y-[-50%] flex md:flex-col items-center md:mx-0 mx-auto md:translate-x-0 translate-x-[-50%] rounded-xl overflow-hidden'>
                    <Link href={'https://www.instagram.com/porukara_official/'} className='p-2 bg-pink-700 text-white relative group'>
                        <i className='bx bxl-instagram text-[30px] '></i>
                        <div className='absolute z-[20] top-[50%] md:group-hover:opacity-100 opacity-0 transition-all duration-200 group-hover:right-[-90px] translate-y-[-50%] right-[-80px] text-[14px] px-3 py-2 rounded-xl bg-zinc-700 text-white'>Instagram</div>
                    </Link>
                    <Link href={'https://www.youtube.com/@porukaracmicollege9385'} className='p-2 bg-red-500 text-white relative group'>
                        <i className='bx bxl-youtube text-[30px] '></i>
                        <div className='absolute z-[20] top-[50%] md:group-hover:opacity-100 opacity-0 transition-all duration-200 group-hover:right-[-90px] translate-y-[-50%] right-[-80px] text-[14px] p-2 rounded-xl bg-zinc-700 text-white'>Youtube</div>
                    </Link>
                    <Link href={'https://www.facebook.com/p/Fr-porukara-CMI-college-of-advanced-studieschampakulam-100054424693523/'} className='p-2 bg-blue-500 text-white relative group'>
                        <i className='bx bxl-facebook text-[30px] '></i>
                        <div className='absolute z-[20] top-[50%] md:group-hover:opacity-100 opacity-0 transition-all duration-200 group-hover:right-[-90px] translate-y-[-50%] right-[-80px] text-[14px] p-2 rounded-xl bg-zinc-700 text-white'>Facebook</div>
                    </Link>
                    <Link href={'/'} className='p-2 bg-black text-white relative group'>
                        <i className='bx bxl-twitter text-[30px] '></i>
                        <div className='absolute z-[20] top-[50%] md:group-hover:opacity-100 opacity-0 transition-all duration-200 group-hover:right-[-90px] translate-y-[-50%] right-[-80px] text-[14px] p-2 rounded-xl bg-zinc-700 text-white'>Twitter</div>
                    </Link>
                </div>
                <div className='absolute md:top-[50%] md:translate-y-[-50%] lg:left-[1rem] sm:left-[1rem] left-0 right-0 top-[100px] bottom-0 z-[6] md:pt-4'>
                    <HeroPage />
                </div>
                {/* <div className='absolute z-[5] right-0 bottom-[2rem] left-0 flex justify-center gap-2 text-white '> */}

                {/* </div> */}
                <div className='absolute z-[5] bg-gradient-to-r md:from-foreground/30 md:to-foreground/30  from-foreground/90 to-foreground/40 md:bg-foreground/30 top-0 right-0 bottom-0 left-0'></div>

                <HomeCarousel />

            </motion.div>
            <div className='bg-yellow-400 text-black p-4 relative z-[2]'>
                <Marquee autoFill={true} className='w-full text-center flex justify-center gap-3 text-[20px] font-semibold z-[10]'>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <NewspaperIcon /> &nbsp; PORUKARA CMI COLLEGE Offers &nbsp;<div className='hover:underline cursor-pointer'>One Year Training programme</div>&nbsp; in Entrepreneurship Development</Marquee>
            </div>
            <div className='flex screen md:flex-row flex-col mt-3'>
                <div className='md:w-[60%] w-full'>
                    <HomeMissionandVision />
                    <HomeCoreValues />
                </div>
                <div className='md:w-[40%] p-3 w-full'>
                    <div className='bg-zinc-300 rounded-lg p-3 '>
                        <div className='w-full flex justify-between items-center '>
                            <h4 className='text-[30px] text-black ps-2 font-semibold'>Announcements</h4>
                            <Link href={'/Announcements'} className='rounded-full flex items-center bg-zinc-300 p-2 hover:bg-zinc-200 px-3'>View All&nbsp;&nbsp;<ArrowRightSquareIcon size={14} /></Link>
                        </div>
                        <div className="flex flex-wrap justify-start pt-2 gap-3 px-3 w-full">
                            <Tab type='sm' dark active ><span>This Year</span></Tab>
                            <Tab type='sm' dark><span>This Month</span></Tab>
                            <Tab type='sm' dark><span>All Time</span></Tab>
                        </div>
                        {DEMOANNOUNCEMENTS.map((item, i) => {
                            return <motion.div initial={{ opacity: 0, x: -100 }}
                                animate={{ x: 0 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.25,
                                    delay: (i + 1) * 0.10
                                }} key={i} className='anouncement_card flex items-start mx-2 mt-2 rounded-xl gap-2 p-3 bg-zinc-100'>
                                <div className='p-2 max-w-[100px] w-full min-h-[130px] flex justify-center items-center flex-col m-2 bg-primary rounded-xl'>
                                    <Calendar className='h-[20px] text-white' size={20} />
                                    <h2 className='text-[35px] m-0 p-0 h-[35px] text-white'>{item.day}</h2>
                                    <h6 className="text-[22px] m-0 p-0 text-white/70">{item.month}</h6>
                                </div>
                                <div className='w-full mt-2'>
                                    <h2 className="text-[19px] font-semibold">{item.title}</h2>
                                    <p className='font-medium text-[13px] pt-1 pb-2'>{item.description}
                                    </p>
                                    <div className='w-full flex justify-end p-2 border-t-[0.01rem] border-t-primary'>
                                        <Link className='text-foreground hover:bg-zinc-300/50 rounded-sm px-2 py-1 font-semibold text-[14px]' href={'/Announcements'} >Read More..</Link>
                                    </div>
                                </div>
                            </motion.div>
                        }
                        )}
                    </div>
                </div>
            </div>
        </>

    )
}

export default HomeAll