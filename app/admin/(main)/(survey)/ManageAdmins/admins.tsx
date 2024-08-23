'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from 'framer-motion';
import { BiLoaderAlt, BiRefresh, BiTrashAlt, BiUserCircle, BiWifi, BiWifiOff } from "react-icons/bi";
import DialogContainer from "@/components/reusable/admin/DialogContainer";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { AddAdmin, DeleteAdminn, GetAllAdmins } from "./api";
import { CloseSurvey, UpdatePermission } from "../AdminQuestions/api";
import { AdminLoginTable } from "@/db/schema";
import { SubAccountDetailsResponsePlanInfo } from "@sendinblue/client";
import { cn } from "@/lib/utils";

export const AdminsPage = ({ admins }: {
    admins: typeof AdminLoginTable.$inferSelect[]
}) => {
    const [addDialog, setaddDialog] = useState(false);
    const router = useRouter();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [loading, setloading] = useState(false);
    const [password, setpassword] = useState('');
    const [adminss, setadmins] = useState(admins)
    const [filteredAdminss, setfilteredAdminss] = useState(admins)
    const handleSubmit = async () => {
        setloading(true);
        const response = await AddAdmin(name, email, password);
        if (response.error == null) {
            router.refresh();
            setname('');
            setemail('');
            setpassword('');
            alert('added successfully');
        }
        setloading(false);
    }
    const setPermission = async (permission: boolean, email: string, i: number) => {
        setloading(true);
        const done = await UpdatePermission({ permission: permission, email: email });
        if (done) {
            var user = adminss[i];
            user.permission = permission;
            var updatedlist = adminss.filter((item) => item.email != user.email);
            setadmins([...updatedlist, user])
            setloading(false);
            router.refresh();
        }
    }
    const handleDelete = async (id: number) => {
        setloading(true);
        const response = await DeleteAdminn(id);
        if (response.error == null) {
            router.refresh();
            alert('deleted successfully');
        }
        setloading(false);
    }
    const getAll = async () => {
        setloading(true);
        const response = await GetAllAdmins();
        if (response.error != null) {
            setadmins(response.data);
        }
        setloading(false);
    }
    const CloseEvent = async () => {
        setloading(true)
        // {
        //     password: string;
        //     id: number;
        //     name: string;
        //     email: string;
        //     permission: boolean;
        //     status: "offline" | "online";
        // }[]
        const response = await CloseSurvey();
        if (response?.error == null) {
            router.refresh();
            var newr = adminss.map((irt) => {
                return {
                    password: irt.password,
                    id: irt.id,
                    name: irt.name,
                    email: irt.email,
                    permission: false,
                    status: irt.status
                }
            })
            setadmins(newr);
            setfilteredAdminss(newr);
        }
        setloading(false);
    }
    return <div className="flex flex-col w-full">
        <div className="mb-4 flex gap-3 items-center justify-between">
            <div className='flex md:flex-row flex-col md:justify-center justify-between items-center w-full' >
                <div className="flex w-full items-center gap-2 ">
                    <BiRefresh className="p-1 hover:bg-zinc-300 rounded-full" size={35} onClick={() => router.refresh()} />
                    <input onChange={(e) => {
                        setfilteredAdminss(adminss.filter((i) => i.name.toLowerCase().includes(e.target.value.toLowerCase()) || i.email.toLowerCase().includes(e.target.value.toLowerCase())))
                    }} placeholder="search here" className="outline-none border-[0.01rem] border-zinc-400 md:w-auto w-full rounded-sm px-3 py-2 bg-white-100" />
                </div>
                <div className="flex items-center gap-2 md:m-0 mt-3">
                    <Button onClick={() => setaddDialog(true)}>Add New</Button>
                    <Button onClick={() => {
                        CloseEvent();
                    }} className='bg-red-600 hover:bg-red-700 text-white'>Deactivate All</Button>
                </div>
            </div>

        </div>
        <div className="w-full grid md:grid-cols-4 grid-cols-1 gap-3 sm:grid-cols-2">
            {filteredAdminss.map(((admin, index) => {
                return <div key={index} className="flex gap-1 items-center p-1 rounded-xl border-[0.01rem] border-zinc-500">
                    <div className="flex flex-col items-start w-full pt-3">
                        <h3 className="text-black px-3 font-semibold text-[17px] flex items-center gap-2 ">{admin.name}{admin.email == 'abina5448@gmail.com' ? <label className="bg-violet-800 p-1 font-medium rounded-sm text-white text-[12px]" >master</label> : ''}</h3>
                        <h6 className="text-secondary px-3 text-[12px] mb-2">{admin.email}</h6>
                        <div className="flex gap-2 pb-2">

                        </div>
                        {admin.email != 'abina5448@gmail.com' && <div className="flex w-full  gap-2 pt-2 border-t-[0.01rem] justify-between
                         border-zinc-300 px-3 mb-2">
                            <div className="flex gap-2">
                                {admin.status == 'online' ? <label className="text-white rounded-sm flex  items-center gap-3 px-3 bg-green-700 text-[13px] "><BiWifi className="animate-pulse" /></label> : <label className="text-white flex rounded-sm items-center gap-3 p-1 bg-red-700 text-[13px] "><BiWifiOff className="animate-pulse" /></label>}
                                <Button onClick={() => {
                                    setPermission(!admin.permission, admin.email, index);
                                }} className={cn('', admin.permission ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 px-3 hover:bg-blue-700 text-white')}>{admin.permission ? 'Deactivate' : 'Activate'}</Button>
                            </div>
                            <BiTrashAlt onClick={() => handleDelete(admin.id)} className="text-red-700 hover:bg-slate-300 rounded-xl p-2" size={36} />
                        </div>}
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
        {loading && <motion.div initial={{ opacity: 0, pointerEvents: 'none' }} animate={{ opacity: 1, pointerEvents: 'all' }} className='fixed z-[100] bg-black/30 left-0 right-0 bottom-0 top-0 flex items-center justify-center'>
            {loading && <motion.div initial={{ opacity: 0, pointerEvents: 'none' }} animate={{ opacity: 1, pointerEvents: 'all' }} className='bg-white p-6 rounded-xl '>
                <BiLoaderAlt className='text-[40px] animate-spin ease-in-out' />
            </motion.div>}
        </motion.div>}
    </div>
}
