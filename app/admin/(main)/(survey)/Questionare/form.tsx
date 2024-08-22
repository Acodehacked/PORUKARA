'use client'
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useRef, useState } from "react";
import AddResponse from "./api";
const { uuid } = require('uuidv4');
import SnackbarContext from "@/lib/Snackbar-context";
import { useRouter } from "next/navigation";
import { uploadFile } from "@/db/aws";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { BiLoaderCircle } from "react-icons/bi";
import { CheckCircle2Icon, ChevronUp } from "lucide-react";
import { ENV } from "@/constants/places";
import { randomUUID } from "crypto";
import Link from "next/link";
import { GetPermission } from "../AdminQuestions/api";

const SurveyForm = ({ id, MainData, gene_id,allowed }: {
  allowed:boolean,
  id: string,
  MainData: {
    title: string;
    type: "null" | "select" | "text" | "checkbox" | "int" | "yesno" | "havenot" | null;
    id: number;
    required: boolean;
    question_no: number;
    option_len: number | null;
    options_list: unknown;
    added_on: Date | null;
  }[], gene_id: string
}) => {
  const snackctx = useContext(SnackbarContext);
  const router = useRouter();
  const [permission, setpermission] = useState(allowed);
  const [generatedId, setgeneratedId] = useState(gene_id);
  const [uploading, setuploading] = useState(false);
  const [uploaded, setuploaded] = useState(false);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return ev.returnValue = 'Are you sure you want to close?';;
    });
  }, []);

  const RefreshGeneratedId = () => {
    const unique_id = uuid();
    GetAllData();
    setgeneratedId(unique_id)
  }
  const GetAllData = async () => {
    const response = await GetPermission();
    setpermission(response);
}
  const handlesubmit = async (data: FormData) => {
    setuploading(true);
    const response = await AddResponse(id, data, generatedId);
    if (response.success) {
      snackctx.displayMsg('Response Added');
      setuploading(false);
      setuploaded(true);
      setTimeout(() => {
        setuploaded(false);
        ref.current?.reset();
        router.push(`/admin/Questionare?refreshId=${new Date().getTime()}`);
      }, 1500)
    } else {
      snackctx.displayMsg('Already Added');
      setuploading(false);
    }
  }
  return <>
  {permission  ? <form ref={ref} className="w-full max-w-[600px] mx-auto" action={handlesubmit}>
      <div className="flex flex-col md:flex-row md:justify-between justify-center items-center">
        <h2 className="text-[11px] text-center md:m-0 mb-1" >id: {generatedId}</h2>
        <Button variant={'outline'} type="button" onClick={() => RefreshGeneratedId()}>Regenerate Id</Button>
      </div>
      {MainData.map((item, index) => {
        let options = ENV == 'live' ? MainData[index].options_list as unknown as object : JSON.parse(MainData[index].options_list as string);
        let rows = [];
        const len = item.option_len || 0;
        const alp = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        const reviews = ['SA', 'A', 'CS', 'DA', 'SDA'];

        // review,number,text,checkbox
        for (let i = 0; i < len; i++) {

          let ptype = Object.getOwnPropertyDescriptor(options, `optiontype${i}`);
          let ptitle = Object.getOwnPropertyDescriptor(options, `optiontitle${i}`)
          let psub = Object.getOwnPropertyDescriptor(options, `optionsubtitle${i}`)
          rows.push(
            <label htmlFor={`${index}optionvalue${i}`} key={i} className="input-box py-2 mt-1 flex flex-col items-start rounded-sm px-3 bg-zinc-100 w-full mal">
              <div className="flex flex-wrap gap-3 ">
                <div className="w-full mal">
                  <b>{alp[i]}</b>.
                  {ptitle?.value}<span className="text-red-600">&nbsp;{ptype?.value == 'select_text' ? <input value={`${ptitle?.value}`} id={`${index}optionvalue${i}`} name={`${item.question_no}optionvalue`} type='radio' required={item.required} /> : ''}</span>
                </div>
                {/* Multiple Choice */}
                {ptype?.value == 'checkbox' ? <input value={`${ptitle?.value}`} id={`${index}optionvalue${i}`} name={`${item.question_no}optionvalue${i}`} type='checkbox' /> : ''}
                {psub?.value != undefined ? <input min={0} type="number" name={`${item.question_no}optionvalue${i}M`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`${psub?.value}`} step='0.01' /> : ''}
                {/* Single Choice */}
                {ptype?.value == 'select' ? <input value={`${ptitle?.value}`} id={`${index}optionvalue${i}`} name={`${item.question_no}optionvalue`} type='radio' required={item.required} /> : ''}
                {ptype?.value == 'review' ? <div className="w-full flex gap-2 flex-wrap">
                  {reviews.map((rv, ri) => {
                    return <label key={ri} htmlFor={`${index}optionvalue${i}${ri}`} className="flex gap-2 mt-2 px-4 py-2">
                      <span className="font-bold">{reviews[ri]}</span>
                      <input type="radio" required id={`${index}optionvalue${i}${ri}`} value={reviews[ri]} name={`${item.question_no}optionvalue${i}`} />
                    </label>
                  })}
                </div> : ''}
              </div>
              {ptype?.value == 'number' ? <input type="number" min={0} name={`${item.question_no}optionvalue${i}`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`enter value for question ${item.title}`}></input> : ''}
              {ptype?.value == 'text' ? <input type="text" name={`${item.question_no}optionvalue${i}`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`enter value for question ${ptitle?.value}`}></input> : ''}
              {/* select_text */}
              {ptype?.value == 'select_text' ? <input type="text" name={`${item.question_no}optionvalueM`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`enter value for question ${ptitle?.value}`}></input> : ''}
            </label>
          )
        }
        return <div key={index} className="input-box mal flex flex-col items-start left-primary shadow-lg bg-white my-4 px-3 py-3">
          {item.required ? <h3 className="bg-red-600 text-white px-1 py-1 text-[8px] rounded-sm">*required</h3> : ''}
          <h3 className="text-[16px] font-regular flex mt-2 mal">{item.question_no}.{item.title}</h3>
          {item.type == 'int' ? <input required={item.required ? true : false} type="number" min={0} name={`${item.question_no}response`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`enter value for question ${item.title}`}></input> : ''}
          {item.type == 'text' ? <input required={item.required ? true : false} type="text" name={`${item.question_no}response`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`enter value for question ${item.title}`}></input> : ''}
          {/* {item.type != "int" && item.type != 'text' ? <input required type="text" name={`response${index}`} hidden className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`enter value for question ${item.title}`}></input> : ''} */}
          {item.type == 'havenot' ? <div className="flex gap-2 mt-2">
            <label className="px-3 py-1 flex gap-2" htmlFor={`${index}response0`}>
              <span>{'ഉണ്ട്'}</span>
              <input value={'ഉണ്ട്'} required type="radio" id={`${index}response0`} name={`${item.question_no}response`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" />
            </label>
            <label className="px-3 py-1 flex gap-2" htmlFor={`${index}response1`}>
              <span>{'ഇല്ലാ'}</span>
              <input value={'ഇല്ലാ'} required type="radio" id={`${index}response1`} name={`${item.question_no}response`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" />
            </label>
          </div> : ''}
          {item.type == 'yesno' ? <div className="flex gap-2 mt-2">
            <label className="px-3 py-1 flex gap-2" htmlFor={`${index}response0`}>
              <span>{'അതെ'}</span>
              <input value={'അതെ'} required type="radio" id={`${index}response0`} name={`${item.question_no}response`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" />
            </label>
            <label className="px-3 py-1 flex gap-2" htmlFor={`${index}response1`}>
              <span>{'അല്ല'}</span>
              <input value={'അല്ല'} required type="radio" id={`${index}response1`} name={`${item.question_no}response`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" />
            </label>
          </div> : ''}
          <div className="flex flex-col px-3 pt-3 w-full">
            <h6 className="text-secondary text-[11px]">please fill this</h6>
            {rows}
          </div>
        </div>
      })}
      <div className="mt-5 px-5">
        <Button className="">Submit</Button>
      </div>
      <div>
        <Link href={'#home'} className="text-zinc-800 bg-white px-3 py-2 rounded-sm border-[0.01rem] border-zinc-400 fixed bottom-[20px] z-[99] right-[35px]" >
          <ChevronUp size={30} />
        </Link>
      </div>
    </form> : <div className="flex min-h-[70vh] flex-col justify-start items-center gap-1">
        <Image alt="Porukara college Logo" src={'/assets/logo-gold.png'} height={100} width={100} />
        <h4 className="text-[25px] text-center font-semibold">Web Survey is now Closed</h4>
        <span className="text-[15px] mb-3 text-center">You Cannot submit / open this survey right now. It will open soon!</span>
        <Button onClick={()=>GetAllData()} variant={'outline'}>Refresh</Button>
      </div>}
    
    <AnimatePresence>
      {
        uploading && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 px-5 flex items-center justify-center z-[9999]'>
          <div className='max-w-[500px] min-h-[150px] justify-center w-full flex flex-col items-center rounded-xl bg-white px-3 py-2 '>
            <div className='w-full flex flex-col items-center gap-2'>
              <BiLoaderCircle size={50} className="text-primary animate-spin ease-in-out" />
              <h2 className="mt-3 mb-2">Please wait</h2>
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>
    <AnimatePresence>
      {
        uploaded && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='bg-black/50 fixed top-0 bottom-0 left-0 right-0 px-5 flex items-center justify-center z-[9999]'>
          <div className='max-w-[500px] min-h-[150px] justify-center w-full flex flex-col items-center rounded-sm bg-white px-3 py-4'>
            <div className='w-full flex flex-col items-center gap-2'>
              <CheckCircle2Icon size={50} className="text-green-500" />
              <h2 className="text-center text-green-800 font-semibold mt-4">Questionare Submitted Successfully</h2>
              <span className="text-center text-[13px] mb-4 text-zinc-500">id: {gene_id}</span>
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>

  </>
}

export default SurveyForm;