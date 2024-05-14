'use client'
import { Button } from '@/components/ui/button';
import SnackbarContext from '@/lib/Snackbar-context';
import { Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

const AddQuestionForm = ({ lastindex }: { lastindex: number }) => {
    const [inputValues, setInputValues] = useState({});
    const [QuestionNo, setQuestionNo] = useState(lastindex)
    let row = [];
    const [lengthofOptions, setlengthofOptions] = useState(0);
    const [title, setTitle] = useState('');
    const [type, setType] = useState('null');
    const router = useRouter();
    const [Required, setRequired] = useState(true);
    const snackctx = useContext(SnackbarContext);
    const handleoptionValue = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setInputValues({
            ...inputValues,
            [e.target.id]: e.target.value
        })

    }
    useEffect(()=>{
        console.log(inputValues)
    },[inputValues])
    const handlesubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (title == '') {
            snackctx.displayMsg('please set title')
            return;
        }
        if (type == '') {
            snackctx.displayMsg('please set type')
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
        fetch('/api/admin/FormQuestionUpload', {
            method: 'POST',
            body: JSON.stringify({
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
                    snackctx.displayMsg('added!');
                    router.refresh();
                    setQuestionNo((prev) => prev + 1)
                    setType('');
                    setTitle('');
                    setlengthofOptions(0);
                    setInputValues([])
                } else {
                    snackctx.displayMsg('Already Added in the same title!');

                }
            })
    }
    for (let i = 0; i < lengthofOptions; i++) {
        row.push(<div key={i} className='p-3 mt-1 flex w-full flex-col px-4'>
            <span>{`Option ${i + 1}`}</span>
            <div className='flex w-full'>
                <input id={`optiontitle${i}`} placeholder='Enter value' onChange={handleoptionValue} className='px-4 mt-1 py-2 rounded-l-lg w-full'></input>
                <select id={`optiontype${i}`} onChange={handleoptionValue} className='px-4 mt-1 py-2'>
                    <option value={''}>--Select Type--</option>
                    <option value={'review'}>Reviews</option>
                    <option value={'text'}>Text</option>
                    <option value={'number'}>integer</option>
                    <option value={'select'}>Radio</option>
                    <option value={'checkbox'}>Checkbox</option>
                    <option value={'select_text'}>Select & Text</option>
                </select>
                <input id={`optionsubtitle${i}`} onChange={handleoptionValue} placeholder='Enter subtitle' className='px-4 mt-1 py-2 rounded-r-lg w-[100px]'></input>
            </div>
        </div>);
    }

    return (
        <form onSubmit={handlesubmit} className="bg-zinc-200 max-w-[700px] mb-3 mx-auto w-full p-0 flex flex-col items-start rounded-xl">
            <div className='flex p-3 justify-between w-full items-center'>
                <h1 className='text-[30px] mt-2 px-4'>Add Question</h1>
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
                <select value={type} onChange={(e) => setType(e.currentTarget.value)} name='type' className='px-4 mt-1 py-2 rounded-lg'>
                    <option className='' value={''}>--Select Type--</option>
                    <option className='' value={'null'}>none</option>
                    <option className='' value={'text'}>Text</option>
                    <option className='' value={'int'}>Integer</option>
                    {/* <option className='' value={'select'}>Single Choice</option> */}
                    {/* <option className='' value={'checkbox'}>Multiple Choice</option> */}
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
                <Button type='submit' className='w-full mt-2 mb-3'>Add Question</Button>
            </div>
        </form>
    )
}

export default AddQuestionForm