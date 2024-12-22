'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Loader2Icon, LucideLoader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useOnClickOutside } from 'usehooks-ts'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { BiAddToQueue, BiBuilding, BiCurrentLocation, BiExit, BiLogOut, BiMenu, BiSolidDashboard, BiX } from 'react-icons/bi'
import { MyKuttanaduAdminNavbarContext } from '@/components/contexts/MyKuttanaduNavbarContext'

const Appnavbar = () => {
  const adminctx = useContext(MyKuttanaduAdminNavbarContext);
  const path = usePathname();
  const menuref = useRef<HTMLDivElement>(null)
  // useOnClickOutside(menuref, () => {
  //   adminctx.onClose();
  // });
  useEffect(() => {
    console.log('appbar:' + adminctx.isDisplayed);
  }, [adminctx.isDisplayed])
  const handleClick = () =>{
    adminctx.onClose();
  }
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={adminctx.isDisplayed ? { opacity: 1, pointerEvents: 'all' } : { opacity: 0, pointerEvents: 'none' }} exit={{ opacity: 0, pointerEvents: 'none' }} className=" w-full bg-black/40 overflow-y-scroll max-h-[100vh] fixed top-0 left-0 bottom-0 z-[999]">
        <motion.div ref={menuref} initial={{ x: -390 }} animate={adminctx.isDisplayed ? { x: 0, pointerEvents: 'all' } : { opacity: 0, pointerEvents: 'none' }} exit={{ x: -390, pointerEvents: 'none' }} transition={{ stiffness: 0.1, duration: 0.2 }} className="flex absolute left-0 top-0 bottom-0 max-w-[370px] w-full bg-[#031408] flex-col gap-3 pt-2 px-3 hide-scrollbar">
          <div className='mt-5 text-white p-2 flex justify-between items-center'>
            <div className='flex items-center'>
              <Image src={'/assets/app/app_logo.png'} className='select-none rounded-full' alt="Kuttanadu App" width={30} height={30} />
              <h2 className='text-white/40 ms-1'>My Kuttanad Dashboard</h2>
            </div>
            <BiX size={30} onClick={() => adminctx.openNavbar()} />
          </div>
          <div className='flex flex-col px-6 gap-3 mt-4'>
            <Appnavbarlink onClick={handleClick} link={'/app/dashboard'} path={path}><BiSolidDashboard />App Dashboard</Appnavbarlink>
            <Appnavbarlink onClick={handleClick} path={path} link='/app/TopCategories'><BiCurrentLocation />Top Place Categories</Appnavbarlink>
            <Appnavbarlink onClick={handleClick} path={path} link='/app/PlaceCategories'><BiCurrentLocation />Place Categories</Appnavbarlink>
            <Appnavbarlink onClick={handleClick} path={path} link='/app/Places'><BiBuilding />Places</Appnavbarlink>
            <Appnavbarlink onClick={handleClick} path={path} link='/app/AddPlace'><BiAddToQueue />Add Place</Appnavbarlink>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const AppLoader = () => {
  useEffect(() => {
    setloaded(true)
  }, [])
  const [loaded, setloaded] = useState(false)
  return (
    <motion.div initial={{ opacity: 1 }} animate={loaded ? {
      opacity: 0,
      pointerEvents: 'none'
    } : {}} className={cn('fixed z-[100] bg-white text-white flex flex-col justify-center items-center left-0 right-0 top-0 bottom-0', loaded ? '' : '')}>
      <Image className=' animate-in' src={'/assets/app/app_logo.png'} alt="" width={150} height={150} />
      <LucideLoader size={40} className='animate-spin mt-3 text-green-600' />
    </motion.div>
  )
}



export const Appnavbarlink = ({ children, title, link, path,onClick}: { children: React.ReactNode, title?: string, link: string, path?: string, onClick:() => void}) => (<Link href={link} className={cn("py-3 px-3 cursor-pointer border-[0.03rem] rounded-lg items-center flex gap-2 border-white/20  text-white", path == link ? 'bg-white text-green-900' : '')} onClick={onClick}>{children}{title}</Link>)

const MKAdminNavbar = () => {
  const adminctx = useContext(MyKuttanaduAdminNavbarContext);
  
  return <nav className="w-full bg-green-900 px-3 screen items-center flex justify-between ">
    <div className="flex gap-2 items-center">
      <BiMenu className='text-white rounded-full hover:bg-black/90 p-1 cursor-pointer' size={34} onClick={() => {
        adminctx.openNavbar();
      }} />
      <Image src={'/assets/app/app_logo.png'} className='m-3 select-none rounded-xl shadow-xl' alt="Kuttanadu App" width={50} height={50} />
      <h2 className="text-[17px] text-white font-semibold"></h2>
    </div>
    <Link className="bg-green-900 rounded-full p-3 m-2 text-white text-[10px]" href={'/admin/dashboard'}><BiExit size={34} /></Link>
  </nav>;
}

export { Appnavbar, AppLoader, MKAdminNavbar };