'use server'
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const data = await req.json();
    // const { db, connection } = await getDb2();
    // const id = data.value;
    // var categories;
    // if(id > 0){
        // categories = await db.select().from(app_place).where(eq(app_place.app_category_id,id));
    // }else{
        // categories = await db.select().from(app_place).limit(50);
    // }
    // connection.end();
    return NextResponse.json({
        data: data,
        error: null
    });
}