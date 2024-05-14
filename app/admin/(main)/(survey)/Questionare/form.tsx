'use client'
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useRef } from "react";
import AddResponse from "./api";
import SnackbarContext from "@/lib/Snackbar-context";
import { useRouter } from "next/navigation";

const SurveyForm = ({ MainData , gene_id }: {
  MainData: {
    title: string;
    type: "null" | "select" | "text" | "checkbox" | "int" | "yesno" | "havenot" | null;
    id: number;
    required: boolean;
    question_no: number;
    option_len: number | null;
    options_list: unknown;
    added_on: Date | null;
  }[],gene_id:string
}) => {
  const snackctx = useContext(SnackbarContext);
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    // window.addEventListener("beforeunload", (ev) => {
    //   ev.preventDefault();
    //   return ev.returnValue = 'Are you sure you want to close?';;
    // });
  }, [])
  const handlesubmit = async (data: FormData) => {
    const response = await AddResponse(data,gene_id);
    if(response.success){
      snackctx.displayMsg('Response Added');
      router.push(`/admin/Questionare?refreshId=${new Date().getTime()}`);
      ref.current?.reset();
    }else{
      snackctx.displayMsg('Already Added');
    }
  }
  return <form ref={ref} className="w-full" action={handlesubmit}>
    {MainData.map((item, index) => {
      let options = MainData[index].options_list as object;
      // let options = JSON.parse(MainData[index].options_list as string);
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
                {ptitle?.value}<span className="text-red-600">&nbsp;{ptype?.value == 'select_text' ? <input value={`${ptitle?.value}`} id={`${index}optionvalue${i}`} name={`${index}optionvalue`} type='radio' required /> : ''}</span>
              </div>
              {/* Multiple Choice */}
              {ptype?.value == 'checkbox' ? <input value={`${ptitle?.value}`} id={`${index}optionvalue${i}`} name={`${index}optionvalue${i}`} type='checkbox' /> : ''}
              {psub?.value !== undefined ? <input min={0} type="number" name={`${index}optionvalue${i}M`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`${psub?.value}`}/> : '' }
              {/* Single Choice */}
              {ptype?.value == 'select' ? <input value={`${ptitle?.value}`} id={`${index}optionvalue${i}`} name={`${index}optionvalue`} type='radio' required /> : ''}
              {ptype?.value == 'review' ? <div className="w-full flex gap-2 flex-wrap">
                {reviews.map((rv, ri) => {
                  return <label key={ri} htmlFor={`${index}optionvalue${i}${ri}`} className="flex gap-2 mt-2 px-4 py-2">
                    <span className="font-bold">{reviews[ri]}</span>
                    <input type="radio" required id={`${index}optionvalue${i}${ri}`} value={reviews[ri]} name={`${index}optionvalue${i}`} />
                  </label>
                })}
              </div> : ''}
            </div>
            {ptype?.value == 'number' ? <input type="number" min={0} name={`${index}optionvalue${i}`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`enter value for question ${item.title}`}></input> : ''}
            {ptype?.value == 'text' ? <input type="text" name={`${index}optionvalue${i}`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`enter value for question ${ptitle?.value}`}></input> : ''}
            {/* select_text */}
            {ptype?.value == 'select_text' ? <input type="text" name={`${index}optionvalueM`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`enter value for question ${ptitle?.value}`}></input> : ''}
          </label>
        )
      }
      return <div key={index} className="input-box mal flex flex-col items-start left-primary shadow-lg bg-white my-4 px-3 py-3">
        {item.required ? <h3 className="bg-red-600 text-white px-1 py-1 text-[8px] rounded-sm">*required</h3> : ''}
        <h3 className="text-[16px] font-regular flex mt-2 mal">{index + 1}.{item.title}</h3>
        {item.type == 'int' ? <input required={item.required ? true : false } type="number" min={0} name={`${index}response`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`enter value for question ${item.title}`}></input> : ''}
        {item.type == 'text' ? <input required={item.required ? true : false } type="text" name={`${index}response`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`enter value for question ${item.title}`}></input> : ''}
        {/* {item.type != "int" && item.type != 'text' ? <input required type="text" name={`response${index}`} hidden className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" placeholder={`enter value for question ${item.title}`}></input> : ''} */}
        {item.type == 'havenot' ? <div className="flex gap-2 mt-2">
          <label className="px-3 py-1 flex gap-2" htmlFor={`${index}response0`}>
            <span>{'ഉണ്ട്'}</span>
            <input value={'ഉണ്ട്'} required type="radio" id={`${index}response0`} name={`${index}response`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" />
          </label>
          <label className="px-3 py-1 flex gap-2" htmlFor={`${index}response1`}>
            <span>{'ഇല്ലാ'}</span>
            <input value={'ഇല്ലാ'} required type="radio" id={`${index}response1`} name={`${index}response`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" />
          </label>
        </div> : ''}
        {item.type == 'yesno' ? <div className="flex gap-2 mt-2">
          <label className="px-3 py-1 flex gap-2" htmlFor={`${index}response0`}>
            <span>{'അതെ'}</span>
            <input value={'അതെ'} required type="radio" id={`${index}response0`} name={`${index}response`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" />
          </label>
          <label className="px-3 py-1 flex gap-2" htmlFor={`${index}response1`}>
            <span>{'അല്ല'}</span>
            <input value={'അല്ല'} required type="radio" id={`${index}response1`} name={`${index}response`} className="px-4 py-2 mt-2 w-full rounded-sm bg-zinc-50 border-[0.01rem] border-zinc-500" />
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
  </form>
}

export default SurveyForm;