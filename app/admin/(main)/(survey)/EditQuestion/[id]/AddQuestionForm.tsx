'use client'
import { Button } from '@/components/ui/button';
import { ENV } from '@/constants/places';
import SnackbarContext from '@/lib/Snackbar-context';
import { Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

type TypesofType = "null" | "select" | "text" | "checkbox" | "int" | "yesno" | "havenot" | null;
const EditQuestionForm = ({ question }: { question: {
    id: number;
    title: string;
    type: TypesofType;
    required: boolean;
    question_no: number;
    option_len: number | null;
    options_list: unknown;
    added_on: Date | null;
} }) => {
    const [inputValues, setInputValues] = useState({});

    const [QuestionNo, setQuestionNo] = useState(question.question_no)
    let row = [];
    const [lengthofOptions, setlengthofOptions] = useState(question.option_len ?? 0);
    const [title, setTitle] = useState(question.title);
    const [type, setType] = useState<TypesofType>(question.type);
    const router = useRouter();
    const [Required, setRequired] = useState(question.required);
    const snackctx = useContext(SnackbarContext);

    useEffect(()=>{
        setInputValues(ENV == 'live' ? question.options_list as object : JSON.parse(question.options_list as string) as unknown as object);
        console.log(question.options_list)
        setType(question.type);
    },[question.options_list])
    const handleoptionValue = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setInputValues({
            ...inputValues,
            [e.target.id]: e.target.value
        })

    }
    useEffect(()=>{
        console.log(inputValues);
    },[inputValues])
    const handlesubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (title == '') {
            snackctx.displayMsg('please set title')
            return;
        }
        
        for (let i = 0; i < lengthofOptions; i++) {
            if (lengthofOptions == 0) { continue }
            const descriptor1 = Object.getOwnPropertyDescriptor(inputValues, `optiontitle${i}`);
            const descriptor3 = Object.getOwnPropertyDescriptor(inputValues, `optiontype${i}`);
            if (descriptor1?.value == '' || descriptor1?.value == undefined) {
                snackctx.displayMsg('please set option titles')
                console.log('please set option titles')
                return;
            }
            if (descriptor3?.value == '' || descriptor1?.value == undefined) {
                snackctx.displayMsg('please set option type')
                console.log('please set option type')
                return;
            }
        }
        fetch('/api/admin/FormEditQuestion', {
            method: 'POST',
            body: JSON.stringify({
                id:question.id,
                question_no: QuestionNo,
                title: title,
                nrequired: Required ? 1 : 0,
                btype: type,
                optionlen: lengthofOptions,
                optionslist: inputValues
            }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    snackctx.displayMsg('edited!');
                } else {
                    snackctx.displayMsg('Error in Editing Question!');
                }
            })
    }
    for (let i = 0; i < lengthofOptions; i++) {
        var jjtitle = Object.getOwnPropertyDescriptor(inputValues,`optiontitle${i}`)
        var jjsubtitke = Object.getOwnPropertyDescriptor(inputValues,`optionsubtitle${i}`)
        var jjtype = Object.getOwnPropertyDescriptor(inputValues,`optiontype${i}`)
        row.push(<div key={i} className='p-3 mt-1 flex w-full flex-col px-4'>
            <span>{`Option ${i + 1}`}</span>

            <div className='flex w-full'>
                <input id={`optiontitle${i}`} value={jjtitle?.value} placeholder='Enter value' onChange={handleoptionValue} className='px-4 mt-1 py-2 rounded-l-lg w-full'></input>
                <select id={`optiontype${i}`} value={jjtype?.value} onChange={handleoptionValue} className='px-4 mt-1 py-2'>
                    <option value={''}>--Select Type--</option>
                    <option value={'review'}>Reviews</option>
                    <option value={'text'}>Text</option>
                    <option value={'number'}>integer</option>
                    <option value={'select'}>Radio</option>
                    <option value={'checkbox'}>Checkbox</option>
                    <option value={'select_text'}>Select & Text</option>
                </select>
                <input id={`optionsubtitle${i}`} value={jjsubtitke?.value} onChange={handleoptionValue} placeholder='Enter subtitle' className='px-4 mt-1 py-2 rounded-r-lg w-[100px]'></input>
            </div>
        </div>);
    }

    return (
        <form onSubmit={handlesubmit} className="bg-zinc-200 max-w-[700px] mb-3 mx-auto w-full p-0 flex flex-col items-start rounded-xl">
            <div className='flex p-3 justify-between w-full items-center'>
                <h1 className='text-[30px] mt-2 px-4'>Edit Question</h1>
                <div className='flex gap-2 items-center'>
                    <label htmlFor='req'>Required Field</label>
                    <input id='req' checked={Required} type='checkbox' onChange={(e) => {
                        setRequired(e.currentTarget.checked);
                    }} name='required' />
                </div>
            </div>
            <div className='p-3 mt-3 flex w-full flex-col px-4'>
                <span>Title</span>
                <div className='flex gap-1'>
                    <input type='number' value={QuestionNo} onChange={(e) => setQuestionNo(parseInt(e.currentTarget.value))} placeholder='Enter Title' name='title' className='px-4 mt-1 py-2 rounded-lg max-w-[100px] w-full'></input>
                    <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder='Enter Title' name='title' className='px-4 mt-1 py-2 rounded-lg w-full'></input>
                </div>
            </div>
            <div className='p-3 mt-1 flex w-full flex-col px-4'>
                <span>Type</span>
                <select value={type?.toString()} onChange={(e) => {
                    if(e.currentTarget.value == 'null' || e.currentTarget.value == 'text' || e.currentTarget.value == 'int' || e.currentTarget.value == 'yesno' || e.currentTarget.value == 'havenot'){
                        setType(e.currentTarget.value)
                    }
                }} name='type' className='px-4 mt-1 py-2 rounded-lg'>
                    <option className='' value={'null'}>none</option>
                    <option className='' value={'text'}>Text</option>
                    <option className='' value={'int'}>Integer</option>
                    <option className='' value={'yesno'}>{'അതെ'} / {'അല്ല'} Question</option>
                    <option className='' value={'havenot'}>{'ഉണ്ട്'} / {'ഇല്ലാ'} Question</option>
                </select>
            </div>
            <div className='p-0 mt-5 items-center flex w-full flex-col px-0'>
                <div className='bg-zinc-50 flex justify-between w-full px-4 py-3 items-center'>
                    <span>Options</span>
                    <div className='flex gap-2'>
                        <Button type='button' onClick={() => {
                            setlengthofOptions((prev) => prev + 1);
                        }}><Plus /></Button>
                        <Button type='button' variant={'destructive'} onClick={() => {
                            setlengthofOptions((prev) => lengthofOptions == 0 ? 0 : prev - 1);
                        }}><Minus /></Button>
                    </div>
                </div>
                <div className='flex flex-col mt-2'>
                    {row}
                </div>
            </div>
            <div className='flex px-4 justify-end w-full'>
                <Button type='submit' className='w-full mt-2 mb-3'>Edit Question</Button>
            </div>
        </form>
    )
}

export default EditQuestionForm