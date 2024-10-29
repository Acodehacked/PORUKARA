'use client'
import * as XLSX from "xlsx";
import DialogContainer from '@/components/reusable/admin/DialogContainer';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { BiSpreadsheet } from 'react-icons/bi';
type AdminssionType={
    id: number;
    name: string;
    mobile: string;
    email: string;
    address: string;
    appliedCourse: string;
    submittedAt: Date;
}[]
const Admissionsapps = ({ data }: {
    data: AdminssionType
}) => {
    const [details, setdetails] = useState<number>(0);
    const [filteredata, setFilteredData] = useState<AdminssionType>([]);
    const [search, setsearch] = useState<string>('');
    const [dialog, setdialog] = useState<boolean>(false);
    const handleSubmit = () => {

    }
    useEffect(()=>{
        console.log(search)
        if(search == ''){
            setFilteredData(data);
        }else{
            setFilteredData((prev)=>data.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()) || item.email.toLowerCase().includes(search.toLowerCase()) || item.mobile.toLowerCase().includes(search.toLowerCase())  || item.appliedCourse.toLowerCase().includes(search.toLowerCase())))
        }
    },[search,data])
    const downloadExcel = (data:AdminssionType) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
      };
    return (
        <div className='w-full screen gap-1 flex flex-col'>
            <div className='flex justify-between md:flex-row flex-col items-center mb-2'>
                <div className='flex gap-2 items-center'>
                    <Button onClick={()=>{
                        downloadExcel(data);
                    }} className='bg-green-600 hover:bg-green-700 flex gap-2 items-center'><BiSpreadsheet /> Export to Excel</Button>
                    <div className="bg-foreground h-max my-2 w-max px-3 py-1 text-[13px] rounded-xl text-white mb-2">Total {data.length} Applications</div>
                </div>
                <Input value={search} onChange={(e)=>{
                    setsearch(e.currentTarget?.value);
                }} placeholder='Search here..' className='bg-zinc-50 max-w-[300px]' />
            </div>
            {filteredata.map((item, index) => {
                return <div onClick={() => {
                    setdetails(index);
                    setdialog(true);
                }} key={index} className='flex px-3 py-2 hover:bg-zinc-100 cursor-pointer bg-white shadow-sm rounded-sm transition-all justify-between'>
                    <div>
                        <h2 className='text-[18px] font-semibold'>{index + 1}.{item.name} <span className="text-[14px] text-zinc-500 font-regular">: {item.appliedCourse}</span></h2>
                        <h5 className='text-zinc-600 text-[13px]'>submitted on : {item.submittedAt.toLocaleString()}</h5>
                    </div>
                    <div className='flex items-center'>
                        <ChevronRight size={20} />
                    </div>
                </div>
            })}
            <DialogContainer open={dialog} setOpen={setdialog} title={`${data[details].name} details`}>
                <div className='px-3 w-full flex flex-col pt-4'>
                    <span className='mt-3 text-[14px]'>Name</span>
                    <span className="bg-zinc-50 border-[0.01rem] border-zinc-300 px-3 py-2 rounded-sm ">{data[details].name}</span>
                </div>
                <div className='px-3 w-full flex flex-col pt-4'>
                    <span className='mt-3 text-[14px]'>Mobile</span>
                    <span className="bg-zinc-50 border-[0.01rem] border-zinc-300 px-3 py-2 rounded-sm ">{data[details].mobile}</span>
                </div>
                <div className='px-3 w-full flex flex-col pt-4'>
                    <span className='mt-3 text-[14px]'>Email</span>
                    <span className="bg-zinc-50 border-[0.01rem] border-zinc-300 px-3 py-2 rounded-sm ">{data[details].email}</span>
                </div>
                <div className='px-3 w-full flex flex-col pt-4'>
                    <span className='mt-3 text-[14px]'>Applying Course</span>
                    <span className="bg-zinc-50 border-[0.01rem] border-zinc-300 px-3 py-2 rounded-sm ">{data[details].appliedCourse}</span>
                </div>
                <div className='px-3 w-full flex flex-col pt-4'>
                    <span className='mt-3 text-[14px]'>Address</span>
                    <span className="bg-zinc-50 border-[0.01rem] border-zinc-300 px-3 py-2 rounded-sm ">{data[details].address}</span>
                </div>
                <div className='flex mt-4 p-3 w-full justify-end'>
                    <Button onClick={()=>setdialog(false)} variant={'outline'}>Close</Button>
                </div>
            </DialogContainer>
        </div>
    )
}

export default Admissionsapps