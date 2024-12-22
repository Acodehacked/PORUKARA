'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { AddEvent } from './AddApi'
import { usePathname, useRouter } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import SnackbarContext from '@/lib/Snackbar-context'
import { Textarea } from '@/components/ui/textarea'
import { Events } from '@/db/schema'
const EditItem = ({item,open,setOpen}:{item:typeof Events.$inferSelect | null,open:boolean,setOpen: React.Dispatch<React.SetStateAction<{
    date: Date | null;
    id: number;
    title: string;
    description: string | null;
    images: unknown;
    eventType: "Events" | "Upcoming Event" | "Announcement" | "NSS Event" | null;
    link: string | null;
} | null>>}) => {
    const [dialogOpen, setDialogOpen] = useState<boolean>(item != null)
    const [date,setDate] = useState<Date | undefined>(item?.date ?? undefined)
    const [data, setData] = useState({
        title: item?.title ?? '',
        link:item?.link ?? '',
        description: item?.description ?? '',
        images:item?.images ?? []
    });
    const router = useRouter();
    const pathname = usePathname();
    const [errorShown, seterrorShown] = useState(false);
    const [Error, setError] = useState('');
    const Snackctx = useContext(SnackbarContext);
    useEffect(()=>{
        if(!dialogOpen){
            setOpen(null)
        }
    },[dialogOpen])
    async function AddData() {
        if (date == null) {
            setError('Please set Date')
            seterrorShown(true);
            return;
        }
        if (data.title == '') {
            setError('Please set Title')
            seterrorShown(true);
            return;
        }
        seterrorShown(false);
        const result = await AddEvent({
            title: data.title,
            description:'',
            date: date ?? new Date,
            eventType:'Announcement'
        });
        console.log(result)
        if(result?.error == null){
            setDialogOpen(false);
            Snackctx.displayMsg('Event Added')
            router.refresh();
        }
    }
    return (
        <div>
            <div className='flex justify-center items-center'>
                <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
                    {/* <DialogTrigger asChild >
                        <Button onClick={()=>setDialogOpen(true)} className="flex items-center">Edit New <Plus /></Button>
                        </DialogTrigger> */}
                {dialogOpen && 
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add Announcement</DialogTitle>
                            <DialogDescription>
                                Add Announcements here. Click save when you are done.
                            </DialogDescription>
                        </DialogHeader>
                        {errorShown && <div className='bg-red-500 p-3 rounded-xl text-white'>
                            {Error}
                        </div>}
                        <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-start gap-2">
                                <Label htmlFor="name" className="text-right">
                                    Title
                                </Label>
                                <Input
                                    id="name"
                                    value={data.title}
                                    onChange={(e) =>setData({...data,'title':e.target.value})}
                                    defaultValue="Pedro Duarte"
                                    className="col-span-3"
                                />
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={data.description ?? ''}
                                    onChange={(e) =>setData({...data,'description':e.target.value})}
                                    defaultValue=""
                                    className="col-span-3"
                                />
                            </div>
                            <div className="flex flex-col w-full items-start gap-2">
                                <Label htmlFor="name" className="text-right">
                                    Date
                                </Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "justify-start text-left font-normal w-full",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {!date ? format(date ?? new Date(), "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                                        <Select
                                            onValueChange={(value) =>
                                                setDate(addDays(new Date(), parseInt(value)))
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent position="popper">
                                                <SelectItem value="0">Today</SelectItem>
                                                <SelectItem value="1">Tomorrow</SelectItem>
                                                <SelectItem value="3">In 3 days</SelectItem>
                                                <SelectItem value="7">In a week</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="rounded-md border">
                                            <Calendar mode="single" selected={date ?? new Date()} onSelect={setDate} />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={() => {
                                AddData()
                            }}>Add Announcement</Button>
                        </DialogFooter>
                    </DialogContent>
                }
                </Dialog>
            </div>
        </div>
    )
}

export default EditItem