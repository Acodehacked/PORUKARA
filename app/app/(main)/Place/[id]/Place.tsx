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
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Loader2, Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn, useDebounce } from '@/lib/utils';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { PANCHAYATS } from '@/constants';
import { PLACESKUTTANAD, SOCIAL_TYPES } from '@/constants/places';
import { RadioItem } from '@radix-ui/react-dropdown-menu';
import { BiArrowBack, BiChevronLeft, BiChevronRight, BiDetail, BiLoaderCircle, BiRefresh, BiX } from 'react-icons/bi';
import { Select } from '@/components/ui/select';
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlinePaid } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLink, FaTelegram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { AddFormData } from '@/constants/types';
import Link from 'next/link';
import { getSubSuggestionsByCategory } from '../../AddPlace/api';
import { GetAllCategories } from '../../(api)/Categories';
import { EditPlace } from './api';
import { app_place } from '@/db/schema';

type Location = google.maps.LatLng | undefined | null;

type Category = {
    id: number;
    type: unknown;
    name: string | null;
    image: string;
    subSuggestions: number[];
};
type SubSuggestions = {
    id: number;
    name: string | null;
};
export const Place = ({ id, categories, topcategories, suggestions ,place }: {
    id:number,
    categories: {
        id: number;
        type: unknown;
        name: string | null;
        subSuggestions: number[];
        image: string;
    }[],
    topcategories: {
        id: number;
        name: string | null;
        image: string;
        subCategories: number[];
    }[],
    suggestions: {
        id: number;
        name: string | null;
    }[],
    place : typeof app_place.$inferSelect
}) => {
    var map: any;
    var YPlace: google.maps.places.Place;
    useEffect(() => {
        const loader = new Loader({
            apiKey: "AIzaSyCJPrBoXmSX7jyUzAfwJxoLxnh70fJJwsI",
            version: "weekly",
        });

        loader.load();
    }, []);
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
            setgmaplist(places)
            const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
            const bounds = new LatLngBounds();
            setsearchlocation(places[0].location);
            setMainFormData((prev) => ({
                ...prev, latitude: `${places[0].location?.lat()}` ?? '', longitude: `${places[0].location?.lng()}` ?? ''
            }))
            // Loop through and get all the results.

        } else {
            console.log('No results');
        }
    }

    //
    const [MainFormData, setMainFormData] = useState<AddFormData>({
        paid: place.paid,
        paidPeriod: place.paidPeriod,
        endDate: place.endDate ?? new Date(),
        name: place.name,
        place: place.place,
        description: place.description ?? '',
        sub_place: place.sub_place,
        panchayatId: place.panchayatId ?? 0,
        wardNo: place.wardNo,
        pinCode: place.pinCode,
        address: place.address,
        email: place.email ?? '',
        phone: place.phone,
        facilities: place.facilities,
        workingDays: place.workingDays,
        openingHours: place.openingTime,
        website: place.website,
        socialLinks: place.socialLinks,
        latitude: place.latitude,
        longitude: place.longitude
    })
    const [addsociallink, setaddsociallink] = useState<{
        type: string,
        link: string,
        text: string
    }>({
        type: '',
        link: 'https://',
        text: ''
    });
    const [searchsuggestion, setsearchsuggestion] = useState('');
    const [mainCategories, setmainCategories] = useState<Category[]>(categories);
    const [paidDurn, setpaidDurn] = useState<number>(0);

    const [searchname, setsearchname] = useState(place.googleLocation);
    const [categoryid, setcategoryid] = useState(place.app_category_id);
    const [mainsuggestions, setmainsuggestions] = useState<SubSuggestions[]>(suggestions);
    const [placesuggesttionlist, setplacesuggesttionlist] = useState<number[]>(place.app_sub_suggestions);
    const [image, setimage] = useState<string[]>(place.images);
    const snackctx = useContext(SnackbarContext);
    const [searchlocation, setsearchlocation] = useState<Location>(null);
    const [gmaplist, setgmaplist] = useState<google.maps.places.Place[]>([]);
    const [gmapopen, setgmapopen] = useState(false);
    const [searcphone, setsearcphone] = useState('');
    const [loading, setloading] = useState(false);

    const router = useRouter();
    const [searchfaciltiy, setsearchfaciltiy] = useState('');

    useEffect(() => {
        console.log(categoryid)
        setmainsubsugg();
    }, [categoryid]);

    useEffect(() => {
        if (searchsuggestion == '') { return; }
        var categorylist: SubSuggestions[] = [];
        mainsuggestions.forEach(item => {
            if (item.name?.toLowerCase().includes(searchsuggestion.toLowerCase())) {
                var s3 = placesuggesttionlist.find((num) => num == item.id);
                if (s3 == null || s3 == undefined) {
                    categorylist.push(item)
                }
            }
        });
    }, [searchsuggestion])
    let center;



    const setmainsubsugg = async () => {
        setmainsuggestions([]);
        var dta = await getSubSuggestionsByCategory(categoryid);
        setmainsuggestions(dta.data);
        console.log(dta.data);
    }
    const handlerefresh = async () => {
        setloading(true);
        var res = await GetAllCategories();
        setmainCategories(res.data);
        // setmainsuggestions(res2.data)
        setloading(false);
        console.log(res)
        // console.log(res2);
        snackctx.displayMsg('Data fetched successfully');
        router.refresh()
    }
    function isValidUrl(string: string) {
        try {
            new URL(string);
            return true;
        } catch (err) {
            return false;
        }
    }
    useEffect(() => {   
        if (searchname == '') {
            setgmaplist([]);
        }
        findPlaces();
    }, [searchname]);
    useEffect(() => {
        console.log(MainFormData)
    }, [MainFormData]);
    useEffect(() => {
        if (searcphone != '') {
            if (searcphone.includes(',')) {
                var ar = searcphone.split(',')[0];
                setsearcphone('');
                setMainFormData((prev) => ({ ...prev, phone: [...prev.phone, `${searcphone.replaceAll(',','')}`] }));
            }
        }
    }, [searcphone]);
    function add_years(dt: Date, n: number) {
        return new Date(dt.setFullYear(dt.getFullYear() + n));
    }
    useEffect(() => {
        var dt = new Date();
        dt = add_years(dt, MainFormData.paidPeriod);
        console.log(dt);
        setMainFormData(props => ({ ...props, endDate: dt }))
    }, [MainFormData.paidPeriod])

    const handleSubmit = async () => {
        if (searchname == '') {
            snackctx.displayMsg("please search a location");
            return;
        }
        if (MainFormData.name == '') {
            snackctx.displayMsg("please enter a name");
            return;
        }
        if (MainFormData.place == '') {
            snackctx.displayMsg("please enter a place");
            return;
        }
        if (MainFormData.description == '') {
            snackctx.displayMsg("please enter a description");
            return;
        }
        if (MainFormData.address == '') {
            snackctx.displayMsg("please enter an address");
            return;
        }
        if (categoryid == 0) {
            snackctx.displayMsg("please enter a category");
            return;
        }
        if (MainFormData.website != null && MainFormData.website != '') {
            if (!isValidUrl(MainFormData?.website ?? '')) {
                snackctx.displayMsg("please enter a valid website link");
                return;
            }
        }
        if (MainFormData.panchayatId == 0) {
            snackctx.displayMsg("please select a panchayat");
            return;
        }
        if (isNaN(MainFormData.wardNo ?? 0)) {
            snackctx.displayMsg("please enter Valid ward no");
            return;
        }
        if (image.length == 0) {
            snackctx.displayMsg('Please Upload a image');
            return;
        }
        if (MainFormData.paid) {
            if (MainFormData.paidPeriod == 0) {
                snackctx.displayMsg('Please Select paid period');
                return;
            }

        }
        setloading(true)
        const response = await EditPlace({
            id: id,
            cat_id: categoryid,
            formData: MainFormData,
            subSuggestions: placesuggesttionlist,
            image: image,
            maplocation: searchname
        });
        if (response.error != null) {
            setloading(false)
            snackctx.displayMsg('already added')
            router.refresh();
        } else {
            setloading(false)
            snackctx.displayMsg('Added Successfully')
            router.refresh();
        }
    }



    return <div className="screen">
        <div className='flex gap-3 lg:flex-row flex-col w-full'>
            <div className='w-full flex flex-col'>
                <h3 className='text-[35px] flex items-center gap-3'>
                    <Link href={'/app/Places'}>
                        <BiArrowBack className='rounded-full p-1 hover:bg-zinc-400' />
                    </Link>
                    Add Place
                    <BiRefresh className={cn('rounded-full p-1 hover:bg-zinc-400 text-green-700', loading ? 'animate-spin' : '')} size={38} onClick={!loading ? handlerefresh : () => { }} /> </h3>
                <h6 className='text-red-800  px-5 py-2 me-auto font-regular rounded-sm flex items-center'>Paid Details
                    {MainFormData.paid && <span className='ms-5 font-bold text-red-600'>
                        End Date: {`${MainFormData.endDate?.getDate() ?? ''}/${MainFormData.endDate?.getMonth() ?? ''}/${MainFormData.endDate?.getFullYear() ?? 'free'}` ?? 'free'}
                    </span>}
                </h6>
                <div className='flex md:flex-row flex-col mt-2 mb-1 mx-5  items-center cursor-pointer'>
                    <div className='w-full flex mx-3'>
                        <div onClick={() => {
                            setMainFormData(prev => ({ ...prev, paid: false, endDate: new Date(), paidPeriod: 1 }))
                        }} className={cn('border-[0.1rem]  px-8 font-bold py-2 rounded-l-xl flex gap-2 items-center', MainFormData.paid ? 'border-zinc-600 bg-transparent text-zinc-900' : "border-green-600 bg-green-700 text-white")}>
                            <IoPhonePortraitOutline />
                            <span>Free</span>
                        </div>
                        <div onClick={() => {
                            setMainFormData(prev => ({ ...prev, paid: true }))
                        }} className={cn('border-[0.1rem]  px-8 font-bold py-2 rounded-r-xl flex gap-2 items-center', MainFormData.paid ? "border-green-600 bg-green-700 text-white" : 'border-zinc-600 bg-transparent text-zinc-900')}>
                            <MdOutlinePaid />
                            <span>Paid</span>
                        </div>
                    </div>
                    <div className={cn('gap-3 mx-6 mb-3 mt-2 w-full', MainFormData.paid ? 'flex' : 'hidden')}>
                        <div className='flex flex-col w-full'>
                            <span className='flex items-center gap-2 my-2'>Amount:  <span className='bg-red-900 rounded-sm text-white p-1'>{MainFormData.paidPeriod == 1 ? '3000' : MainFormData.paidPeriod == 2 ? '5000' : MainFormData.paidPeriod == 3 ? '7000' : '0'}</span></span>
                            <span>Enter Period</span>
                            {/* <Input placeholder='Enter Amount in Rs..' type='number' /> */}
                            <select value={MainFormData.paidPeriod} onChange={(e) => setMainFormData((prev) => ({ ...prev, paidPeriod: parseInt(e.target.value) }))} className='p-2 rounded-sm outline-none'>
                                <option value={0}>Select Duration</option>
                                <option value={1}>1 year</option>
                                <option value={2}>2 years</option>
                                <option value={3}>3 years</option>
                            </select>
                        </div>
                        {/* <div className='flex flex-col w-full'>
                        <span>Enter End Date</span>
                        <Input type='date' placeholder='Enter End Date' />
                    </div> */}
                    </div>
                </div>
                <div className='px-3 w-full pt-4'>
                    <span className='mt-3 text-[14px]'>Google map location</span>
                    <div className='w-full relative'>
                        <Input placeholder='search place' value={searchname} onChange={(e) => {
                            setsearchname(e.currentTarget?.value)
                        }} onKeyUp={()=>{
                            setgmapopen(false);
                        }} />
                        {gmaplist.length > 0 && gmapopen && <div className='absolute bg-white top-full w-full p-1 flex flex-col z-[9]'>
                            {gmaplist.map((item, index) => {
                                return <div className='flex flex-col hover:bg-black/10 rounded-sm cursor-pointer p-2' onClick={() => {
                                    setsearchlocation(item.location)
                                    setgmapopen(false);
                                    setMainFormData((prev) => ({
                                        ...prev, latitude: `${item.location?.lat()}` ?? '', longitude: `${item.location?.lng()}` ?? ''
                                    }))
                                    setsearchname(item.displayName ?? '')
                                    setgmaplist([]);
                                }} key={index}>
                                    <h5>{item.displayName}</h5>
                                </div>
                            })}
                        </div>}
                    </div>
                    <div className='pt-3 mb-3 flex gap-2'>
                        <span className='bg-blue-800 p-2 text-[15px] rounded-sm text-white' >Latitude: {searchlocation?.lat().toFixed(4) ?? 0}</span>
                        <span className='bg-blue-800 p-2 text-[15px] rounded-sm text-white' >Longitude: {searchlocation?.lng().toFixed(4) ?? 0}</span>
                    </div>
                </div>
                <APIProvider apiKey={'AIzaSyCJPrBoXmSX7jyUzAfwJxoLxnh70fJJwsI'}>
                    <Map className='h-[200px] mt-3' center={searchlocation} defaultCenter={{ lat: 9.4073181, lng: 76.3847204 }} defaultZoom={17}>
                        <Marker position={searchlocation} />
                    </Map>
                </APIProvider>
                <div className='px-3 w-full pt-4'>
                    <span className='mt-3 text-[14px]'>Address</span>
                    <Textarea className='min-h-[100px]' value={MainFormData.address} onChange={(e) => setMainFormData(prev => ({ ...prev, address: `${e.target.value}` }))} placeholder='Enter Address' />
                </div>
                <div className='px-3 w-full pt-4 pb-4'>
                    <span className='mt-3 text-[14px]'>Image</span>
                    <div className='flex flex-wrap gap-2 mb-2'>
                        {image.map((img, index) => {
                            return <div key={index} className='max-h-[100px] overflow-hidden rounded-sm'><Image src={`https://mykuttanadu.s3.us-west-1.amazonaws.com/${img}`} alt={''} width={400} height={100} className='h-full w-full max-h-[100px] object-contain' /></div>
                        })}
                        {image.length == 0 ? <span className='text-secondary py-3 px-2 text-[14px]'>no images uploaded!</span> : ''}
                    </div>
                    <UploadImages text={image.length != 0 ? 'ReUpload Image' : ''} onFilesChanged={(file) => setimage(file)} />
                </div>
                <div className='flex flex-row gap-3 px-3 w-full pt-2'>
                    <div className='w-full flex flex-col'>
                        <span className='mt-3 text-[14px]'>Social Links<span className='text-secondary text-[12px]'></span></span>
                        <div className='border-zinc-400 border-[0.01rem] gap-2 rounded-md p-3 w-full flex md:flex-row flex-col'>
                            <div className='flex w-full flex-col gap-2'>
                                <div className='flex gap-2 w-full'>
                                    <select value={addsociallink.type}
                                        onChange={(e) => setaddsociallink(props => ({ ...props, type: `${e.target?.value}` }))}
                                        className='p-2 rounded-md'>
                                        <option value={''}>select-type</option>
                                        {SOCIAL_TYPES.map((item, index) => {
                                            return <option key={item.code} value={item.code}>{item.name}</option>
                                        })}
                                    </select>
                                    <Input value={addsociallink.text ?? ''} onChange={(e) => setaddsociallink(props => ({ ...props, text: `${e.target?.value}` }))} placeholder='Enter Title' />
                                </div>
                                <Textarea name="" placeholder='Enter Link' value={addsociallink.link}
                                    onChange={(e) => setaddsociallink(props => ({ ...props, link: `${e.target?.value}` }))} className='p-2 outline-none rounded-sm min-h-[50px]' id=""></Textarea>
                                <button onClick={() => {
                                    if (addsociallink.type == '') {
                                        snackctx.displayMsg('Select a type');
                                        return;
                                    }
                                    if (addsociallink.text == '') {
                                        snackctx.displayMsg('Enter a text');
                                        return;
                                    }
                                    if (addsociallink.link == '') {
                                        snackctx.displayMsg('Enter a link');
                                        return;
                                    }
                                    if (!isValidUrl(addsociallink.link)) {
                                        snackctx.displayMsg('Enter a valid url');
                                        return;
                                    }
                                    setMainFormData((prev) => ({ ...prev, socialLinks: [...prev.socialLinks, addsociallink] }));
                                    setaddsociallink({
                                        type: '',
                                        text: '',
                                        link: 'https://'
                                    });
                                }} className='bg-primary py-1 px-4 rounded-sm my-2 me-auto text-white'>Add</button>
                            </div>
                            <div className='flex w-full flex-col gap-2'>
                                <span className='text-zinc-600 text-[14px]'>Added List</span>
                                {MainFormData.socialLinks.map((fac, index) => {
                                    return <div key={index} className='bg-zinc-900 text-white items-center rounded-xl flex justify-between p-2'>
                                        <span className='flex gap-2 items-center'>{fac.type == 'YT' ? <FaYoutube /> : fac.type == 'IG' ? <FaInstagram /> : fac.type == 'TX' ? <FaTwitter /> : fac.type == 'FB' ? <FaFacebook /> : fac.type == 'TG' ? <FaTelegram /> : <FaLink />}{fac.text.length > 25 ? `${fac.text.substring(0, 25)}...` : fac.text} </span>
                                        <BiX className='p-1 rounded hover:bg-black/30' size={25} onClick={() => {
                                            setMainFormData((prev) => ({ ...prev, socialLinks: prev.socialLinks.filter((item) => item != fac) }));
                                        }} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-full flex flex-col'>
                <div className='flex w-full flex-col items-start'>
                    <div className='flex w-full flex-col'>
                        {/* right side */}
                        <div className='flex mt-4 p-3 w-full justify-end mb-6'>
                            <Button onClick={handleSubmit} variant={'destructive'} className='flex items-center gap-3' size={'lg'}>Add Place <BiChevronRight /></Button>
                        </div>
                        <h3 className=' text-zinc-700 px-4 py-2 text-[25px] flex items-center gap-2 mt-4'><BiDetail /> Main Details</h3>
                        <div className='px-3 w-full pt-4'>
                            <span className='mt-3 text-[14px]'>Title <span className='text-secondary text-[12px]'>shown in app</span></span>
                            <Input value={MainFormData.name ?? ''} onChange={(e) => setMainFormData(props => ({ ...props, name: `${e.target?.value}` }))} placeholder='Enter name' />
                        </div>
                        <div className='flex gap-2 md:flex-row flex-col px-3 w-full pt-1'>
                            <div className='flex w-full flex-col'>
                                <span className='mt-3 text-[14px]'>Category</span>
                                <select className='px-2 py-2 rounded-sm border-[0.01rem] border-zinc-200 w-full' onChange={(e) => {
                                    setcategoryid(parseInt(e.currentTarget.value));
                                }} name='category'>
                                    <option value={0}>Select Category</option>
                                    {mainCategories.map((category, index) => {
                                        return <option key={index} value={category.id}>
                                            {category.name}
                                        </option>
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className='px-3 w-full pt-4'>
                            <span className='mt-3 text-[14px]'>Suggestions</span>
                            <div className='border-[0.01rem] relative border-zinc-200 bg-white flex gap-1 flex-wrap p-2 rounded-sm'>
                                {mainsuggestions.length == 0 && categoryid != 0 && <div className='w-full flex justify-center items-center px-4 py-6'>
                                    <Loader2 size={30} className='text-green-800 animate-spin' />
                                </div>}
                                {placesuggesttionlist.map((itemnumber, index) => {
                                    var c1: SubSuggestions | null = {
                                        name: '', id: 0
                                    };
                                    mainsuggestions.forEach(cat => {
                                        if (cat.id == itemnumber) {
                                            c1 = cat;
                                        }
                                    })
                                    return <span key={index} className='bg-green-800 flex gap-2 px-3 py-1 text-white rounded-full'>{c1.name} <BiX className='hover:bg-black/60 p-1 rounded-full' onClick={() => {
                                        setplacesuggesttionlist((prev) => prev.filter((item) => item != itemnumber));
                                    }} size={20} /></span>
                                })}
                                {placesuggesttionlist.length > 0 && <span className='h-[1px] bg-zinc-500 w-full my-2'></span>}
                                <div className='flex flex-wrap gap-1 w-full'>
                                    {mainsuggestions.map((sug, index) => {
                                        if (placesuggesttionlist.includes(sug.id)) {
                                            return '';
                                        }
                                        return <div key={index}
                                            onClick={() => {
                                                setplacesuggesttionlist((props) => [...props, sug.id]);
                                                setsearchsuggestion('')
                                            }} className='px-3 cursor-pointer py-1 rounded-full text-green border-[0.01rem] border-green-700 hover:bg-black/40'><span>{sug.name}</span></div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row gap-3 px-3 w-full pt-2'>
                            <div className='w-full flex flex-col'>
                                <span className='mt-3 text-[14px]'>Place<span className='text-secondary text-[12px]'></span></span>
                                <Input type='search' list="languages"
                                    value={MainFormData.place}
                                    onChange={(e) => setMainFormData(props => ({ ...props, place: `${e.target?.value}` }))} placeholder='Enter Place' />
                            </div>
                            <datalist id="languages">
                                {PLACESKUTTANAD.map((item, index) => {
                                    return <option key={index} value={item} />;
                                })}

                            </datalist>
                            <div className='flex flex-col w-full'>
                                <span className='mt-3 text-[14px]'>Sub Place<span className='text-secondary text-[12px]'></span></span>
                                <Input type='text'
                                    value={MainFormData.sub_place}
                                    onChange={(e) => setMainFormData(props => ({ ...props, sub_place: `${e.target?.value}` }))} placeholder='Enter Sub Place' />
                            </div>
                        </div>
                        <div className='flex flex-row gap-3 px-3 w-full pt-4'>
                            <div className='w-full flex flex-col'>
                                <span className='mt-3 text-[14px]'>Panchayat</span>
                                <select className='px-2 py-2 rounded-sm border-[0.01rem] border-zinc-200 w-full' value={MainFormData.panchayatId ?? 0}
                                    onChange={(e) => setMainFormData(props => ({ ...props, panchayatId: parseInt(e.target?.value) }))}
                                    name='category'>
                                    <option value={0}>Select Panchayat</option>
                                    {PANCHAYATS.map((category, index) => {
                                        return <option key={index} value={category.id}>
                                            {category.name}
                                        </option>
                                    })}
                                </select>
                            </div>
                            <div className='flex flex-col w-full'>
                                <span className='mt-3 text-[14px]'>Ward No <span className='text-secondary text-[12px]'></span></span>
                                <Input type='number'
                                    value={MainFormData.wardNo ?? 0}
                                    onChange={(e) => setMainFormData(props => ({ ...props, wardNo: parseInt(e.target?.value ?? '0') }))} placeholder='Enter Ward No' />
                            </div>
                            <div className='flex flex-col w-full'>
                                <span className='mt-3 text-[14px]'>Pincode <span className='text-secondary text-[12px]'></span></span>
                                <Input type='number'
                                    min={0}
                                    value={MainFormData.pinCode ?? 0}
                                    onChange={(e) => setMainFormData(props => ({ ...props, pinCode: parseInt(e.target?.value ?? '0') }))} placeholder='Enter Pincode No' />
                            </div>
                        </div>
                        <div className='px-3 w-full pt-4'>
                            <span className='mt-3 text-[14px]'>Description</span>
                            <Textarea className='min-h-[100px]' value={MainFormData.description} onChange={(e) => setMainFormData(prev => ({ ...prev, description: `${e.target.value}` }))} placeholder='Enter description' />
                        </div>

                        <h3 className=' text-zinc-700 px-4 py-2 text-[25px] flex items-center gap-2 mt-4'><BiDetail /> Sub Details</h3>
                        <div className='flex flex-col md:flex-row gap-3 px-3 w-full pt-2'>
                            <div className='w-full flex flex-col'>
                                <span className='mt-3 text-[14px]'>Phone numbers</span>
                                <span className='text-[12px] text-zinc-400'>Add , between values</span>
                                <div className='border-[0.01rem] relative border-zinc-200 bg-white flex gap-1 flex-wrap p-2 rounded-sm'>
                                    {MainFormData.phone.map((itemnumber, index) => {
                                        return <span key={index} className='bg-green-800 flex gap-2 px-3 py-1 text-white rounded-full'>{itemnumber} <BiX className='hover:bg-black/60 p-1 rounded-full' onClick={() => {
                                            setMainFormData((prev) => ({ ...prev, phone: prev.phone.filter((item) => item != itemnumber) }));
                                        }} size={20} /></span>
                                    })}
                                    <input className='min-w-[100px] w-full max-w-[240px]  ps-2' value={searcphone} onChange={(e) => setsearcphone(e.currentTarget.value)} placeholder='Add Phone (add , between)' />
                                </div>
                            </div>
                            <div className='px-3 w-full pt-4'>
                                <span className='mt-3 text-[14px]'>Email {' (optional)'}</span>
                                <Input value={MainFormData.email ?? ''} onChange={(e) => setMainFormData(props => ({ ...props, email: `${e.target?.value}` }))} placeholder='Enter Email' />
                            </div>

                        </div>
                        <div className='px-3 w-full pt-4'>
                            <span className='mt-3 text-[14px]'>Website {' (optional)'}</span>
                            <Input value={MainFormData.website ?? ''} onChange={(e) => setMainFormData(props => ({ ...props, website: `${e.target?.value}` }))} placeholder='Enter Website link (starts with https://)' />
                        </div>
                        <div className='flex flex-row gap-3 px-3 w-full pt-2'>
                            <div className='w-full flex flex-col'>
                                <span className='mt-3 text-[14px]'>Facilities<span className='text-secondary text-[12px]'></span></span>
                                <div className='border-zinc-400 border-[0.01rem] gap-2 rounded-md p-3 w-full flex md:flex-row flex-col'>
                                    <div className='flex w-full flex-col'>
                                        <Textarea name="" placeholder='Enter a facility' value={searchfaciltiy}
                                            onChange={(e) => setsearchfaciltiy(e.currentTarget?.value)} className='p-2 outline-none rounded-sm ' id=""></Textarea>
                                        <button onClick={() => {
                                            setMainFormData((prev) => ({ ...prev, facilities: [...prev.facilities, `${searchfaciltiy}`] }));
                                            setsearchfaciltiy('');
                                        }} className='bg-primary py-1 px-4 rounded-sm my-2 me-auto text-white'>Add</button>
                                    </div>
                                    <div className='flex w-full flex-col gap-2'>
                                        <span className='text-zinc-600 text-[14px]'>Added List</span>
                                        {MainFormData.facilities.map((fac, index) => {
                                            return <div key={index} className='bg-white items-center rounded-xl flex justify-between p-2'>
                                                <span>{fac.length > 30 ? `${fac.substring(0, 25)}...` : fac} </span>
                                                <BiX className='p-1 rounded hover:bg-black/30' size={25} onClick={() => {
                                                    setMainFormData((prev) => ({ ...prev, facilities: prev.facilities.filter((item) => item != fac) }));
                                                }} />
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex md:flex-row flex-col gap-3 px-3 w-full pt-2 mb-10'>
                            <div className='w-full flex flex-col'>
                                <span className='mt-3 text-[14px]'>Working Days<span className='text-secondary text-[12px]'></span></span>
                                <div className='flex gap-2 mt-2'>
                                    <div className='flex flex-col w-full '>
                                        <h4 className="text-[14px] text-zinc-500">From</h4>
                                        <select
                                            value={MainFormData.workingDays?.from ?? ''}
                                            onChange={(e) => setMainFormData(prev => ({
                                                ...prev,
                                                workingDays: {
                                                    from: `${e.target.value}`,
                                                    to: prev.workingDays?.to ?? ''
                                                }
                                            }))}
                                            className='outline-none bg-white px-3 py-2 rounded-xl '>
                                            <option value="">--select--</option>
                                            <option value="Sun">Sunday</option>
                                            <option value="Mon">Monday</option>
                                            <option value="Tue">Tuesday</option>
                                            <option value="Wed">Wednesday</option>
                                            <option value="Thu">Thursday</option>
                                            <option value="Fri">Friday</option>
                                            <option value="Sat">Saturday</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-full'>
                                        <h4 className="text-[14px] text-zinc-500">To</h4>
                                        <select
                                            value={MainFormData.workingDays?.to ?? ''}
                                            onChange={(e) => setMainFormData(prev => ({
                                                ...prev,
                                                workingDays: {
                                                    to: `${e.target.value}`,
                                                    from: prev.workingDays?.from ?? ''
                                                }
                                            }))}
                                            className='outline-none bg-white px-3 py-2 rounded-xl '>
                                            <option value="Sun">Sunday</option>
                                            <option value="Mon">Monday</option>
                                            <option value="Tue">Tuesday</option>
                                            <option value="Wed">Wednesday</option>
                                            <option value="Thu">Thursday</option>
                                            <option value="Fri">Friday</option>
                                            <option value="Sat">Saturday</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-col w-full'>
                                <span className='mt-3 text-[14px]'>Opening Time<span className='text-secondary text-[12px]'></span></span>
                                <div className='flex gap-2 mt-2'>
                                    <div className='flex flex-col w-full '>
                                        <h4 className="text-[14px] text-zinc-500">From</h4>
                                        <Input
                                            value={MainFormData.openingHours?.from}
                                            onChange={(e) => setMainFormData(prev => ({
                                                ...prev,
                                                openingHours: {
                                                    from: `${e.target.value}`,
                                                    to: prev.openingHours?.to ?? ''
                                                }
                                            }))}
                                            type='text' placeholder='From Time' />
                                    </div>
                                    <div className='flex flex-col w-full '>
                                        <h4 className="text-[14px] text-zinc-500">To</h4>
                                        <Input value={MainFormData.openingHours?.to}
                                            onChange={(e) => setMainFormData(prev => ({
                                                ...prev,
                                                openingHours: {
                                                    from: prev.openingHours?.from ?? '',
                                                    to: `${e.target.value}`
                                                }
                                            }))} type='text' placeholder='To Time' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>


    </div>
}