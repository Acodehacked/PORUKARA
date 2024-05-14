'use client'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import SnackbarContext from '@/lib/Snackbar-context'
import { cn } from '@/lib/utils'
import { CommandList } from 'cmdk'
import { Calendar, Check, CheckCircle, ChevronsUpDown, DownloadCloud } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'

const Form = () => {
    const snackctx = useContext(SnackbarContext);
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const frameworks = [
        {
            value: "BCA",
            label: "BCA",
        },
        {
            value: "BA",
            label: "BA",
        }
    ];
    const handleClick = () => {
        snackctx.displayMsg('Application Will Available Soon')
    }
    return (
        <form className="px-4 bg-white mb-3 screen-md py-6 rounded-xl shadow-xl relative">
            <div className='absolute z-[1] sm:rounded-t-none sm:rounded-b-xl rounded-xl bg-yellow-500 sm:top-0 top-[-40px] right-[2rem]'>
                <Image className="p-0 " src={'/assets/graduatehat.png'} alt="" height={80} width={80} />
            </div>
            <div className="flex items-center gap-2">
                <Image className="p-0 " src={'/assets/logo-gold.png'} alt="" height={100} width={100} />
                <h3 className="text-[30px] font-semibold mt-3 mb-4">Apply For A Course</h3>
            </div>
            <div className='bg-red-100 text-red-900 px-6 py-3 rounded-md mt-2 mb-2 text-[13px]'>
                Admissions Open Admissions Open for BCA, BCOM with Finance and Taxation, BCOM with Computer Application, BA English Contact: 9446249412
            </div>
            <div className="flex md:flex-row flex-col gap-3">
                <div className="mt-2 px-2 w-full">
                    <label className="text-[15px]">Name</label>
                    <Input type="text" placeholder="Enter your name" />
                </div>
                <div className="mt-2 px-2 w-full">
                    <label className="text-[15px]">Email</label>
                    <Input type="email" placeholder="Enter your Email Address" />
                </div>
            </div>
            <div className="flex md:flex-row flex-col mt-2 gap-3">
                <div className="mt-2 px-2 w-full">
                    <label className="text-[15px]">Phone</label>
                    <div className="flex">
                        <Input type="text" className="max-w-[50px]" value={'+91'} readOnly />
                        <Input type="tel" className="w-full" placeholder="Enter your Phone" />
                    </div>
                </div>
                <div className="mt-2 px-2 flex flex-col w-full">
                    <label className="text-[15px]">Select Course</label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-full justify-between"
                            >
                                {value
                                    ? frameworks.find((framework) => framework.value === value)?.label
                                    : "Select Course..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0 z-[999]">
                            <Command>
                                <CommandInput placeholder="Search Course..." />
                                <CommandEmpty>No Courses found.</CommandEmpty>
                                <CommandList>
                                    <CommandGroup heading="UG Courses">
                                        {frameworks.map((framework) => (
                                            <CommandItem
                                                key={framework.value}
                                                value={framework.value}
                                                onSelect={(currentValue: string) => {
                                                    setValue(currentValue == value ? "" : currentValue);
                                                    setOpen(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value == framework.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {framework.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="flex md:flex-row flex-col mt-2 gap-3">
                <div className="mt-2 px-2 w-full">
                    <label className="text-[15px]">Address</label>
                    <Textarea placeholder="Enter your Address" />
                </div>
            </div>
            <div className='flex flex-col justify-between items-center gap-2'>
                <div className='flex sm:flex-row flex-col justify-end gap-4 mt-3'>
                    <Button variant={'outline'}>Download Application Form &nbsp;<DownloadCloud size={15} className='text-[13px]' /></Button>
                    <Button onClick={handleClick} type='button'>Apply for Course &nbsp; <CheckCircle size={15} /></Button>
                </div>
                <span className='text-[12px] text-red-800'>Online Application will open Soon!</span>

            </div>
        </form>
    )
}

export default Form