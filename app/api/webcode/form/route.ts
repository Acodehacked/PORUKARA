'use server'
import { getDb2 } from "@/db";
import { WebcodeFormTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    const { db, connection } = await getDb2();
    const id = data.value;
    const sendMail = async() =>{
        const response = await fetch('https://script.google.com/macros/s/AKfycbzslxOU6iqFlRIvjytFuWh382Z3oR4fgiILZOghe5YYNRv5YhyzrdpjIH-vRJomtMeD/exec',{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name:data.name,
                phone:data.phone,
                recipient:data.mail
            })
        });
    } 
    var categories;
    if (data != null) {
        const response = await db.insert(WebcodeFormTable).values({
            name:data.name,
            phone:data.phone,
            email:data.mail,
            type:data.type,
            message:data.message,
        });
        connection.end();
        sendMail();
        return NextResponse.json({
            data: response,
            error: null
        });
    }
    connection.end();
    return NextResponse.json({
        data: data,
        error: 'not submitted'
    });
}