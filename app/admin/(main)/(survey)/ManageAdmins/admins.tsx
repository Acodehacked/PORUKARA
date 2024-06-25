'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BiRefresh, BiTrashAlt, BiUserCircle, BiWifi, BiWifiOff } from "react-icons/bi";
import DialogContainer from "@/components/reusable/admin/DialogContainer";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { AddAdmin, DeleteAdminn } from "./api";

export const AdminsPage = ({ admins }: {
    admins: {
        password: string;
        id: number;
        name: string;
        email: string;
        status: string
    }[]
}) => {
    const [addDialog, setaddDialog] = useState(false);
    const router = useRouter();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const handleSubmit = async () => {
        const response = await AddAdmin(name,email,password);
        if(response.error == null){
            router.refresh();
            alert('added successfully');
        }
    }

    const handleDelete = async (id:number) => {
        const response = await DeleteAdminn(id);
        if(response.error == null){
            router.refresh();
            alert('deleted successfully');
        }
    }
    return <div className="flex flex-col w-full">
        <div className="mb-4 flex gap-3 items-center">
            <BiRefresh className="p-1 hover:bg-zinc-300 rounded-full" size={35} onClick={()=>router.refresh()} />
            <Button onClick={() => setaddDialog(true)}>Add New</Button>
        </div>
        <div className="w-full grid md:grid-cols-4 grid-cols-1 gap-3 sm:grid-cols-2">
            {admins.map(((admin, index) => {
                return <div key={index} className="flex gap-1 items-center p-1 rounded-xl border-[0.01rem] border-zinc-500">
                    <div className="flex flex-col items-start w-full pt-3">
                        <h3 className="text-black px-3 font-semibold text-[17px] flex items-center gap-2 ">{admin.name}{admin.email == 'abina5448@gmail.com' ? <label className="bg-violet-800 p-1 font-medium rounded-sm text-white text-[12px]" >master</label> : ''}</h3>
                        <h6 className="text-secondary px-3 text-[12px] mb-2">{admin.email}</h6>
                        {admin.status == 'online' ? <label className="text-white rounded-sm flex mx-3 items-center gap-3 p-1 bg-green-700 text-[10px] "><BiWifi className="animate-pulse" /> online</label> : <label className="text-white flex rounded-sm mx-3 items-center gap-3 p-1 bg-red-700 text-[10px] "><BiWifiOff className="animate-pulse" /> offline</label>}
                        <div className="flex gap-2 mt-1 justify-end px-3 mb-2">
                            {admin.email != 'abina5448@gmail.com' ? <BiTrashAlt onClick={()=>handleDelete(admin.id)} className="text-red-700 hover:bg-slate-300 rounded-xl p-1" size={26} /> : ''}
                        </div>
                    </div>
                </div>
            }))}
        </div>
        <DialogContainer open={addDialog} setOpen={setaddDialog} title='Add Admin'>
            <div className='px-3 w-full pt-4'>
                <span className='mt-3 text-[14px]'>Name</span>
                <Input value={name} onChange={(e) => setname(e.currentTarget.value)} placeholder='Enter name' />
            </div>
            <div className='px-3 w-full pt-4'>
                <span className='mt-3 text-[14px]'>Email</span>
                <Input value={email} onChange={(e) => setemail(e.currentTarget.value)} placeholder='Enter email' />
            </div>
            <div className='px-3 w-full pt-4'>
                <span className='mt-3 text-[14px]'>Password</span>
                <Input value={password} onChange={(e) => setpassword(e.currentTarget.value)} placeholder='Enter password' />
            </div>
            <div className='flex mt-4 p-3 w-full justify-end'>
                <Button onClick={handleSubmit} variant={'default'}>Add Admin</Button>
            </div>
        </DialogContainer>
    </div>
}
