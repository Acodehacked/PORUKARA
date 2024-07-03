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
import { Trash2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { cn, useDebounce } from '@/lib/utils';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { PANCHAYATS } from '@/constants';
import { PLACESKUTTANAD } from '@/constants/places';
import { RadioItem } from '@radix-ui/react-dropdown-menu';
import { BiDetail, BiX } from 'react-icons/bi';
import { Select } from '@/components/ui/select';
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlinePaid } from "react-icons/md";

type Location = google.maps.LatLng | undefined | null;
type AddFormData = {
    paid:boolean,
    endDate:Date,
    app_category_id:number,
    name:string,
    place:string,
    sub_place:string,
    panchayatId: number | null,
    wardNo: number | null,
    pinCode: number | null,
    address: string,
}

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
export const AddPlace = ({ categories, topcategories, suggestions }: {
    categories: {
        id: number;
        type: unknown;
        name: string | null;
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
    }[]
}) => {
    var map: any;
    var YPlace: google.maps.places.Place;
    const mapRef = useRef<HTMLDivElement>(null);
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
            // Loop through and get all the results.
            console.log(searchlocation)
            places.forEach((place) => {
            });


        } else {
            console.log('No results');
        }
    }
    const [searchsuggestion, setsearchsuggestion] = useState('');
    const [mainsuggestions, setmainsuggestions] = useState<SubSuggestions[]>(suggestions);
    const [mainEndDate, setmainEndDate] = useState<Date | null>(null);
    const [mainPaid, setMainPaid] = useState<boolean>(false);
    const [paidDurn, setpaidDurn] = useState<number>(0);
    const [filteredCategorylist, setfilteredCategorylist] = useState<SubSuggestions[]>([]);

    const [searchname, setsearchname] = useState('');
    const [topcategoryid, settopcategoryid] = useState(0);
    const [panchayatid, setpanchayatid] = useState(0);
    const [categoryid, setcategoryid] = useState(0);
    const [placesuggesttionlist, setplacesuggesttionlist] = useState<number[]>([]);
    const [image, setimage] = useState<string[]>([]);
    const [name, setname] = useState('');
    const [desc, setdesc] = useState('');
    const snackctx = useContext(SnackbarContext);
    const [searchlocation, setsearchlocation] = useState<Location>(null);
    const [gmaplist, setgmaplist] = useState<google.maps.places.Place[]>([]);

    const [placephonelist, setplacephonelist] = useState<string[]>([]);
    const [searcphone, setsearcphone] = useState('');

    const [placemaillist, setplacemaillist] = useState<string[]>([]);
    const [searchemail, setsearchemail] = useState('');

    const [placefacilitieslist, setplacefacilitieslist] = useState<string[]>([]);
    const [searchfaciltiy, setsearchfaciltiy] = useState('');


    useEffect(() => {
        setfilteredCategorylist([]);
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
        setfilteredCategorylist(categorylist);
    }, [searchsuggestion])
    let center;

    useEffect(() => {
        if (searchname == '') {
            setgmaplist([]);
        }
        findPlaces();
    }, [searchname]);

    useEffect(() => {
        if (searcphone != '') {
            if (searcphone.includes(',')) {
                var ar = searcphone.split(',')[0];
                setsearcphone('');
                setplacephonelist((prev) => [...prev, ar]);
            }
        }
    }, [searcphone]);
    useEffect(() => {
        if (searchemail != '') {
            if (searchemail.includes(',')) {
                var ar = searchemail.split(',')[0];
                setsearchemail('');
                setplacemaillist((prev) => [...prev, ar]);
            }
        }
    }, [searchemail])
    function add_years(dt: Date, n: number) {
        return new Date(dt.setFullYear(dt.getFullYear() + n));
    }
    useEffect(() => {
        var dt = new Date();
        dt = add_years(dt, paidDurn);
        console.log(dt);
        setmainEndDate(dt)
    }, [paidDurn])

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
        // const response = await AddPlace(categoryid, name, desc, image);
        // if (response.error == null) {
        //     setAddDialogOpen(false);
        //     router.refresh();
        // }
    }



    return <div className="screen">
        <div className='flex gap-3 lg:flex-row flex-col w-full'>
            <div className='w-full flex flex-col'>
                <h3 className='text-[35px]'>Add Place</h3>
                <h6 className='text-red-800  px-5 py-2 me-auto font-regular rounded-sm flex items-center'>Paid Details  <span className='ms-5 font-bold text-red-600'>
                    End Date: {`${mainEndDate?.getDay() ?? ''}/${mainEndDate?.getMonth() ?? ''}/${mainEndDate?.getFullYear() ?? 'free'}` ?? 'free'}
                </span></h6>
                <div className='flex md:flex-row flex-col mt-2 mb-1 mx-5  items-center cursor-pointer'>
                    <div className='w-full flex mx-3'>
                        <div onClick={() => {
                            setMainPaid(false);
                            setpaidDurn(1)
                            setmainEndDate(null);
                        }} className={cn('border-[0.1rem]  px-8 font-bold py-2 rounded-l-xl flex gap-2 items-center', mainPaid ? 'border-zinc-600 bg-transparent text-zinc-900' : "border-green-600 bg-green-700 text-white")}>
                            <IoPhonePortraitOutline />
                            <span>Free</span>
                        </div>
                        <div onClick={() => {
                            setMainPaid(true)
                        }} className={cn('border-[0.1rem]  px-8 font-bold py-2 rounded-r-xl flex gap-2 items-center', mainPaid ? "border-green-600 bg-green-700 text-white" : 'border-zinc-600 bg-transparent text-zinc-900')}>
                            <MdOutlinePaid />
                            <span>Paid</span>
                        </div>
                    </div>
                    <div className={cn('gap-3 mx-6 mb-3 mt-2 w-full', mainPaid ? 'flex' : 'hidden')}>
                        <div className='flex flex-col w-full'>
                            <span className='flex items-center gap-2 my-2'>Amount:  <span className='bg-red-900 rounded-sm text-white p-1'>{paidDurn==1?'3000':paidDurn==2?'5000':paidDurn==3?'7000':'10000'}</span></span>
                            <span>Enter Period</span>
                            {/* <Input placeholder='Enter Amount in Rs..' type='number' /> */}
                            <select value={paidDurn} onChange={(e) => setpaidDurn(parseInt(e.currentTarget?.value))} className='p-2 rounded-sm outline-none'>
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
                        <Input placeholder='search place' value={searchname} onChange={(e) => setsearchname(e.currentTarget?.value
                        )} />
                        {gmaplist.length > 0 && <div className='absolute bg-white top-full w-full p-1 flex flex-col z-[9]'>
                            {gmaplist.map((item, index) => {
                                return <div className='flex hover:bg-black/10 rounded-sm cursor-pointer p-2' onClick={() => {
                                    setsearchlocation(item.location)
                                    setsearchname(item.displayName ?? '')
                                    setgmaplist([]);
                                }} key={index}>
                                    <h5>{item.displayName}</h5>
                                    <h6 className='text-secondary'>{item.formattedAddress}</h6>
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
            </div>
            <div className='w-full flex flex-col'>
                <div className='flex w-full flex-col items-start'>
                    <div className='flex w-full flex-col'>
                        {/* right side */}
                        <h3 className=' text-zinc-700 px-4 py-2 text-[25px] flex items-center gap-2 mt-4'><BiDetail /> Main Details</h3>
                        <div className='flex gap-2 md:flex-row flex-col px-3 w-full pt-1'>
                            <div className='flex w-full flex-col'>
                                <span className='mt-3 text-[14px]'>Top Category</span>
                                <select className='px-2 py-2 rounded-sm border-[0.01rem] border-zinc-200 w-full' onChange={(e) => {
                                    settopcategoryid(parseInt(e.currentTarget.value));
                                }} name='category'>
                                    <option>Select Top Category</option>
                                    {topcategories.map((category, index) => {
                                        return <option key={index} value={category.id}>
                                            {category.name}
                                        </option>
                                    })}
                                </select>
                            </div>
                            <div className='flex w-full flex-col'>
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
                        </div>
                        <div className='px-3 w-full pt-4'>
                            <span className='mt-3 text-[14px]'>Title <span className='text-secondary text-[12px]'>shown in app</span></span>
                            <Input value={name} onChange={(e) => setname(e.currentTarget.value)} placeholder='Enter name' />
                        </div>
                        <div className='px-3 w-full pt-4'>
                            <span className='mt-3 text-[14px]'>Suggestions</span>
                            <div className='border-[0.01rem] relative border-zinc-200 bg-white flex gap-1 flex-wrap p-2 rounded-sm'>
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
                                <input className='min-w-[200px] ps-2' value={searchsuggestion} onChange={(e) => setsearchsuggestion(e.currentTarget.value)} placeholder='Enter suggestion' />
                                {searchsuggestion != '' && <div className='bg-green-800 rounded-b-xl no-scrollbar shadow-lg cursor-pointer flex flex-col w-full p-1 absolute z-[9999] left-0 top-full max-h-[250px] overflow-y-scroll '>
                                    {filteredCategorylist.map((filtered, index) => {
                                        return <div key={index} onClick={() => {
                                            setplacesuggesttionlist((props) => [...props, filtered.id]);
                                            setfilteredCategorylist([])
                                            setsearchsuggestion('')
                                        }} className='px-3 py-1 w-full text-white hover:bg-black/40'><span>{filtered.name}</span></div>
                                    })}
                                    {filteredCategorylist.length == 0 && <span className='text-white p-2'>no suggestions found!</span>}
                                </div>}
                            </div>
                        </div>
                        <div className='flex flex-row gap-3 px-3 w-full pt-2'>
                            <div className='w-full flex flex-col'>
                                <span className='mt-3 text-[14px]'>Place<span className='text-secondary text-[12px]'></span></span>
                                <Input type='search' list="languages" placeholder='Enter Place' />
                            </div>
                            <datalist id="languages">
                                {PLACESKUTTANAD.map((item, index) => {
                                    return <option key={index} value={item} />;
                                })}

                            </datalist>
                            <div className='flex flex-col w-full'>
                                <span className='mt-3 text-[14px]'>Sub Place<span className='text-secondary text-[12px]'></span></span>
                                <Input type='text' placeholder='Enter Sub Place' />
                            </div>
                        </div>
                        <div className='flex flex-row gap-3 px-3 w-full pt-4'>
                            <div className='w-full flex flex-col'>
                                <span className='mt-3 text-[14px]'>Panchayat</span>
                                <select className='px-2 py-2 rounded-sm border-[0.01rem] border-zinc-200 w-full' onChange={(e) => {
                                    setpanchayatid(parseInt(e.currentTarget.value));
                                }} name='category'>
                                    <option>Select Panchayat</option>
                                    {PANCHAYATS.map((category, index) => {
                                        return <option key={index} value={category.id}>
                                            {category.name}
                                        </option>
                                    })}
                                </select>
                            </div>
                            <div className='flex flex-col w-full'>
                                <span className='mt-3 text-[14px]'>Ward No <span className='text-secondary text-[12px]'></span></span>
                                <Input type='number' placeholder='Enter Ward No' />
                            </div>
                            <div className='flex flex-col w-full'>
                                <span className='mt-3 text-[14px]'>Pincode <span className='text-secondary text-[12px]'></span></span>
                                <Input type='number' placeholder='Enter Pincode No' />
                            </div>
                        </div>
                        <div className='px-3 w-full pt-4'>
                            <span className='mt-3 text-[14px]'>Description</span>
                            <Textarea className='min-h-[100px]' value={desc} onChange={(e) => setdesc(e.currentTarget.value)} placeholder='Enter description' />
                        </div>

                        <h3 className=' text-zinc-700 px-4 py-2 text-[25px] flex items-center gap-2 mt-4'><BiDetail /> Sub Details</h3>
                        <div className='flex flex-col md:flex-row gap-3 px-3 w-full pt-2'>
                            <div className='w-full flex flex-col'>
                                <span className='mt-3 text-[14px]'>Phone numbers</span>
                                <span className='text-[12px] text-zinc-400'>Add , between values</span>
                                <div className='border-[0.01rem] relative border-zinc-200 bg-white flex gap-1 flex-wrap p-2 rounded-sm'>
                                    {placephonelist.map((itemnumber, index) => {
                                        return <span key={index} className='bg-green-800 flex gap-2 px-3 py-1 text-white rounded-full'>{itemnumber} <BiX className='hover:bg-black/60 p-1 rounded-full' onClick={() => {
                                            setplacephonelist((prev) => prev.filter((item) => item != itemnumber));
                                        }} size={20} /></span>
                                    })}
                                    <input className='min-w-[100px] w-full max-w-[240px]  ps-2' value={searcphone} onChange={(e) => setsearcphone(e.currentTarget.value)} placeholder='Add Phone (add , between)' />
                                </div>
                            </div>
                            <div className='w-full flex flex-col'>
                                <span className='mt-3 text-[14px]'>Emails</span>
                                <span className='text-[12px] text-zinc-400'>Add , between values</span>
                                <div className='border-[0.01rem] relative border-zinc-200 bg-white flex gap-1 flex-wrap p-2 rounded-sm'>
                                    {placemaillist.map((itemnumber, index) => {
                                        return <span key={index} className='bg-green-800 flex gap-2 px-3 py-1 text-white rounded-full'>{itemnumber} <BiX className='hover:bg-black/60 p-1 rounded-full' onClick={() => {
                                            setplacemaillist((prev) => prev.filter((item) => item != itemnumber));
                                        }} size={20} /></span>
                                    })}
                                    <input className='min-w-[100px] w-full max-w-[240px]  ps-2' value={searchemail} onChange={(e) => setsearchemail(e.currentTarget.value)} placeholder='Add Phone (add , between)' />
                                </div>
                            </div>

                        </div>
                        <div className='flex flex-row gap-3 px-3 w-full pt-2'>
                            <div className='w-full flex flex-col'>
                                <span className='mt-3 text-[14px]'>Facilities<span className='text-secondary text-[12px]'></span></span>
                                <div className='border-zinc-400 border-[0.01rem] gap-2 rounded-md p-3 w-full flex md:flex-row flex-col'>
                                    <div className='flex w-full flex-col'>
                                        <Textarea name="" placeholder='Enter a facility' value={searchfaciltiy}
                                            onChange={(e) => setsearchfaciltiy(e.currentTarget?.value)} className='p-2 outline-none rounded-sm ' id=""></Textarea>
                                        <button onClick={() => {
                                            setplacefacilitieslist((prev) => [...prev, searchfaciltiy]);
                                            setsearchfaciltiy('');
                                        }} className='bg-primary py-1 px-4 rounded-sm my-2 me-auto text-white'>Add</button>
                                    </div>
                                    <div className='flex w-full flex-col gap-2'>
                                        <span className='text-zinc-600 text-[14px]'>Added List</span>
                                        {placefacilitieslist.map((fac, index) => {
                                            return <div key={index} className='bg-white items-center rounded-xl flex justify-between p-2'>
                                                <span>{fac.length > 30 ? `${fac.substring(0, 25)}...` : fac} </span>
                                                <BiX className='p-1 rounded hover:bg-black/30' size={25} onClick={() => {
                                                    setplacefacilitieslist((prev) => placefacilitieslist.filter((item) => item != fac));
                                                }} />
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className='flex flex-row gap-3 px-3 w-full pt-2'>
                            <div className='w-full flex flex-col'>
                                <span className='mt-3 text-[14px]'>Working Days<span className='text-secondary text-[12px]'></span></span>
                                <div className='flex gap-2 mt-2'>
                                    <div className='flex flex-col w-full '>
                                        <h4 className="text-[14px] text-zinc-500">From</h4>
                                        <select className='outline-none bg-white px-3 py-2 rounded-xl '>
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
                                        <select className='outline-none bg-white px-3 py-2 rounded-xl '>
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
                                        <Input type='text' placeholder='From Time' />
                                    </div>
                                    <div className='flex flex-col w-full '>
                                        <h4 className="text-[14px] text-zinc-500">To</h4>
                                        <Input type='text' placeholder='To Time' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='flex mt-4 p-3 w-full justify-end'>
                    <Button onClick={handleSubmit} variant={'default'}>Add Place</Button>
                </div>
            </div>
        </div>


    </div>
}