import { getDb2 } from "@/db";
import { app_categories, app_top_categories } from "@/db/schema";
import { asc, desc, eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import qs from 'qs';
import CheckUser from "../auth/checkUser";

async function POST(request: NextRequest) {
    try {
        const rawParams = request.url.split('?')[1];
        const params = qs.parse(rawParams);
        var Mainresponse = {};
        const userid: string = params['id'] as string;
        const topcategory_id: string = params['top_category_id'] as string;
        const { db, connection } = await getDb2();
        const { error, user } = await CheckUser(userid);

        if (error != null) {
            const results = await db.select({
                sub: app_top_categories.subCategories
            }).from(app_top_categories).where(eq(app_top_categories.id, parseInt(topcategory_id)));
            const subCategories = await db.select().from(app_categories).where(inArray(app_categories.id, results[0].sub));
            return NextResponse.json({
                error: true,
                message: 'User Not Found',
                data: 'error'
            });
        } else {
            return NextResponse.json({
                error: true,
                message: 'User Not Found',
                data: 'error'
            });
        }
    } catch (e) {
        return NextResponse.json({
            error: true,
            message: 'Invalid Request',
            data: 'error'
        });
    }
}


async function GET(req: NextRequest) {
    const { db, connection } = await getDb2();
    const data = await db.select().from(app_categories).orderBy(desc(app_categories.name));
    connection.end();
    if (data != null) {
        const data1 = data.map((item, index) => {
            return {
                ...item,
                dimage: `https://mykuttanadu.s3.us-west-1.amazonaws.com/${item.image}`
            }
        })
        return NextResponse.json({
            status: 'success',
            data: data1
        });
    }
}
export { POST, GET }