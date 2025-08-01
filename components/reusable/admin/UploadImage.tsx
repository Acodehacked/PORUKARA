'use client'
import axios from 'axios';
import { ChangeEventHandler, FormEventHandler, LegacyRef, MouseEvent, MouseEventHandler, useContext, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { formatRFC3339 } from 'date-fns';
import { Button } from '@/components/ui/button';
import SnackbarContext from '@/lib/Snackbar-context';
import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { uploadFile } from '@/db/aws';

const UploadImage = ({ onFilesChanged, text }: { onFilesChanged: (files: string) => void, text?: string | undefined }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const snackctx = useContext(SnackbarContext);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadedFiles, setUploadedFiles] = useState<string>('');
    const [uprogress, setuprogress] = useState(false);
    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const sendfiles = () => {
        if (uploadedFiles == '') {
            snackctx.displayMsg('Please upload one image');
            return;
        }
        onFilesChanged(uploadedFiles);
        setIsDialogOpen(false);
    }
    useEffect(() => {
        console.log(uploadedFiles)
    }, [uploadedFiles])
    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.currentTarget.files) return;
        setSelectedFile(event.currentTarget.files[0]);
        const unique_id = new Date().getTime();;
        const filename = unique_id+'.webp';
        setuprogress(true)
        const response = await uploadFile(filename,'mykuttanadu',event.currentTarget.files[0]);
        console.log(response.url);
        setUploadedFiles(response.url);
        setSelectedFile(null);
        setuprogress(false)
        snackctx.displayMsg('Image Uploaded')
    };

    const handleRemoveItem = (value: string) => {
        setUploadedFiles('');
    };

    return (
        <div>
            <Button variant={'outline'} onClick={openDialog}>{!text || text == '' ? 'Upload Image' : text}</Button>
            <AnimatePresence>
                {isDialogOpen &&
                    <motion.div className="dialog bg-[rgba(0,0,0,0.5)] fixed z-[999] top-0 bottom-0 right-0 left-0 flex justify-center items-center">
                        {isDialogOpen && <motion.div
                            className='bg-white p-2 rounded-sm max-w-[550px] w-full mx-4'
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className='flex justify-between items-center mb-2'>
                                <span className='text-[14px] ps-3'>Upload Files</span>
                                <button onClick={closeDialog} className='p-2'><X /></button>
                            </div>
                            <label htmlFor='uploadfile' className={cn('flex flex-col justify-center items-center p-3 mx-2 my-2 border-dashed border-zinc-500 border-[0.03rem]', selectedFile == null || !uprogress  ? 'flex' : 'hidden')}>
                                <form className='w-full h-full flex justify-center items-center'>
                                    <img src={'/assets/uploadfile.webp'} alt="uploadfile" width={100} height={100} />
                                    <span>Upload Images here</span>
                                    <input type="file" accept='.webp,.webp,.webp' id='uploadfile' name='file' className=' hidden' onChange={handleFileChange} />
                                    {/* <input className='' type="submit" value='submit' /> */}
                                </form>
                            </label>
                            <div className={cn('flex border-dashed border-[0.03rem] border-zinc-500 flex-col items-center justify-center w-full px-5 py-2', uprogress ? 'flex' : 'hidden')}>
                                <Loader className='text-[40px] font-bold mt-3 mb-2' />
                                <span className='mt-3'>uploading..</span>
                            </div>
                            <div className='flex flex-col px-2 max-h-[400px] overflow-y-scroll'>
                                {uploadedFiles.length > 0 ? <div>
                                    <span className='text-[13px] text-secondary mt-2 mb-2'>Uploaded files</span>
                                    {uploadedFiles != '' ? <div className='flex justify-between items-center px-3 py-1 my-1 bg-zinc-200 rounded-sm'>
                                        <img src={`https://mykuttanadu.s3.us-west-1.amazonaws.com/${uploadedFiles}`} alt={uploadedFiles} width={70} height={30} objectFit='cover' className="rounded-sm" />
                                        <button onClick={(e) => {
                                            handleRemoveItem(e.currentTarget.value)
                                        }} value={uploadedFiles} className='bg-zinc-600 p-2 rounded-sm text-white'><X /></button>
                                    </div> : ''}
                                </div> : <span className='text-[13px] text-secondary'>No Files Uploaded</span>}
                            </div>
                            <div className='flex px-2 justify-end mt-3'>
                                <Button variant={'default'} disabled={uploadedFiles.length > 0 ? false : true} onClick={sendfiles}>Confirm</Button>
                            </div>
                        </motion.div>
                        }
                    </motion.div>
                }

            </AnimatePresence >
        </div>
    );
};

export default UploadImage;
