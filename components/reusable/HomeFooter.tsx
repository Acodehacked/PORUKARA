import { USER_FOOTERLINKS } from '@/constants'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { PlusIcon } from 'lucide-react'

const HomeFooter = () => {
  return (
    <div style={{ backgroundSize: 'cover', backgroundOrigin: 'top right', backgroundRepeat: 'no-repeat' }} className='p-0 flex bg-foreground flex-col items-center text-white '>
      <h2 className='max-w-screen-xl w-full text-[16px] text-yellow-400 px-4 pt-4 pb-3 mx-auto font-light'>Fr. Porukara CMI College of Advanced Studies, Champakulam</h2>
      <div className='max-w-screen-xl px-4 py-4 w-full mx-auto grid md:grid-cols-4 sm:gris-cols-2 grid-cols-1 gap-4'>
        <div className=''>
          <h3 className='footer_head'>Address</h3>
          <div className='footer_links'>
            <h6>Gagultha Monastry Campus,<br /> Champakulam, Alappuzha District,<br /> Kerala, 688505</h6>
            <div className='p-2 bg-slate-900/20 mt-3 rounded-xl'>
              <Link className='text-link-dark mb-2' href={'https://maps.app.goo.gl/N1eJMUBRXvwBzvay7'} >Locate On Maps</Link>
              <p className='mt-3'>
                +91-9273873873<br />
                +91-7389374898<br />
                <Link className='font-medium underline' href={'mailto:porukaracollege@gmail.com'} >porukaracollege@gmail.com</Link>
              </p>
            </div>
          </div>
        </div>
        {
          USER_FOOTERLINKS.map((foot, index) => {
            return <div key={index} className='group cursor-pointer'>
              <div className='flex w-full justify-between'>
                <h3 className='footer_head'>{foot.text}</h3>
                <PlusIcon className='text-white/50 md:hidden block' />
              </div>
              <div className='footer_links md:flex flex-col md:group-hover:flex-col md:h-[150px] group-hover:h-[150px] overflow-hidden h-[0px] transition-all '>
                {
                  foot.submenu.map((link, index) => {
                    return <div key={index} className='p-2 hover:translate-x-1 transition-all hover:bg-slate-900/20 mt-3 rounded-xl'>
                      <Link className='link-footer relative ps-3' href={link.path}>{link.text}</Link>
                    </div>
                  })
                }

              </div>
            </div>
          })
        }
        <div className=''>
          <h3 className='footer_head'>Send a Message</h3>
          <div className='footer_links pt-2'>
            <input className='w-full bg-slate-900/40 rounded-xl px-3 p-2 outline-none border-white/0 border-2 focus-visible:border-white/40' placeholder='Enter Your name' />
            <input className='w-full mt-3 bg-slate-900/40 rounded-xl px-3 p-2 outline-none border-white/0 border-2 focus-visible:border-white/40' placeholder='Enter Your Email' />
            <textarea className='w-full mt-3 bg-slate-900/40 rounded-xl px-3 p-2 outline-none border-white/0 border-2 focus-visible:border-white/40 min-h-[50px]' placeholder='Enter Your Message'></textarea>
            <div className='w-full'>
              <Button className='!py-2'>Send</Button>
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-screen-xl text-[15px] flex w-full mx-auto sm:flex-row flex-col px-4 pt-5 pb-[120px] sm:pb-[30px] justify-between items-center border-t-[0.01rem] border-t-white/20'>
        <p className='text-white/70 text-[13px] text-center'>2024 All Rights Reserved &copy; Porukara CMI College </p>
        <div className='flex flex-col gap-1 font-light md:items-end items-center sm:mt-0 mt-3'>
          <div className='flex text-[13px]'>
            {/* <span className='me-2'>Affiliated by <Link href={''} className='text-link-dark link' >MG University</Link></span> */}
            <span className='text-center'>Designed & Developed by &nbsp;</span>
            <Link className='link text-center' href={'https://abinantonywebsite.web.app'}> AbinKattady</Link>
          </div>
          <p className='text-[12px] text-white/70 text-center'>+919048741910 &middot; abina5448@gmail.com</p>
        </div>
      </div>
    </div>
  )
}

export default HomeFooter