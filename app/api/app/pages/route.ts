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
            return NextResponse.json({
                status: 'success',
                data: places
            });
        }
    } catch (e) {
        return NextResponse.json({
            status: 'error',
            data: null
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