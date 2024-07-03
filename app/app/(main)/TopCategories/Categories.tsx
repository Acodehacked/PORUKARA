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
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { AddCategory, GetAllCategories, deleteCategory } from '../(api)/Categories';
import { AddTopCategory, EditTopCategory, GetAllTopCategories, deleteTopCategory } from '../(api)/TopCategories';
import { BiEdit, BiLoader, BiRefresh, BiX } from 'react-icons/bi';
import { cn } from '@/lib/utils';
type Category = {
  id: number;
  type: unknown;
  name: string | null;
  image: string;
  subSuggestions: number[];
};
type TopCategory = {
  image: string;
  name: string | null;
  id: number;
  subCategories: number[];
};
const Categories = ({ data, topcategories }: {
  data: Category[], topcategories: TopCategory[]
}) => {
  const [mainCategories, setmainCategories] = useState<Category[]>(data);
  const [topmainCategories, settopmainCategories] = useState<TopCategory[]>(topcategories);

  const [loading, setloading] = useState<boolean>(false);
  const [ids, setids] = useState(0);
  const [image, setimage] = useState<string>('');
  const [searchcategory, setsearchcategory] = useState('');
  const [filteredCategorylist, setfilteredCategorylist] = useState<Category[]>([]);

  const [name, setname] = useState('');
  const [userCategorylist, setuserCategorylist] = useState<number[]>([]);

  const router = useRouter()
  const [AddDialogOpen, setAddDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"edit" | "add">('add');
  const snackctx = useContext(SnackbarContext);
  const DeleteMainCate = async (id: number) => {
    const response = await deleteTopCategory(id);
    if (response.error == null) {
      snackctx.displayMsg(`Successfully Deleted ${id}`);
      handlerefresh();
      router.refresh()
    }
  }
  const EditCategory = async (id: number) => {
    var findcate = topmainCategories.find((item) => item.id == id);
    setname(findcate?.name ?? '');
    setids(id);
    // console.log(findcate?.subCategories[0])
    // setuserCategorylist(JSON.parse(findcate?.subCategories.toString() as string) ?? []);
    setuserCategorylist(findcate?.subCategories ?? []);
    setimage(findcate?.image ?? '');
    setDialogType('edit');
    setAddDialogOpen(true);
  }

  const handlerefresh = async () => {
    setloading(true);
    var res = await GetAllCategories();
    setmainCategories(res.data)
    var res2 = await GetAllTopCategories();
    settopmainCategories(res2.data)
    setloading(false);
    console.log(res)
    console.log(res2);
    router.refresh()
  }
  useEffect(() => {
    console.log('set');
    setfilteredCategorylist([]);
    if (searchcategory == '') { return; }
    var categorylist: Category[] = [];
    mainCategories.forEach(item => {
      if (item.name?.toLowerCase().includes(searchcategory.toLowerCase())) {
        var s3 = userCategorylist.find((num) => num == item.id);
        if (s3 == null || s3 == undefined) {
          categorylist.push(item)
        }
      }
    });
    setfilteredCategorylist(categorylist);
  }, [searchcategory])

  const handleSubmit = async () => {
    if (name == '') {
      snackctx.displayMsg("please enter a name");
      return;
    }
    if (userCategorylist.length == 0) {
      snackctx.displayMsg("please select atleast one category");
      return;
    }
    if (image == '') {
      snackctx.displayMsg('Please Upload a image');
      return;
    }
    setloading(true)
    const response = dialogType == 'add' ? await AddTopCategory(name, image, userCategorylist) : await EditTopCategory(ids,name, image,userCategorylist);
    if (response.error == null) {
      setAddDialogOpen(false);
      handlerefresh();
      setname('');
      setimage('');
      setuserCategorylist([]);
    } else {
      snackctx.displayMsg(response.error ?? '');
    }
    setloading(false)
    router.refresh();

  }
  useEffect(() => {
    console.log('image: ' + image)
  }, [image])
  return (
    <>
      <div className='flex items-center gap-4 mt-3'>
        <BiRefresh className={cn('rounded-full p-1 hover:bg-zinc-400', loading ? 'animate-spin' : '')} size={38} onClick={!loading ? handlerefresh : () => { }} />
        <h5 className='text-[35px]'>Top Categories</h5>
        <button className='bg-green-600 rounded-sm px-4 py-2 text-white' onClick={() => setAddDialogOpen(true)}>Add Category</button>
      </div>
      <div className='grid md:grid-cols-6 mt-3 sm:grid-cols-4 grid-cols-2 gap-2 mb-6'>
        {topmainCategories.map((category, index) => {
          return <div key={category.id} className='relative items-center flex h-[70px] bg-white rounded-sm overflow-hidden'>
            <div className='w-full items-center flex transition-all ps-2'>
              <Image src={`https://mykuttanadu.s3.us-west-1.amazonaws.com/${category.image}`} className='w-[50px] h-[50px] rounded-full' width={200} height={300} alt={category.name || ''} />
              <h3 className='p-2'>{category.name}</h3>
            </div>
            <div className='flex gap-2 absolute bottom-[5px] right-[5px]'>
              <button className='bg-zinc-700 text-[14px]  text-white p-2 rounded-md mt-2' onClick={() => {
                EditCategory(category.id);
              }}><BiEdit size={12} /></button>
              <button className='bg-red-500 text-[14px] text-white p-2 rounded-md mt-2' onClick={() => {
                DeleteMainCate(category.id);
              }}><Trash2 size={12} /></button>
            </div>
          </div>
        })}
        {topmainCategories.length == 0 && <span>No Top Categories</span>}
      </div>

      <DialogContainer open={AddDialogOpen} setOpen={setAddDialogOpen} title='Add Top Category'>
        <div className='px-3 w-full pt-4'>
          <span className='mt-3 text-[14px]'>Name</span>
          <Input value={name} onChange={(e) => setname(e.currentTarget.value)} placeholder='Enter name' />
        </div>
        <div className='px-3 w-full pt-4'>
          <span className='mt-3 text-[14px]'>Categories</span>
          <div className='border-[0.01rem] relative border-zinc-200 flex gap-1 flex-wrap p-2 rounded-sm'>
            {userCategorylist.map((itemnumber, index) => {
              var c1: Category | null = {
                image: '', name: '', id: 0, subSuggestions: [], type: 0
              };
              mainCategories.forEach(cat => {
                if (cat.id == itemnumber) {
                  c1 = cat;
                }
              })
              return <span key={index} className='bg-green-800 flex gap-2 px-3 py-1 text-white rounded-full'>{c1.name} <BiX className='hover:bg-black/60 p-1 rounded-full' onClick={() => {
                setuserCategorylist((prev) => prev.filter((item) => item != itemnumber));
              }} size={20} /></span>
            })}
            <input className='min-w-[200px] ps-2' value={searchcategory} onChange={(e) => setsearchcategory(e.currentTarget.value)} placeholder='Enter category' />
            {searchcategory != '' && <div className='bg-green-800 rounded-b-xl no-scrollbar shadow-lg cursor-pointer flex flex-col w-full p-1 absolute z-[9999] left-0 top-full max-h-[250px] overflow-y-scroll '>
              {filteredCategorylist.map((filtered, index) => {
                return <div key={index} onClick={() => {
                  setuserCategorylist((props) => [...props, filtered.id]);
                  setfilteredCategorylist([])
                  setsearchcategory('')
                }} className='px-3 py-1 w-full text-white hover:bg-black/40'><span>{filtered.name}</span></div>
              })}
              {filteredCategorylist.length == 0 && <span className='text-white p-2'>no category found!</span>}
            </div>}
          </div>
        </div>
        <div className='px-3 w-full pt-4'>
          <span className='mt-3 text-[14px]'>Image</span>
          {image != '' ? <div className='max-h-[100px] overflow-hidden'><Image src={`https://mykuttanadu.s3.us-west-1.amazonaws.com/${image}`} alt={''} width={400} height={100} className='h-full w-full max-h-[100px] object-contain' /></div> : ''}
          <UploadImage text={image != '' ? 'ReUpload Image' : ''} onFilesChanged={(file) => setimage(file)} />
        </div>
        <div className='flex mt-4 p-3 w-full justify-end'>
          <Button onClick={handleSubmit} variant={'default'}>{loading ? <span className='flex items-center gap-2'>loading <BiLoader /></span> : 'Add Category'}</Button>
        </div>
      </DialogContainer>
    </>
  )
}

export default Categories