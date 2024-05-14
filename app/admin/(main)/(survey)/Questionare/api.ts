'use server'
import { getDb2 } from "@/db";
import { ClientResponses } from "@/db/schema";
import { NextResponse } from "next/server";
export default async function AddResponse(formdata: FormData, gen_id: string) {
    console.log(formdata);
    const { db, connection } = await getDb2();
    let json = <{k:string,v:string}[]>[];
    Array.from(formdata.entries()).forEach(([key, value]) => {
        // json[``] = value;
        json.push({
            k: `${key}`,
            v: `${value}`
        })
    })
    console.log(json)
    try{
        const response = await db.insert(ClientResponses).values({
            gen_id: gen_id,
            responses: JSON.stringify(json),
            status: 'completed',
            added_on: new Date()
        })
        connection.end();
        return {
            success: true,
            data: response.toString()
        }
    }catch(e){
        return {
            success: false,
            data: 'failed to add'
        }
    }
    
}