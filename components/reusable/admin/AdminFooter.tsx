import Link from 'next/link'
import React from 'react'

const AdminFooter = () => {
    return (
        <div className="bg-zinc-100 rounded-xl m-2 p-4 font-light text-black w-full">
            <div className=" flex justify-between gap-3 items-center max-w-screen-lg md:flex-row flex-col w-full mx-auto">
                <h2 className='font-regular'>Fr Porukara College CMI, Champakulam</h2>
                <div className="flex text-[14px] md:justify-end justify-center gap-2">
                    <Link className='px-3 py-1 rounded-2xl' href={""} >Home</Link>
                    <Link className='px-3 font-semibold py-1 rounded-2xl' href={""} >Designed & Managed by Abin Kattady</Link>
                </div>
            </div>
        </div>
    )
}

export default AdminFooter