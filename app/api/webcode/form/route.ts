'use server'
import { getDb2 } from "@/db";
import { WebcodeFormTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    const { db, connection } = await getDb2();
        try {
            const response = await db.insert(WebcodeFormTable).values({
                name:data.name,
                phone:data.phone,
                email:data.mail,
                type:data.type,
                message:data.message,
            });
            connection.end();
        } catch (error) {
            return NextResponse.json({
                data: 'not send added to database',
                error: null
            });
        }
        try {
            fetch('https://script.google.com/macros/s/AKfycbzP-gztfzF7cBgNOEMp1OuuOPEZ2LdrK1vHLwQup7Z53jQe0JHw82aCxBxoE1ZWYDKP/exec',{
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
        } catch (error) {
            return NextResponse.json({
                data: 'not send email',
                error: null
            });
        }
        return NextResponse.json({
            data: 'no error',
            error: null
        });
}