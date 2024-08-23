import { getDb2 } from "@/db";
import { AppShareTable, app_categories, app_place } from "@/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: Request) {
    try {
        const data = await req.json();
        const placeId = data['place_id'] as string;
        const userid = data['id'] as string;
        const { db, connection } = await getDb2();
        const unique_id = randomUUID();
        const places = await db.select().from(app_place).where(eq(app_place.id, parseInt(placeId)));
        connection.end();
        return NextResponse.json({
            status:'success',
            error:false,
            data:`https://porukaracollege.in/place/${places[0].name.replaceAll(' ','-')}?refferer=${parseInt(userid)*23740}`
        });         
    } catch (e) {
        return NextResponse.json({
            status: 'error',
            data: null
        });
    }
}


export { POST }