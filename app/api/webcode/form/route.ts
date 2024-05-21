'use server'
import { getDb2 } from "@/db";
import { WebcodeFormTable } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    const { db, connection } = await getDb2();
    const id = data.value;
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