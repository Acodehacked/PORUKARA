'use client'
import { Input } from '@/components/ui/input';
import SnackbarContext from '@/lib/Snackbar-context';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { deletePlace } from './api';
import { useRouter } from 'next/navigation';
import { Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ENV } from '@/constants/places';
import { GetAllCategories } from '../(api)/Categories';
import { GetAllPlaces } from '../(api)/Places';
import { BiSolidStar, BiStar } from 'react-icons/bi';

type PlaceType = {
  id: number;
  paid: boolean;
  paidPeriod: number;
  endDate: Date | null;
  googleLocation: string;
  app_category_id: number;
  name: string;
  phone: string[];
  email: string | null;
  website: string | null;
  description: string | null;
  images: string[];
  videos: string[];
  facilities: unknown;
  address: string,
  activities: unknown;
  nearest_places: number[];
  latitude: number;
  longitude: number;
}[];
type CategoryType = {
  id: number;
  name: string | null;
  type: unknown;
  image: string;
  subSuggestions: number[];
}[];
type Location = google.maps.LatLng | undefined | null;

const Places = ({ data, categories }: {
  data: PlaceType,
  categories: CategoryType
}) => {


  const [searchname, setsearchname] = useState('');
  const [mainData, setmainData] = useState<PlaceType>(data);
  const [mainCategories, setmainCategories] = useState<CategoryType>(categories);
  const [searchlocation, setsearchlocation] = useState<Location>(null)
  let center;


  const [filteredList, setfilteredList] = useState<PlaceType>(mainData);
  const [loading, setloading] = useState(false);
  const [categoryid, setcategoryid] = useState(0);
  const [searchvalue, setsearchvalue] = useState('');

  const router = useRouter()
  const [AddDialogOpen, setAddDialogOpen] = useState(false);
  const snackctx = useContext(SnackbarContext);
  const DeleteCate = async (id: number) => {
    const response = await deletePlace(id);
    if (response.error == null) {
      snackctx.displayMsg(`Successfully Deleted ${id}`)
    }
    handlerefresh();
  }

  const handlerefresh = async () => {
    setloading(true);
    var res = await GetAllCategories();
    setmainCategories(res.data)
    var res2 = await GetAllPlaces();
    if (res2.data != null) {
      setmainData(res2.data)
    }
    setloading(false);
    router.refresh()

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
  const setData = (data: PlaceType) => {
    setfilteredList(data);
    console.log(data)
  }


  useEffect(() => {
    if (searchvalue == '') {
      setfilteredList(mainData);
    }
  }, [searchvalue])

  return (
    <>
      <div className='w-full flex gap-3 md:flex-row flex-col justify-between'>
        <div className='flex items-center gap-3'>
          <h3 className="text-[30px]">Places</h3>
          <Link href={'/app/AddPlace'} className='bg-primary px-4 py-2 text-white rounded-full shadow-sm' >Add Place</Link>
        </div>
        <div className='flex items-center'>
          <select className='px-4 py-2 rounded-l-xl' disabled={loading} onChange={(e) => setcategoryid(parseInt(e.currentTarget.value))}>
            <option value={0}>All</option>
            {categories.map((cate, index) => {
              return <option key={index} value={cate.id}>{cate.name}</option>
            })}
          </select>
          <Input className='rounded-none rounded-r-xl' placeholder='search here' type='text' value={searchvalue} onChange={(e) => {
            setsearchvalue(e.currentTarget.value)
            setfilteredList(prev => prev.filter(item => item.name.includes(searchvalue)));
            console.log(e.currentTarget.value)
          }} />
        </div>
      </div>
      <div>
        <span className='text-zinc-500 ps-3 py-2 my-2 font-semibold text-[20px]'>Total : {filteredList.length} results</span>
      </div>
      <div className='grid md:grid-cols-6 mt-3 sm:grid-cols-2 grid-cols-1 gap-2'>
        {filteredList.map((place, index) => {
          var vid = '';
          mainCategories.forEach((cat) => {
            if (cat.id == place.app_category_id) {
              vid = cat.name ?? '';
            }
          })
          return <div key={place.id} className='relative flex flex-col bg-white rounded-xl overflow-hidden shadow-xl'>
            <div className='w-full me-1'>
              {ENV == 'local' ? <Image src={`https://mykuttanadu.s3.us-west-1.amazonaws.com/${(JSON.parse(place.images as unknown as string))[0]}`} className='w-full h-[130px] object-cover' width={200} height={300} alt={place.name || ''} /> : <Image src={`https://mykuttanadu.s3.us-west-1.amazonaws.com/${place.images[0]}`} className='w-full h-[130px] object-cover' width={200} height={300} objectFit='cover' objectPosition='center' alt={place.name || ''} />}
            </div>
            <div className='absolute top-1 right-1 flex items-start'>
              <div className='rounded-full bg-white flex items-center gap-1 px-2 py-1'>
                <BiSolidStar size={10} className='text-yellow-400' />
                <span className='text-[10px] font-bold'>4.3/5</span>
              </div>
            </div>
            <div className='px-3 pt-3 flex flex-col'>
              <div className='flex gap-2 items-center'>
                <span className='bg-primary text-white px-3 py-1 rounded-full text-[10px]'>
                  {vid != '' && <span>
                    {vid}
                  </span>}
                </span>
                {place.paid && <span className='bg-yellow-500 text-white me-auto px-3 py-1 rounded-full text-[10px]'>
                  paid
                </span>}
              </div>
              <h3 className='text-zinc-900 text-[20px] mt-1'>{place.name.length > 25 ? `${place.name.substring(0, 20)}...` : place.name}</h3>
              <h3 className='text-zinc-500 text-[12px]'>{place.address.length > 40 ? `${place.address.substring(0, 40)}...` : place.address}</h3>

            </div>
            <div className='flex gap-2 p-2 justify-end'>
              <Link href={`/app/Place/${place.id}`} className='text-zin-900-500 hover:bg-zinc-200 bg-zinc-50 p-2 rounded-md' onClick={() => {

              }}><Edit2 size={13} /></Link>
              <button className='text-red-500 hover:bg-zinc-200 bg-zinc-50 p-2 rounded-md' onClick={() => {
                DeleteCate(place.id);
              }}><Trash2 size={13} /></button>
            </div>
          </div>
        })}
        {filteredList.length == 0 && loading == true ? <>
          <div className='bg-zinc-300 animate-pulse rounded-sm w-full h-[100px]'></div>
          <div className='bg-zinc-300 animate-pulse rounded-sm w-full h-[100px]'></div>
          <div className='bg-zinc-300 animate-pulse rounded-sm w-full h-[100px]'></div>
          <div className='bg-zinc-300 animate-pulse rounded-sm w-full h-[100px]'></div>
          <div className='bg-zinc-300 animate-pulse rounded-sm w-full h-[100px]'></div>
          <div className='bg-zinc-300 animate-pulse rounded-sm w-full h-[100px]'></div>
          <div className='bg-zinc-300 animate-pulse rounded-sm w-full h-[100px]'></div>
        </> : ""}
        {filteredList.length == 0 && loading == false ? <>
          <div className='bg-red-500 text-white rounded-sm w-full h-[100px] flex justify-center items-center'>No places found</div>
        </> : ""}
      </div>
    </>
  )
}

export default Places