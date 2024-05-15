'use server'
import { getDb2 } from "@/db";
import { ClientResponses } from "@/db/schema";
import { NextResponse } from "next/server";
export default async function AddResponse(formdata: FormData, gen_id: string) {
    console.log(formdata);
    const { db, connection } = await getDb2();
    let json = <any>{};
    Array.from(formdata.entries()).forEach(([key, value]) => {
        json[`${key}`] = value;
    })
    console.log(json)
    try{
        const response = await db.insert(ClientResponses).values({
            gen_id: gen_id,
            responses: json,
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