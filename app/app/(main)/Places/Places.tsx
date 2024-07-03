'use client'
import DialogContainer from '@/components/reusable/admin/DialogContainer';
import UploadImage from '@/components/reusable/admin/UploadImage';
import UploadImages from '@/components/reusable/admin/UploadImages'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import SnackbarContext from '@/lib/Snackbar-context';
import { motion } from 'framer-motion'
import { Loader } from "@googlemaps/js-api-loader"
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { AddPlace, deletePlace } from './api';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useDebounce } from '@/lib/utils';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import Link from 'next/link';

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
type Location = google.maps.LatLng | undefined | null;

const Places = ({ data, categories }: {
  data: PlaceType,
  categories: CategoryType
}) => {


  var map: any;
  const loader = new Loader({
    apiKey: "AIzaSyCJPrBoXmSX7jyUzAfwJxoLxnh70fJJwsI",
    version: "weekly",
  });
  loader.load();
  const [searchname, setsearchname] = useState('');
  const [searchlocation, setsearchlocation] = useState<Location>(null)
  let center;

  async function findPlaces() {
    console.log('in finding')
    const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    const request = {
      textQuery: searchname,
      fields: ['displayName', 'location', 'businessStatus'],
      // includedType: 'restaurant',
      locationBias: { lat: 37.4161493, lng: -122.0812166 },
      // isOpenNow: true,
      language: 'en-US',
      maxResultCount: 8,
      // minRating: 3.2,
      region: 'in',
      useStrictTypeFiltering: false,
    };

    //@ts-ignore
    const { places } = await Place.searchByText(request);

    if (places.length) {
      console.log(places);

      const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
      const bounds = new LatLngBounds();
      setsearchlocation(places[0].location);
      // Loop through and get all the results.
      places.forEach((place) => {
      });


    } else {
      console.log('No results');
    }
  }


  const [filteredList, setfilteredList] = useState<PlaceType>(data);
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
      router.refresh()
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
  const setData = (data: PlaceType) => {
    setfilteredList(data);
    console.log(data)
  }
  useEffect(() => {
    console.log(searchname);
    findPlaces();
  }, [searchname]);


  useEffect(() => {
    if (searchvalue == '') {
      setfilteredList(data);
    }
  }, [searchvalue])

  return (
    <>
      <div className='w-full flex gap-3 md:flex-row flex-col justify-between'>
        <div className='flex flex-col'>
          <h3 className="text-[30px]">Places</h3>
          <Link href={'/app/AddPlace'} className='bg-green-600 px-4 py-2 text-white rounded-sm shadow-sm' >Add Place</Link>
          
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
    </>
  )
}

export default Places