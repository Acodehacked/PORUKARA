'use client'
import { Button } from '@/components/ui/button';
import { DialogContent } from '@/components/ui/dialog';
import { GlobalAnimationVariant } from '@/constants';
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion';
import { Edit2Icon, Trash2, X } from 'lucide-react';
import React, { useContext, useState } from 'react'
import { deleteEvent } from './AddApi';
import { revalidatePath } from 'next/cache';
import SnackbarContext from '@/lib/Snackbar-context';
import { useRouter } from 'next/navigation';
import { Events } from '@/db/schema';
import EditItem from './EditItem';


const Announcements = ({ events }: {
    events: typeof Events.$inferSelect[];
}) => {
    const [deleteDialog, setdeleteDialog] = useState(-1);
    const [editDialog, setEditDialog] = useState<typeof Events.$inferSelect | null>(null);
    const snackctx = useContext(SnackbarContext);
    const router = useRouter();
    const OpenDeleteDialog = (id: number) => {
        setdeleteDialog(id)
    }
    
    const DeleteEvent = async () => {
        const response = await deleteEvent(deleteDialog);
        if (response?.error == null) {
            setdeleteDialog(-1)
            router.refresh();
        }else{

        }
    }
    return (
        <>
            {events && <div className="grid md:grid-cols-4 grid-cols-2 w-full gap-2 mt-2">
                {events.map((event, index) => {
                    return <div key={index} className="bg-zinc-200 rounded-md p-3">
                        <h3>{event.title}</h3>
                        <div className="w-full flex justify-end gap-2 mt-2">
                            <div onClick={()=>setEditDialog(event)} className="bg-foreground text-white flex gap-2 items-center px-3 py-1 rounded-md" ><Edit2Icon className="text-white" size={15} /></div>
                            <div onClick={() => OpenDeleteDialog(event.id)} className="bg-red-500 text-white flex gap-2 items-center px-3 py-1 rounded-md" ><Trash2 className="text-white" size={15} /></div>
                        </div>
                    </div>
                })}
            </div>}
            {events.length == 0 && <div>
                <h3 className="text-[25px] text-secondary mt-5">No Events Yet!</h3>
            </div>}
            <AnimatePresence>
                {deleteDialog != -1 && <motion.div transition={{ duration: 0.1 }} variants={GlobalAnimationVariant} initial="hidden" animate="visible" exit="hidden" className='fixed top-0 z-[40] bottom-0 left-0 right-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)]'>
                    <div className='bg-white rounded-lg p-2'>
                        <div className='flex justify-between'>
                            <h2>Alert</h2>
                            <X onClick={() => setdeleteDialog(-1)} />
                        </div>
                        <div className='px-3 py-6'>
                            <h3 className='text-red-400 font-bold'>Are you sure about deleting this Upcoming Event? </h3>
                        </div>
                        <div className='flex justify-end gap-3'>
                            <Button variant={'secondary'} className='text-black bg-zinc-200' onClick={() => setdeleteDialog(-1)}>Cancel</Button>
                            <Button onClick={() => DeleteEvent()} variant={'destructive'}>Delete</Button>
                        </div>
                    </div>
                </motion.div>}
            </AnimatePresence>
            <EditItem item={editDialog} open={editDialog != null} setOpen={setEditDialog}  />
        </>
    )
}

export default Announcements