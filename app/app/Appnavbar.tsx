'use client'
import {motion} from 'framer-motion'
import { cn } from '@/lib/utils'
import { LayoutDashboard, Loader2Icon, LucideLoader } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiBuilding, BiCurrentLocation, BiSolidDashboard } from 'react-icons/bi'

const Appnavbar = () => {
    const path = usePathname();
  return (
    <div className="bg-[#031408] p-2 w-full md:w-[370px] overflow-y-scroll ">
                <div className="flex flex-col gap-3 screen pt-2 w-full px-3 hide-scrollbar">
                    <Appnavbarlink link={'/app/dashboard'} path={path}><BiSolidDashboard />App Dashboard</Appnavbarlink>
                    <Appnavbarlink path={path} link='/app/PlaceCategories'><BiCurrentLocation />Place Categories</Appnavbarlink>
                    <Appnavbarlink path={path} link='/app/Places'><BiBuilding />Places</Appnavbarlink>
                </div>
            </div>
  )
}

const AppLoader = () => {
  useEffect(() => {
    setloaded(true)
  }, [])
  const [loaded, setloaded] = useState(false)
  return (
    <motion.div initial={{opacity:1}} animate={loaded ? {
      opacity:0,
      pointerEvents:'none'
    }: {}} className={cn('fixed z-[100] bg-white text-white flex flex-col justify-center items-center left-0 right-0 top-0 bottom-0', loaded ? '' : '')}>
      <Image className=' animate-in' src={'/assets/app/app_logo.png'} alt="" width={150} height={150} />
      <LucideLoader  size={40} className='animate-spin mt-3 text-green-600' />
    </motion.div>
  )
}



export const Appnavbarlink = ({children,title,link,path}:{children:React.ReactNode,title?:string,link:string,path?:string})=>(<Link href={link} className={cn("py-3 px-3 cursor-pointer border-[0.03rem] rounded-lg items-center flex gap-2 border-white/20  text-white",path==link ? 'bg-white text-green-900' : '')}>{children}{title}</Link>)

export {Appnavbar ,AppLoader};