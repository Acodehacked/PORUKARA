'use client'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Video from 'next-video';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { HOME_CAROUSEL } from '@/constants'

const HomeCarousel = () => {
    // const ref = useRef(null);
    // const { scrollYProgress } = useScroll({
    //     target: ref,
    //     offset: ["0 1", "1 0"]
    // })
    // const [visible, setvisible] = useState(false);
    // const scale = useTransform(scrollYProgress, [0, 1], [1, 4]);
    // //   const [scaleC, setscaleC] = useState(scale.get())
    // const [windowwidth, setwindowwidth] = useState(1000)
    // const homeCtx = useContext(HomeCaraouselContext);

    // useEffect(() => {
    //     setvisible(false);
    //     const timer = setTimeout(() => {
    //         setvisible(true);
    //         clearTimeout(timer)
    //     }, 100)
    // }, [homeCtx.cindex])


    // return (
    // <motion.div style={{scale: scale}} className=' absolute max-h-[100vh] h-full top-0 left-0 right-0 // bottom-0 z-[2] overflow-hidden'>
    //         <motion.div style={{ minWidth: `${100 * (HOME_CAROUSEL.length)}%` }} transition={{
    //             damping: 50,
    //             duration: 0.65,
    //             ease: "easeInOut"
    //         }} initial={{ x: 0 }} animate={{ marginLeft: `${-(100 * homeCtx.cindex)}%` }} className={`flex flex-nowrap carousel_list relative h-full z-[10]`}>
    //             {HOME_CAROUSEL.map((item, index) => {
    //                 return <div key={index} className={`carousel_item relative`} style={{width:'100%'}}>
    //                     <Image fill objectFit='cover' src={item.image} alt='dcd' />
    //                 </div>
    //             })}
    //         </motion.div>
    //     </motion.div>
    // )
    // return <motion.div style={{scale: scale}} className=' absolute max-h-[100vh] h-full top-0 left-0 right-0 bottom-0 z-[2] overflow-hidden'>
    //     <AnimatePresence>
    //         {visible && <motion.div transition={{duration:1,ease:'easeOut',filter:'blur(4px) brightness(1.3)',damping:0.03}} initial={{scale:1.8,opacity:0.3}} animate={{opacity:1,scale:1,filter:'blur(0px) brightness(1)'}} exit={{opacity:0.3,scale:0.4,filter:'blur(4px) brightness(1.3)'}} className='relative w-full h-full'>
    //         <Image objectFit='cover' fill style={{objectFit:'cover',objectPosition:'top center'}} src={HOME_CAROUSEL[homeCtx.cindex].image} alt='' />
    //     </motion.div>}
    //     </AnimatePresence>
    // </motion.div>

    return <div className='absolute w-full top-0 left-0 right-0 bottom-0 overflow-hidden'> 
        <Video
            autoPlay
            src={'/videos/final.mp4'}
            loop
            
            style={{objectFit:'cover'}}
            poster={'/assets/college1.png'}
            className=' [object-fit:cover] h-full md:w-full w-auto z-[3] '
            muted
            controls
            preload="none" />
    </div>
}

export default HomeCarousel