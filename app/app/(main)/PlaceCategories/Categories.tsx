'use client'
import DialogContainer from '@/components/reusable/admin/DialogContainer';
import UploadImage from '@/components/reusable/admin/UploadImage';
import UploadImages from '@/components/reusable/admin/UploadImages'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SnackbarContext from '@/lib/Snackbar-context';
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { AddCategory, deleteCategory } from './api';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

const Categories = ({ data }: {
  data: {
    image: string;
    id: number;
    name: string | null;
  }[]
}) => {
  const [image, setimage] = useState<string>('');
  const [name, setname] = useState('');
  const router = useRouter()
  const [AddDialogOpen, setAddDialogOpen] = useState(false);
  const snackctx = useContext(SnackbarContext);
  const DeleteCate = async (id: number) => {
    const response = await deleteCategory(id);
    if (response.error == null) {
      snackctx.displayMsg(`Successfully Deleted ${id}`)
      router.refresh()
    }
  }
  const handleSubmit = async () => {
    if (name == '') {
      snackctx.displayMsg("please enter a name");
      return;
    }
    if (image == '') {
      snackctx.displayMsg('Please Upload a image');
      return;
    }
    const response = await AddCategory(name, image);
    if (response.error == null) {
      setAddDialogOpen(false);
      router.refresh();
    }
  }
  useEffect(() => {
    console.log('image: ' + image)
  }, [image])
  return (
    <>
      <button className='bg-green-600 px-4 py-2 text-white' onClick={() => setAddDialogOpen(true)}>Add Category</button>

      <div className='grid md:grid-cols-4 mt-3 sm:grid-cols-2 grid-cols-1 gap-2'>
        {data.map((category, index) => {
          return <div key={category.id} className='relative flex h-[100px] bg-white rounded-sm overflow-hidden'>
            <div className='w-[100px] me-1'>
              <Image src={`https://mykuttanadu.s3.us-west-1.amazonaws.com/${category.image}`} className='w-full h-full object-cover' width={200} height={300} objectFit='cover' objectPosition='center' alt={category.name || ''} />
            </div>
            <div className='w-full flex justify-start items-center ps-3 font-semibold flex-col'>
              {category.name}
            </div>
            <button className='bg-red-500 text-[14px] absolute bottom-[5px] right-[5px] text-white p-3 rounded-md mt-2' onClick={() => {
              DeleteCate(category.id);
            }}><Trash2 /></button>
          </div>
        })}
      </div>
      <DialogContainer open={AddDialogOpen} setOpen={setAddDialogOpen} title='Add Category'>
        <div className='px-3 w-full pt-4'>
          <span className='mt-3 text-[14px]'>Name</span>
          <Input value={name} onChange={(e) => setname(e.currentTarget.value)} placeholder='Enter name' />
        </div>
        <div className='px-3 w-full pt-4'>
          <span className='mt-3 text-[14px]'>Image</span>
          {image != '' ? <div className='max-h-[100px] overflow-hidden'><Image src={`https://mykuttanadu.s3.us-west-1.amazonaws.com/${image}`} alt={''} width={400} height={100} className='h-full w-full max-h-[100px] object-contain' /></div> : ''}
          <UploadImage text={image != '' ? 'ReUpload Image' : ''} onFilesChanged={(file) => setimage(file)} />
        </div>
        <div className='flex mt-4 p-3 w-full justify-end'>
          <Button onClick={handleSubmit} variant={'default'}>Add Category</Button>
        </div>
      </DialogContainer>
    </>
  )
}

export default Categories