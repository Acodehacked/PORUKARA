'use client'
import { AdminNavbarContext } from '@/components/contexts/AdminNavbarContext'
import { ADMINSIDEBARLINKS } from '@/constants'
import { cn } from '@/lib/utils'
import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useState } from 'react'

const AdminSidebar = ({user}:{user?: string | null | undefined }) => {
  const path = usePathname();
  const navbarctx = useContext(AdminNavbarContext);
  return (
    <div className="flex flex-col gap-2 max-h-[100%] h-full overflow-y-scroll overflow-x-hidden px-3 pb-6 pt-6">{
      ADMINSIDEBARLINKS.map((navlink, index) => {
        if(navlink.onlyDev){
          if(user?.toString() != 'abina5448@gmail.com'){
            return;
          }
        }
        return <Link onClick={
          ()=>{
            setTimeout(()=>{
              navbarctx.openNavbar();
            },500)
          }
        } className={cn("py-3 px-3 border-[0.02rem] hover:bg-black/40  border-white/20 text-foreground gap-3  flex justify-center flex-col rounded-md transition-all ", path == '/admin'+navlink.link ? 'bg-black/70  hover:text-white text-blue-400 ' : 'text-white ')} href={'/admin'+navlink.link} key={index}>
          <div className='flex items-center gap-3'>
            <i className={`bx ${navlink.icon} text-[19px]`}></i>
            <span className='text-[15px]'>{navlink.title}</span>
          </div>
          {navlink.submenu.length > 0 && <div className="flex flex-col gap-2 mt-1 border-t-[0.001rem] border-white/20 pt-2">
            {navlink.submenu.length > 0 &&  navlink.submenu.map((submenu:any,index)=>{
              return <Link className="transition-all hover:ps-2 flex gap-2 items-center" key={index} href={'/admin'+submenu?.link}><i className="bx bx-chevron-right text-white/20"></i><span className="font-regular text-[14px]">{submenu?.title }</span></Link>
            })}
            </div>}
        </Link>
      })}
    </div>
  )
}

export default AdminSidebar