import { getDb2 } from "@/db";
import { app_categories, app_place } from "@/db/schema";
import qs from 'qs';
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import CheckUser from "../auth/checkUser";

async function GET(request: Request) {

    try {
        
        const rawParams = request.url.split('?')[1];
        const params = qs.parse(rawParams);
        const id = params['id'] as string;
        const getid = params['place_id'] as string;
        const { db, connection } = await getDb2();
        const {error,user} = await CheckUser(id);
        const places = await db.select().from(app_place).where(eq(app_place.app_category_id, parseInt(getid)));
        connection.end();
        if (error != null) {
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


export { GET }