'use client'
import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import './snackbar.css'
import SnackbarContext from '../../../lib/Snackbar-context'
import { cn } from '@/lib/utils'
import { IoIosClose } from 'react-icons/io'
import { Timer } from 'lucide-react'
function Snackbar() {
    const SnackbarCtx = useContext(SnackbarContext);
    return <motion.div className={cn('fixed md:top-[100px] md:right-[10px] md:bottom-auto md:left-auto right-0 left-0 bottom-0 max-w-[500px] md:max-w-[400px] flex justify-between items-center md:rounded-lg w-full z-[99999] md:m-2 duration-200 transition-all md:bg-white bg-zinc-900 md:text-foreground text-white p-3', SnackbarCtx.isDisplayed ? 'md:right-[10px] left-0 right-0 bottom-[0px] opacity-100 scale-100 md:shadow-xl' : 'md:right-[-450px] bottom-[-50px] opacity-0 scale-50')}>
        <div className='flex gap-3 items-center'>
            <div className="p-2 rounded-full bg-green-500">
                <Timer className="text-white" size={20} />
            </div>
            <div className='text-white md:text-foreground text-[17px]'>{SnackbarCtx?.msg}</div>
        </div>
        <div className='text-[30px] text-white md:text-foreground' onClick={SnackbarCtx.onClose}><IoIosClose /></div>
    </motion.div>
}
export default Snackbar;