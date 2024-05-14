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
import { AddPlace, deletePlace } from './api';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

type PlaceType = {
  id: number;
  app_category_id: number;
  name: string;
  phone: string[];
  email: string | null;
  website: string | null;
  description: string | null;
  images: string[];
  videos: string[];
  facilities: unknown;
  activities: unknown;
  nearest_places: number[];
  latitude: number;
  longitude: number;
}[];
type CategoryType = {
  id: number;
  type: unknown;
  name: string | null;
  image: string;
}[];

const Places = ({ data, categories }: {
  data: PlaceType,
  categories: CategoryType
}) => {
  const [image, setimage] = useState<string[]>([]);
  const [filteredList, setfilteredList] = useState<PlaceType>(data);
  const [loading, setloading] = useState(false);
  const [categoryid, setcategoryid] = useState(0);
  const [searchvalue, setsearchvalue] = useState('');
  const [name, setname] = useState('');
  const [desc, setdesc] = useState('');
  const router = useRouter()
  const [AddDialogOpen, setAddDialogOpen] = useState(false);
  const snackctx = useContext(SnackbarContext);
  const DeleteCate = async (id: number) => {
    const response = await deletePlace(id);
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
    if (desc == '') {
      snackctx.displayMsg("please enter a description");
      return;
    }
    if (categoryid == undefined) {
      snackctx.displayMsg("please select a category");
      return;
    }
    if (image.length == 0) {
      snackctx.displayMsg('Please Upload a image');
      return;
    }
    const response = await AddPlace(categoryid, name, desc, image);
    if (response.error == null) {
      setAddDialogOpen(false);
      router.refresh();
    }
  }
  // useEffect(() => {
  //   setfilteredList(data);
  // }, [])
  useEffect(() => {
    postdata();
  }, [categoryid]);
  const postdata = async () => {
    setloading(true);
    setfilteredList([]);
    const response = await fetch('/api/admin/Places',
      {
        method: 'POST',
        body: JSON.stringify({ value: categoryid })
      });
    response.json().then(res => {
      console.log(res.data)
      setData(res.data as PlaceType);
      setloading(false);
    });
  }
  const setData = (data:PlaceType) =>{
      setfilteredList(data);
      console.log(data)
  }
  useEffect(() => {
    if (searchvalue == '') {
      setfilteredList(data);
    }
  }, [searchvalue])

  return (
    <>
      <div className='w-full flex md:flex-row flex-col justify-between'>
        <div className='flex flex-col'>
          <h3 className="text-[30px]">Places</h3>
          <button className='bg-green-600 px-4 py-2 text-white rounded-sm shadow-sm' onClick={() => setAddDialogOpen(true)}>Add Place</button>
        </div>
        <div>
          <select className='px-4 py-2 rounded-sm' disabled={loading} onChange={(e) => setcategoryid(parseInt(e.currentTarget.value))}>
            <option value={0}>All</option>
            {categories.map((cate, index) => {
              return <option key={index} value={cate.id}>{cate.name}</option>
            })}
          </select>
          {/* <Input placeholder='search here' type='text' value={searchvalue} onChange={(e) => {
            setsearchvalue(e.currentTarget.value)
            setfilteredList(prev => prev.filter(item => item.name.includes(searchvalue)));
            console.log(e.currentTarget.value)
          }} /> */}
        </div>
      </div>

      <div className='grid md:grid-cols-4 mt-3 sm:grid-cols-2 grid-cols-1 gap-2'>
        {filteredList.map((place, index) => {
          return <div key={place.id} className='relative flex h-[100px] bg-white rounded-sm overflow-hidden'>
            <div className='w-[100px] me-1'>
              <Image src={`https://mykuttanadu.s3.us-west-1.amazonaws.com/${place.images[0]}`} className='w-full h-full object-cover' width={200} height={300} objectFit='cover' objectPosition='center' alt={place.name || ''} />
            </div>
            <div className='w-full flex justify-center items-center ps-3 font-semibold flex-col'>
              {place.name}
            </div>
            <button className='bg-red-500 text-[14px] absolute bottom-[5px] right-[5px] text-white p-3 rounded-md mt-2' onClick={() => {
              DeleteCate(place.id);
            }}><Trash2 /></button>
          </div>
        })}
        {filteredList.length == 0 && loading == true ? <>
            <div className='bg-zinc-300 rounded-sm w-full h-[100px]'></div>
            <div className='bg-zinc-300 rounded-sm w-full h-[100px]'></div>
            <div className='bg-zinc-300 rounded-sm w-full h-[100px]'></div>
            <div className='bg-zinc-300 rounded-sm w-full h-[100px]'></div>
            <div className='bg-zinc-300 rounded-sm w-full h-[100px]'></div>
            <div className='bg-zinc-300 rounded-sm w-full h-[100px]'></div>
            <div className='bg-zinc-300 rounded-sm w-full h-[100px]'></div>
        </> : ""}
        {filteredList.length == 0 && loading == false ? <>
            <div className='bg-red-500 text-white rounded-sm w-full h-[100px] flex justify-center items-center'>No places found</div>
        </> : ""}
      </div>
      <DialogContainer size={'lg'} open={AddDialogOpen} setOpen={setAddDialogOpen} title='Add Place'>
        <div className='flex w-full lg:flex-row flex-col items-start'>
          <div className='flex w-full flex-col'>
            <div className='px-3 w-full pt-4'>
              <span className='mt-3 text-[14px]'>Category</span>
              <select className='px-2 py-2 rounded-sm border-[0.01rem] border-zinc-200 w-full' onChange={(e) => {
                setcategoryid(parseInt(e.currentTarget.value));
              }} name='category'>
                <option>Select Category</option>
                {categories.map((category, index) => {
                  return <option key={index} value={category.id}>
                    {category.name}
                  </option>
                })}
              </select>
            </div>
            <div className='px-3 w-full pt-4'>
              <span className='mt-3 text-[14px]'>Name</span>
              <Input value={name} onChange={(e) => setname(e.currentTarget.value)} placeholder='Enter name' />
            </div>
            <div className='px-3 w-full pt-4'>
              <span className='mt-3 text-[14px]'>Name</span>
              <Textarea className='min-h-[100px]' value={desc} onChange={(e) => setdesc(e.currentTarget.value)} placeholder='Enter description' />
            </div>
          </div>
          <div className='px-3 w-full pt-4'>
            <span className='mt-3 text-[14px]'>Image</span>
            <div className='flex flex-wrap gap-2 mb-2'>
              {image.map((img, index) => {
                return <div key={index} className='max-h-[100px] overflow-hidden rounded-sm'><Image src={`https://mykuttanadu.s3.us-west-1.amazonaws.com/${img}`} alt={''} width={400} height={100} className='h-full w-full max-h-[100px] object-contain' /></div>
              })}
              {image.length == 0 ? <span className='text-secondary py-3 px-2 text-[14px]'>no images uploaded!</span> : ''}
            </div>
            <UploadImages text={image.length != 0 ? 'ReUpload Image' : ''} onFilesChanged={(file) => setimage(file)} />
          </div>
        </div>
        <div className='flex mt-4 p-3 w-full justify-end'>
          <Button onClick={handleSubmit} variant={'default'}>Add Place</Button>
        </div>
      </DialogContainer>
    </>
  )
}

export default Places