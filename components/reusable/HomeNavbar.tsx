"use client";
import Link from 'next/link'
import { IoIosMenu } from "react-icons/io";
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ChevronDown, X } from 'lucide-react';
import { USER_NAVLINKS } from '@/constants';
import { AnimatePresence, motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

export default function HomeNavbar() {
    const [menuopen, setMenu] = useState(false);
    const path = usePathname();
    const [colorChange, setColorchange] = useState(false);
    const [hovered, sethovered] = useState(0);
    const [pathname, setpathname] = useState('/')
    useEffect(() => {
        // Client-side-only code
        const changeNavbarColor = () => {
            if (window.scrollY >= 80) {
                setColorchange(true);
            } else {
                setColorchange(false);
            }
        };

        window.addEventListener("scroll", changeNavbarColor)
    });
    const togglemenu = () => {
        setMenu((prev) => {
            return !prev;
        })
    }
    useEffect(() => {
        setMenu(false);
        setpathname(path)
    }, [path])
    useEffect(() => {
        console.log(menuopen)
    }, [menuopen])
    return (
        <div className={cn('w-100 flex fixed flex-col top-0 left-0 right-0 text-foreground transition-all bg-gradient-to-t to-primary from-blue-800 sky-300 duration-500 items-center w-full z-[999]', colorChange ? "shadow-xl md:top-[-80px]" : "")}>
            <motion.nav className={cn("flex  w-full items-center px-3 h-[80px] md:px-5 z-[40] max-w-screen-xl mx-auto justify-between", colorChange ? "" : '')}>

                <div className='flex select-none'>
                    <div className='flex items-center'>
                        <div className='rounded-full p-0 w-[60px] h-[60px] bg-foreground'>
                            <Image alt='College logo' className='' width={70} height={70} src="/assets/logo-gold.webp" />
                        </div>
                        <div className='ps-1 flex flex-col items-start text-white'>
                            <h1 style={{ lineHeight: '26px', letterSpacing: '0.3px' }} className="m-0 p-0 transition-colors font-[400] duration-700 font-bebas navtitle sm:text-[34px] text-[28px]">FR. PORUKARA CMI COLLEGE</h1>
                            <h3 className='ps-2 sm:text-[16px] text-[13px]'>Affiliated to MG University Kottayam</h3>
                        </div>
                    </div>
                </div>
                <div className='md:flex hidden'>
                    <Button asChild={true} className='bg-foreground' ><Link href={'/Admission'}>Admission</Link></Button>
                </div>
                <motion.div whileTap={{ scale: 0.93 }} onClick={togglemenu} className='md:hidden text-white bg-zinc-100/40 flex w-[50px] me-3 justify-center items-center hover:bg-zinc-300/70 rounded-sm'>
                    <AnimatePresence>
                        {menuopen ? <X size={35} /> : <IoIosMenu size={45} />}
                    </AnimatePresence>
                </motion.div>

            </motion.nav>
            <motion.div className='w-full bg-zinc-100 border-b-[0.01rem] border-zinc-400 text-foreground flex justify-center md:py-2'>
                <ul
                    onMouseLeave={() => {
                        setMenu(false)
                    }}
                    className={cn("flex p-2 md:p-0 px-2 py-4 md:py-0 opacity-0 md:shadow-none shadow-xl md:opacity-100 navbar gap-2 md:flex-row md:relative md:top-0 bottom-0 md:left-0 md:right-0 md:bottom-0 fixed left-0 md:pointer-events-auto pointer-events-none transition-all overflow-y-scroll no-scrollbar md:overflow-hidden ease-in-out md:bg-transparent bg-zinc-50 duration-150 right-0 flex-col z-[10] md:ms-4 md:items-center md:justify-center", menuopen ? 'pointer-events-auto top-[70px] opacity-100' : 'top-[-50px] opacity-0 pointer-events-none')}>
                    {USER_NAVLINKS.map((_nav, index) => {
                        return <li
                            onClick={() => {
                                if (_nav.submenu.length > 0) {
                                    setMenu(true)
                                }
                            }}
                            onMouseEnter={() => {
                                if (_nav.submenu.length > 0) {
                                    setMenu(true)
                                }
                            }}
                            className='relative group' key={index}>
                            <Link className={cn("flex justify-between md:p-2 px-5 py-3 items-center transition-all duration-150 font-medium  group-hover:bg-primary/30 rounded-sm hover:bg-primary/80", pathname === _nav.path ? 'bg-primary/20 nav-active' : '', _nav.path == '' ? 'not-open-link' : '')} href={_nav.submenu.length > 0 ? '#' : _nav.path}>{_nav.text}{_nav.submenu.length > 0 ? <ChevronDown size={16} /> : ''}</Link>
                            <AnimatePresence>
                                {_nav.submenu.length > 0 && menuopen &&
                                    <motion.div initial={{ opacity: 0, pointerEvents: 'none', y: '-50%,10px' }} animate={{ opacity: 1, pointerEvents: 'all', transform: '-50%,0%' }} exit={{ opacity: 0, pointerEvents: 'none', y: '-50%,10px' }} style={{ transformOrigin: "top center" }} className={cn("md:fixed min-w-[350px]  md:group-focus: scale-100  md:left-[50%] md:translate-x-[-50%] md:group-hover: md:opacity-100 transition-all duration-300 md: opacity md:overflow-hidden opacity-100 group-hover:h-auto md:auto h-[0] group-hover  :opacity-100 overflow-auto relative flex flex-col z-50  rounded-sm md:w-max ", _nav.submenu.length > 0 ? "group-hover:p-2 drop-shadow-lg" : "")}>
                                        <div className='screen-lg bg-zinc-100 flex mt-[-5px]' key={index}>
                                            <div className='relative md:w-[500px] md:block hidden m-5 rounded-lg overflow-hidden'>
                                                <Image className='w-full h-full object-cover' height={600} width={800} alt='' src={'/assets/college1.webp'} />
                                            </div>
                                            <div className='flex flex-col w-full'>
                                                <div className='grid md:grid-cols-2  grid-cols-1 md:p-4 p-2 w-full md:gap-2'>
                                                    <div className='flex md:col-span-2 justify-between items-center'>
                                                        <h1 className=' text-[30px] mt-3 mb-2 font-semibold md:block hidden'>{_nav.text}</h1>
                                                        {_nav.text == 'Departments' ? <Link className='px-4 me-3 py-1 rounded-full my-2 bg-foreground text-white' href={'/Course'} >All Courses</Link> : ''}
                                                    </div>
                                                    {_nav.submenu.map((_subitem, index) => {
                                                        return <Link onClick={() => {
                                                            setMenu((prev) => !prev)
                                                        }} key={index} className={cn("px-3 py-2 flex flex-col justify-center font-semibold  hover:bg-zinc-200 m-0 md:border-none bg-zinc-50 border-b-[0.01rem] relative link-left border-foreground/10 rounded-sm", pathname === _subitem?.path ? 'nav-active' : '')} title={_subitem?.description || ""} href={_subitem?.path || ''}>
                                                            <h4 className='md:text-[15px] font-medium [letter_spacing:0.1rem]'>
                                                                {_subitem?.text}
                                                            </h4>
                                                            <span className='font-light text-[10px] text-foreground p-0 m-0 [letter-spacing:0.01rem]'>{_subitem?.description || ''}</span>
                                                        </Link>
                                                    })}
                                                </div>
                                                {/* <h2 className='p-2 text-[13px]'>{_nav.text == 'Departments' ? '*  to University Approval' : ''}</h2> */}
                                            </div>

                                        </div>

                                    </motion.div>}
                            </AnimatePresence>
                        </li>
                    })}
                    <motion.button whileTap={{ scale: 0.95 }} className='md:hidden block bg-foreground p-3 m-2 font-semibold text-white text-[14px] rounded-xl' ><Link href={'/Admission'}>Admission</Link></motion.button>
                </ul>
            </motion.div>
            <Marquee speed={25} autoFill={true} delay={2} className='w-full text-center flex justify-center gap-3 [letter-spacing:0.3px] text-[13px] font-medium text-white py-1 bg-primary-dark [dtext-shadow:1px_1px_5px_rgba(0,0,0,0.8)]'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {'"'}Outstanding People have one thing in Common{';'} An Absolute Sense of the Mission. Porukara CMI College is Inventing, Experimenting, Growing, Taking Risks, Breaking Rules, Making Mistakes and Having Fun by Exploring Opportunities To Educate with a Difference so that our Children may Grow in to Confident, Well-rounded Youngsters Ready to meet the Challenges of Life{'"'}</Marquee>
        </div>
    )
}

