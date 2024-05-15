'use server'
import { getDb2 } from "@/db";
import { AdmissionTable, ClientResponses } from "@/db/schema";
import { NextResponse } from "next/server";
type AdmissionType = {
    name:string,
    mobile:string,
    email:string,
    address:string,
    appliedCourse:string
};
export default async function AddResponse(data: AdmissionType) {
    console.log(data);
    const { db, connection } = await getDb2();
    try{
        const response = await db.insert(AdmissionTable).values({
            name:data.name,
            mobile: `${data.mobile}`,
            email: data.email,
            address: data.address,
            appliedCourse: data.appliedCourse
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