'use client'
import React, { useContext, useEffect, useState } from 'react'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'
import { AnimatePresence, motion } from 'framer-motion'
import { HOME_CAROUSEL } from '@/constants'

const CarouselButtons = ({ index }: { index: number }) => {

    const [visible, setvisible] = useState(false)
    // const HCarouseCtx = useContext(HomeCaraouselContext);
    // const handleBack = () => {
    //     if (HCarouseCtx.cindex != 0) {
    //         HCarouseCtx.csetIndex(HCarouseCtx.cindex - 1)
    //     }
    // }
    // const handleForward = () => {
    //     if (HCarouseCtx.cindex < HOME_CAROUSEL.length - 1) {
    //         HCarouseCtx.csetIndex(HCarouseCtx.cindex + 1);
    //     }
    // }
    // useEffect(() => {
    //     setvisible(false);
    //     const timer = setTimeout(() => {
    //         setvisible(true);
    //         clearTimeout(timer)
    //     }, 500)
    // }, [HCarouseCtx.cindex])
    return <div className='sm:flex hidden justify-between top-0 gap-3 items-center relative'>
        {/* <motion.div whileTap={{ scale: 0.90 }} className="text-white p-3 border-2 border-white/70 rounded-full hover:bg-white hover:text-foreground transition-colors" onClick={}}><BiLeftArrow /></motion.div>
       
        <motion.div whileTap={{ scale: 0.90 }} className="text-white p-3 border-2 border-white/70 rounded-full hover:bg-white hover:text-foreground transition-colors" onClick={handleForward}><BiRightArrow /></motion.div> */}
        {/* <motion.h4 className='text-white text-[18px] select-none' initial={{y:10,opacity:0}} animate={{y:0,opacity:1}}>{HOME_CAROUSEL[HCarouseCtx.cindex].text}</motion.h4> */}
    </div>
}

export default CarouselButtons