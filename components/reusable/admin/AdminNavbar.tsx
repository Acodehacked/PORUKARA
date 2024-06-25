'use client'
import { ArrowDown, ArrowDown01, ChevronDown, Lock, LogOut, MenuIcon, User2Icon } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import { AdminNavbarContext } from '@/components/contexts/AdminNavbarContext'
import { BiLink } from 'react-icons/bi'
import { Session } from 'next-auth'

const AdminNavbar = ({ session }: { session: Session | null }) => {

    var name = session?.user?.name;
    var email = session?.user?.email;
    const navbarctx = useContext(AdminNavbarContext);
    const [menuOpened, setmenuOpened] = useState(false)
    return <div className="p-4 select-none flex justify-between bg-white border-[0.1rem] border-zinc-100 relative z-[10]">
        <div className='flex items-center'>
            <motion.div onClick={() => navbarctx.openNavbar()} transition={{ duration: 0.01 }} whileTap={{ scale: 0.93 }} className="w-[40px] mx-1 bg-muted md:hidden rounded-sm hover:bg-foreground hover:text-white transition-all">
                <MenuIcon size={30} className='w-full' />
            </motion.div>
            <Image alt='College logo' className='rounded-xl ' width={50} height={50} src="/assets/logo-gold.png" />
            <h1 className=" transition-colors duration-700 font-regular navtitle sm:text-[25px] text-[20px]">FR PORUKARA CMI COLLEGE<br /> OF ADVANCED STUDIES </h1>
        </div>
        <div className='flex items-center gap-2'>
            {name != null ? <div className='flex items-center gap-2'><div className={cn("cursor-pointer hover:bg-zinc-50 rounded-xl items-center relative flex justify-center px-2 py-2 transition-colors", menuOpened ? "bg-foreground text-white hover:bg-foreground" : "")} onClick={() => {
                setmenuOpened((prev) => { return !prev; })
            }}>
                <User2Icon size={20} />
                <ChevronDown size={15} />
                {menuOpened
                    &&
                    <motion.div initial={{ opacity: 0, x: '-20px' }} animate={{ opacity: 1, x: '0px' }} className='absolute right-0 z-[100] top-[105%] text-foreground bg-white p-3 rounded-sm w-max shadow-2xl'>
                        <h1 className="text-[20px] mb-3 min-w-[200px]">Hello {name}</h1>
                        {email == 'abina5448@gmail.com' ? <Link className='flex mt-1 items-center bg-green-600 text-white px-4 py-2 hover:bg-green-800 rounded-sm' href={'/app/dashboard'}>
                            <BiLink size={15} />
                            <h5 className='text-[15px] ms-3'>My Kuttanad dashboard</h5>
                        </Link> : ''}
                        
                        <span className='p-2 text-[10px] text-secondary mb-2'>Profile Settings</span>
                        <Link className='flex mt-1 items-center bg-muted px-4 py-2 hover:bg-zinc-50 rounded-sm' href={'/admin/ChangePassword'}>
                            <Lock size={15} />
                            <h5 className='text-[15px] ms-3'>Change Password</h5>
                        </Link>
                        <div onClick={() => signOut()} className='flex items-center px-4 py-2 bg-red-500 text-white mt-1 rounded-sm'>
                            <LogOut size={15} />
                            <h5 className='text-[15px] ms-3'>Logout</h5>
                        </div>
                    </motion.div>
                }
            </div>
            </div> : <div></div>}

        </div>


    </div>

}

export default AdminNavbar