'use client'
import { useEffect, useRef, useState } from "react"
import { GetAllPerson, GetByPerson } from "./api"
import { LoaderIcon } from "lucide-react";
import * as XLSX from 'xlsx'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ENV } from "@/constants/places";
type MainData = {
    password: string;
    id: number;
    name: string;
    email: string;
    permission: boolean;
    status: "offline" | "online";
}
type SubmissionType = {
    id: number;
    gen_id: string;
    author_id: string;
    status: "started" | "progress" | "completed" | null;
    responses: unknown;
    added_on: Date;
}[]
export default function Page() {

    const [person, setperson] = useState<string>('')
    const [mail, setmail] = useState<string>('')
    const [allData, setallData] = useState<MainData[]>([])
    const [personData, setpersonData] = useState<SubmissionType>([])
    const [loading, setloading] = useState(false)
    const tableref = useRef(null);
    useEffect(() => {
        setloading(true)
        const GetAllData = async () => {
            const response = await GetAllPerson();
            setallData(response);
            setloading(false)
        }
        GetAllData();

    }, [])

    const GetPersonData = async () => {
        setloading(true)
        const response = await GetByPerson(mail);
        setpersonData(response)
        setloading(false)
        console.log(response)
    }
    const exportData = () => {
            const worksheet = XLSX.utils.table_to_sheet(tableref.current);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, `${person}-data.xlsx`)
    }
    return <main>
        <h2 className="text-[19px] mb-2">Search By Person</h2>
        <div className="p-2 bg-secondary/20 flex align-center gap-2">
            <select className="px-3 py-2 outline-none" name="" onChange={(e) => {
                setmail(e.target.value);
            }} id="">
                <option value="0">select any</option>
                {allData.map((item, index) => {
                    return <option key={index} value={item.email} onClick={() => setperson(item.name)}>{item.name}</option>
                })}
            </select>
            <button onClick={() => GetPersonData()} className="px-4 py-2 bg-primary me-5 text-white ">Search</button>
            {loading && <LoaderIcon className="text-black text-[20px] animate-spin" />}
            <button onClick={() => exportData()} className="px-4 py-2 bg-[#1aa626] me-5 text-white ">Export</button>
        </div>

        <Table ref={tableref}>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">SI No.</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>House Name / No</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {personData.map((item, index) => {
                    var result = []
                    result = JSON.parse(item.responses as unknown as string);
                    console.log(result)
                    var pget = Object.getOwnPropertyDescriptor(result, `1optionvalue0`);
                    const H = Object.getOwnPropertyDescriptor(result, '1optionvalue1');
                    return <TableRow key={index}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{pget?.value}</TableCell>
                        <TableCell>{H?.value}</TableCell>
                        {/* <TableCell className="text-right">$250.00</TableCell> */}
                    </TableRow>
                })}

            </TableBody>
        </Table>
    </main>
}