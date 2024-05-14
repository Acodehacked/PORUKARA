import { AdminNavbarContext } from '@/components/contexts/AdminNavbarContext'
import { ADMINSIDEBARLINKS } from '@/constants'
import { cn } from '@/lib/utils'
import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useState } from 'react'

const AdminSidebar = () => {
  const path = usePathname();
  const navbarctx = useContext(AdminNavbarContext);

  return (
    <div className="flex flex-col gap-3 max-h-[100%] h-full overflow-y-scroll overflow-x-hidden px-3 pb-6 pt-6">{
      ADMINSIDEBARLINKS.map((navlink, index) => {

        return <Link onClick={() => { navbarctx.openNavbar() }} className={cn("py-4 px-3 border-[0.02rem] border-white/20 text-foreground gap-3  flex justify-center flex-col rounded-xl transition-all", path == '/admin'+navlink.link ? 'bg-muted text-foreground' : 'text-white')} href={'/admin'+navlink.link} key={index}>
          <div className='flex items-center gap-3'>
            <i className={`bx ${navlink.icon} text-[23px]`}></i>
            <span>{navlink.title}</span>
          </div>
          {navlink.submenu.length > 0 && <div className="flex flex-col gap-2 mt-1 border-t-[0.001rem] border-white/20 pt-2">
            {navlink.submenu.length > 0 &&  navlink.submenu.map((submenu:any,index)=>{
              return <Link className="transition-all hover:ps-2 flex gap-2 items-center" key={index} href={'/admin'+submenu?.link}><i className="bx bx-chevron-right text-white/20"></i><span className="text-white font-regular text-[14px]">{submenu?.title }</span></Link>
            })}
            </div>}
        </Link>
      })}
    </div>
  )
}

export default AdminSidebar