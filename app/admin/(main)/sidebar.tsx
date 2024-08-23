'use client'
import { motion } from 'framer-motion'
import { AdminNavbarContext, AdminNavbarProvider } from '@/components/contexts/AdminNavbarContext'
import { cn } from '@/lib/utils';
import { IoMdClose } from 'react-icons/io';
import AdminSidebar from '@/components/reusable/admin/AdminSidebar'
import AdminFooter from '@/components/reusable/admin/AdminFooter'
import Loading from './loading'
import React, { Suspense, useContext, useRef } from 'react'
import { Session } from 'next-auth';
import { useOnClickOutside } from 'usehooks-ts';

export const Sidebar = ({session,children}:{session: Session | null,children:React.ReactNode}) => {
    const navbarctx = useContext(AdminNavbarContext);
    
    const ref= useRef(null);
    const clicked = useOnClickOutside(ref,(e)=>{
        if(navbarctx.isDisplayed) navbarctx.openNavbar() 
    });

    return <>
        <motion.div ref={ref} className={cn("max-w-[300px] w-full sm:relative fixed top-0 bottom-0 transition-all z-[30]", navbarctx.isDisplayed ? 'left-0 w-full md:shadow-none shadow-[0px_0px_500px_rgba(0,0,0,0.3)]' : 'md:w-full w-0 md:left-0 left-[-100%] ')}>
            <div className='p-2  md:hidden flex bg-white h-[80px] justify-between items-center'>
                <span className='p-2 bg-muted rounded-sm' title='close' onClick={() => navbarctx.openNavbar()}><IoMdClose size={30} /></span>
            </div>
            <motion.aside className="bg-foreground md:h-[100%] no-scrollbar overflow-x-hidden overflow-y-scroll h-[calc(100%-80px)] text-white w-full">
                <AdminSidebar user={session?.user?.email} />
            </motion.aside>
        </motion.div>
        <div className={cn("relative bg-zinc-50 w-full p-4 transition-all max-h-[100vh] overflow-y-scroll overflow-x-hidden", navbarctx.isDisplayed ? 'sm:left-0 left-[100px]' : 'left-0')}>
            <div className='w-full min-h-[70vh]'>
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </div>
            <AdminFooter />
        </div>
    </>;
}