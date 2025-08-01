'use client'
import { ACTIVITIES } from '@/constants'
import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const HomeActivities = () => {
  const [dialogShown, setdialogShown] = useState(false);
  const ref = useRef(null)
  const [index, setindex] = useState(0);
  return (
    <div style={{ background: 'url("/assets/bg3.webp") no-repeat', backgroundSize: 'cover' }} className='screen  flex flex-col items-center gap-2 mt-[50px] rounded-xl p-4'>
      <div className='flex justify-center items-center w-full ' >
        <h2 className='text-[30px] mt-3 font-bold text-white'>Activities</h2>
      </div>
      <div className='flex flex-row flex-wrap justify-center gap-3'>
        {ACTIVITIES.map((item, index) => {
          return <motion.div initial={{opacity:0,y:20}} transition={{duration:0.7}} whileInView={{opacity:1,y:0}} viewport={{ once: true }} onClick={() => { setdialogShown(true) }} onMouseEnter={() => { setindex(index) }} className='mb-3 select-none cursor-pointer text-center max-w-[400px] min-w-[50px] w-full px-5 py-4 rounded-xl mt-2 text-[22px] bg-primary shadow-lg text-white' key={index}>
            {item.title}
          </motion.div>

          
        })}
      </div>
      <AnimatePresence>
        {
          dialogShown && <motion.div onClick={(e) => {
            if (e.target !== ref.current) {
              setdialogShown(false)
            }
          }} initial={{ opacity: 0, pointerEvents: 'none' }}
            exit={{ opacity: 0, pointerEvents: 'none' }} animate={{ opacity: 1, pointerEvents: 'all' }} className='fixed z-[999] top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center'>
            <AnimatePresence>
              {dialogShown && <motion.div initial={{ opacity: 0, y:30 }}
            exit={{ opacity: 0, y:20 }} animate={{ opacity: 1,y:0 }}  onClick={(e) => {
                setdialogShown(true)
              }} ref={ref} className='mx-2 bg-white px-6 py-4 max-w-[500px] w-full rounded-xl shadow-sm'>
                <h2 className='text-[24px] mb-2 font-bold'>{ACTIVITIES[index].title}</h2>
                <hr />
                <p className='py-3 text-[19px]'>
                  {ACTIVITIES[index].desc}
                </p>
              </motion.div>}
            </AnimatePresence>
          </motion.div>
        }
      </AnimatePresence>
    </div>

  )
}

export default HomeActivities