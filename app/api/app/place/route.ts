import { getDb2 } from "@/db";
import { app_categories, app_place } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: Request) {

    try {
        const data = await req.json();
        const getid = data['id'] as string;
        const { db, connection } = await getDb2();
        const places = await db.select().from(app_place).where(eq(app_place.app_category_id, parseInt(getid)));
        connection.end();
        if (data != null) {
            if(places.length > 0){
                return NextResponse.json({
                    status: 'success',
                    data: places[0]
                });
            }else{
                return NextResponse.json({
                    status: 'error',
                    data: null
                });
            }
        }
    } catch (e) {
        return NextResponse.json({
            status: 'error',
            data: null
        });
    }
}


export { POST }