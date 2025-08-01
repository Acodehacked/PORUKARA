'use client'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowRightCircleIcon, ArrowRightFromLine, Church, Computer, Library, X } from 'lucide-react'
import { BiBowlRice, BiRightArrow } from 'react-icons/bi'
import { FaColumns } from 'react-icons/fa'
const AboutCollege = () => {
    const images = [
        '/assets/college1.webp',
        '/assets/college1.webp',
        '/assets/college1.webp',
        '/assets/college1.webp',
        '/assets/college1.webp',
        '/assets/college1.webp',
        '/assets/college1.webp',
        '/assets/college1.webp',
        '/assets/college1.webp',
        '/assets/college1.webp',
        '/assets/college1.webp',
    ]
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 1", "1 0"]
    })
    const [galleryvisible, setgalleryvisible] = useState(false);
    const [gindex, setgindex] = useState(0);
    const wrapperVariants = {
        initial: {
            clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)',
            transition: { duration: .4 },
            scale: 0.88
        },
        animate: {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            transition: { duration: .4, },
            scale: 1
        },
        exit: {
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
            transition: { duration: .4 },
        }
    }
    const margintop = useTransform(scrollYProgress, [0, 1], ['300px', '-300px']);
    return (
        <>
            <div ref={ref} className="screen">
                <div className="py-10 px-2">
                    <div className="flex flex-col justify-between items-center w-full">
                        <div className="flex flex-col p-4 items-center w-full">
                            <span className="bg-zinc-300 text-foreground px-3 py-1 rounded-xl mt-5">About</span>
                            <h3 className="sm:text-[45px] text-[25px] text-center text-link-lighte text-foreground font-bold mt-2 mb-3">Explore Our College</h3>
                        </div>
                        <div className="screen-lg group relative rounded-xl overflow-hidden min-h-[50vh] max-h-[50vh] z-[2]">
                            <img src="/assets/porukara.webp" className="min-h-[50vh]" alt="college" fill objectFit="cover" />
                            {/* <div className='absolute top-0 bottom-0 flex justify-center items-center left-0 right-0 bg-[rgba(0,0,0,0.3)] group-hover:opacity-100 transition-all opacity-0'>
                            <motion.div whileTap={{ scale: 0.97 }} onClick={() => setgalleryvisible(true)} className="px-6 py-2 bg-white rounded-xl text-foreground cursor-pointer select-none" >Image Gallery</motion.div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <motion.div style={{ marginTop: margintop }} className="bg-white relative z-[3] ">
                <div className='flex md:flex-row flex-col screen pb-3'>
                    <div className='w-full'>
                        <div className="p-10 text-[15px] text-justify rounded-xl m-0 screen">
                            <strong>Our College</strong> Fr. Porukara CMI College of Advanced Studies,
                            Champakulam was started in the year 2012 under the
                            leadership of Fr. Paul Thamarasserry CMI, the then
                            Prior of Gagultha Monastery. The college is named after
                            Rev. Fr. Thomas Porukara, a great visionary and co-founder
                            of the CMI Catholic Religious Congregation. The college is
                            managed by Mount Tabor Educational and Charitable Society
                            of Gagultha Monastery, Champakulam
                        </div>
                        <div className='grid md:grid-cols-4 screen-lg grid-cols-2 gap-8 items-center mb-6 mt-4'>
                            <div className='flex justify-center gap-2 flex-col items-center p-2'>
                                <img src={'/assets/jesus.webp'} className='rounded-full overflow-hidden' width={150} height={150} alt="jesus" />
                                <span className="text-[18px] text-center font-medium ">Our Guiding force</span>
                            </div>
                            <div className='flex justify-center gap-2 flex-col items-center p-2'>
                                <img src={'/assets/stchavara.webp'} width={150} height={150} alt="jesus" />
                                <span className="text-[18px] text-center font-medium ">Our Inspiration</span>
                            </div>
                            <div className='flex justify-center gap-2 flex-col items-center p-2'>
                                <img src={'/assets/thomasporukara.webp'} className='rounded-full overflow-hidden' width={150} height={150} alt="jesus" />
                                <span className="text-[18px] text-center font-medium ">Our Patron</span>
                            </div>
                            <div className='flex justify-center gap-2 flex-col items-center p-2'>
                                <img src={'/assets/mary.webp'} className='rounded-full overflow-hidden' width={150} height={150} alt="jesus" />
                                <span className="text-[18px] text-center  font-medium ">Our Protection</span>
                            </div>
                        </div>
                    </div>
                    <div className='md:max-w-[350px] w-full flex flex-col'>
                        <div className='bg-foreground flex justify-center mt-3 text-white items-center p-3'>
                            <h1 className='text-[18px]'>Facilities</h1>
                        </div>
                        <div className='flex flex-col m-3 gap-3'>
                            <Linkbar link='/Facilities/library'>
                                <Library className='text-foreground' size={25} /><h1 className='text-[16px]'>Library</h1>
                            </Linkbar>
                            <Linkbar link='/Facilities/computerlab'>
                                <Computer className='text-foreground' size={25} /><h1 className='text-[16px]'>Computer Lab</h1>
                            </Linkbar>
                            <Linkbar link='/Facilities/canteen'>
                                <BiBowlRice className='text-foreground' size={25} /><h1 className='text-[16px]'>Canteen</h1>
                            </Linkbar>
                            <Linkbar link='/Facilities/seminarhall'>
                                <FaColumns className='text-foreground' size={25} /><h1 className='text-[16px]'>Seminar Hall</h1>
                            </Linkbar>
                            <Linkbar link='/Facilities/chapel'>
                                <Church className='text-foreground' size={25} /><h1 className='text-[16px]' >Chapel</h1>
                            </Linkbar>
                        </div>
                    </div>
                </div>
            </motion.div>
            <AnimatePresence>
                {
                    galleryvisible &&
                    <motion.div variants={wrapperVariants} initial="initial" exit="exit" animate="animate" className='bg-primary fixed z-[888] top-0 bottom-0 right-0 left-0'>
                        <div className="w-full flex justify-between p-4 screen">
                            <h4 className='text-white text-[30px]'>Image Gallery</h4>
                            <motion.span whileTap={{ scale: 0.98 }} onClick={() => { setgalleryvisible(false) }} className='p-4 rounded-full bg-primary-foreground text-foreground text-[30px]'><X /></motion.span>
                        </div>
                        <div className='p-4 relative z-[1] overflow-hidden h-full'>
                            <motion.div style={{ x: `-${(500 * gindex)}px` }} className={`flex z-[888] h-full flex-nowrap absolute top-0 bottom-0 left-0  w-[${((images.length - 1) * 200) + 500}px]`}>
                                {images.map((item, index) => {
                                    return <motion.div key={index} className={`h-[400px] 
                                ${gindex == index ? 'w-[500px] opacity-100' : 'w-[200px] opacity-50'}`} >
                                        <img src={item} style={{ objectFit: 'cover' }} objectFit='cover' width={500} height={500} className='w-full h-full' alt="" />
                                    </motion.div>
                                })}
                            </motion.div>
                            <BiRightArrow onClick={() => setgindex((prev) => { return prev < images.length - 1 ? prev + 1 : 0 })} className="text-white text-[30px] z-[999] bg-foreground w-[60px] h-[60px] rounded-full p-4 absolute top-[50%] right-[20px] bottom-0 translate-y-[-50%]" />
                        </div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

const Linkbar = ({ children, link }: { children: React.ReactNode, link: string }) => (<Link href={link} className='bg-black/10 flex hover:bg-zinc-100 hover:shadow-sm group transition-all items-center rounded-lg p-3 gap-3 text-foreground justify-between'>
    {children}
    <ArrowRightCircleIcon className='group-hover:opacity-100 opacity-30' />
</Link>)
export default AboutCollege