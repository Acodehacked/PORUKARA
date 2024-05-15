import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Course = ({ children, duration, title, applylink, eligibility, id, image }: { children: React.ReactNode, duration: string, title: string, applylink: string, eligibility: string, id?: string, image?: string }) => {
  return (
    <div className='flex flex-col p-4 bg-white rounded-xl'>
      <div className='flex gap-3 font-bold text-[30px] pb-4'>
        <Image id={id} src={'/assets/book1.png'} style={{ scrollMarginTop: '100px' }} alt='' width={50} height={50} />
        <div className='flex flex-col justify-center'>
          <span className='text-zinc-500 p-0 m-0 font-medium text-[17px]'>{duration}</span>
          <h3 className='p-0 m-0 text-[26px]' style={{ lineHeight: '26px' }}>{title}</h3>
        </div>
      </div>
      <div className='border-t-zinc-200 border-t-2 py-4 lg:flex-row flex-col-reverse flex w-full'>
        <div className='lg:w-[60%] w-[100%] p-4'>
          {children}
        </div>
        {image !== '' ? <Image alt='' className='lg:w-[40%] h-full object-cover rounded-xl w-[100%]' src={`/${image}`} width={900} height={900} /> : ''}
      </div>
      <div className='p-3 border-t-[0.01rem] border-t-zinc-150 grid md:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-2'>
        <STHeader title='Duration' desc={duration} />
        <STHeader title='Eligibility' desc={eligibility} />
        {/* <STHeader title='Accreditation' desc={'NAAC Accredited'} /> */}
      </div>
      <div className='flex justify-end gap-3 md:flex-row sm:flex-row flex-col'>
        {/* /assets/applicationform.pdf */}
        <Button variant={'outline'} asChild={true} className='float-right min-w-[200px] mt-5'>
          <Link href={'/assets/PorukaraApplicationForm.pdf'}>Download Application Form</Link></Button>
        <Button variant={'default'} asChild={true} className='float-right min-w-[200px] mt-5 bg-foreground'>
          <Link href={'/Admission'}>Apply Now</Link></Button>
      </div>
    </div>
  )
}
const STHeader = ({ title, desc }: { title: string, desc: string }) => {
  return <div className=' w-full flex flex-col'>
    <h4 className='font-extrabold text-[13px]'>{title}</h4>
    <span className='text-[15px]'>{desc}</span>
  </div>
}

export default Course