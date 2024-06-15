import {  getDb2 } from "@/db";
import { QuestionsDB } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();

    const { db, connection } = await getDb2();
    try {
        const response = await db.update(QuestionsDB).set({
            title: data.title,
            question_no: data.question_no,
            option_len: data.optionlen,
            required: data.nrequired,
            type: data.btype,
            options_list: data.optionslist
        }).where(eq(QuestionsDB.id,data.id));
        // const response = await db.insert(QuestionsDB).values({
           
        //     added_on: new Date()
        // })
        connection.end();
        return NextResponse.json({
            success: true,
            data: response
        })
    } catch (e) {
        connection.end();
        return NextResponse.json({
            success: false,
            data: ''
        })
    }
}
export async function GET(req: Request) {
    const data = await req.json();
    return NextResponse.json({
        success: true,
        data: data
    })
}