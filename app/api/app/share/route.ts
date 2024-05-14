import { getDb2 } from "@/db";
import { AppShareTable, app_categories, app_place } from "@/db/schema";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: Request) {
    return NextResponse.json({
        status:'success',
        data:`https://porukaracollege.in/page/csc`
    }); 
    try {
        const data = await req.json();
        const placeId = data['place_id'] as string;
        const Username = data['user_name'] as string;
        const { db, connection } = await getDb2();
        const unique_id = randomUUID();
        const small_id = unique_id.slice(0, 8);
        // const places = await db.select().from(app_place).where(eq(app_place.app_category_id, parseInt(getid)));
        const response = await db.insert(AppShareTable).values({
            userId: small_id,
            pageId: parseInt(placeId),
            userName: Username,
        })
        connection.end();
        return NextResponse.json({
            status:'success',
            data:`https://porukaracollege.in/page/${small_id}`
        });         
    } catch (e) {
        return NextResponse.json({
            status: 'error',
            data: null
        });
    }
}


export { POST }