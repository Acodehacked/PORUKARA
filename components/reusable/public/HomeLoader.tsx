"use client"
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils'
import { Loader } from 'lucide-react'
import React from 'react'
import Image from 'next/image';
import { motion } from 'framer-motion'

const HomeLoader = () => {
  useEffect(() => {
    setloaded(true)
  }, [])
  const [loaded, setloaded] = useState(false)
  return (
    <motion.div initial={{opacity:1}} animate={loaded ? {
      opacity:0,
      pointerEvents:'none'
    }: {}} className={cn('fixed z-[100] bg-foreground text-white flex justify-center items-center left-0 right-0 top-0 bottom-0', loaded ? '' : '')}>
      <Image className=' animate-in' src={'/assets/logo-gold.webp'} alt="" width={300} height={300} />
    </motion.div>
  )
}

export default HomeLoader