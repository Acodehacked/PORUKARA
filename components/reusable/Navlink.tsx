import Link from 'next/link'
import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
export default function Navlink({text,link , submenu, active ,navchange} : {
    text :string,
    link : string,
    submenu: {
      text :string,
      url: string
    }[],
    active : boolean,
    navchange : boolean
}) {
  return (
    <div className='p-1 group'>
      <div className='menu relative sm:p-2 p-3 border-b sm:border-0'>
      <Link className={` font-bold  transition-colors duration-700 ${navchange ? "md:text-black text-black sm:group-hover:text-cyan-700" : "md:text-white  sm:group-hover:text-cyan-200 text-black"} text-xl flex align-c group-hover:text-cyan-700  sm-flex ${active ? 'navactive' : ''}`} href={link}>{text}{submenu.length > 0 ? <IoIosArrowDown className='text-[20px]' /> : ''}</Link>
      {submenu.length > 0 ? 
      <div className='submenu min-w-[400px] shadow relative sm:absolute sm:scale-0 hidden group-hover:block sm:mb-0 mb-3  sm:group-hover:scale-100 transition-all duration-500 sm:top-[110%] top-[20px]'>
      {submenu.map((submenus,index)=>{
        return <>
          <Link key={index} href={submenus.url} className='block hover:bg-slate-200'>
            {submenus.text}
          </Link>
        </>
      })}
    </div> : ""}      
      </div>
    </div>
  )
}
