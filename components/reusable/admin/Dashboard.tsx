'use client'

import SnackbarContext from '@/lib/Snackbar-context'
import React, { useContext, useState } from 'react'
import AnimatedText from '../public/AnimatedText'
import DashboardCard from '../public/DashboardCard'
import { Button } from '@/components/ui/button'

const DashboardItems = () => {
  const [num, setnum] = useState(0)
  const snackbarctx = useContext(SnackbarContext);

  return <div className='p-4 flex flex-col'>
    <AnimatedText text="Welcome Admin!" className='pt-3 pb-4 text-[25px]' />
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      <DashboardCard className=''>
        <span>Total Students</span>
        <AnimatedText text="0" className='text-[30px] text-foreground font-bold' />
      </DashboardCard>
      <DashboardCard className=''>
        <span>Total Courses</span>
        <AnimatedText text="0" className='text-[30px] text-foreground font-bold' />
      </DashboardCard>
      <DashboardCard className=''>
        <span>Total Faculty</span>
        <AnimatedText text="0" className='text-[30px] text-foreground font-bold' />
      </DashboardCard>
      <DashboardCard className='md:col-span-2'>
        <span>Total Faculty</span>
        <AnimatedText text="0" className='text-[30px] text-foreground font-bold' />
      </DashboardCard>
      <DashboardCard className=''>
        <span>Total Faculty</span>
        <AnimatedText text="0" className='text-[30px] text-foreground font-bold' />
      </DashboardCard>
    </div>
    {/* <Button onClick={()=>{
      setnum((prev)=>{
          return prev+1
      })
      snackbarctx.displayMsg('Added Successfully'+num)
    }}>Show txt</Button> */}
  </div>
}

export default DashboardItems;