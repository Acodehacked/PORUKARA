import { getDb2 } from "@/db";
import { app_categories } from "@/db/schema";
import { asc, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest) {
    const { db, connection } = await getDb2();
    const data = await db.select().from(app_categories).orderBy(asc(app_categories.name));
    connection.end();
    if(data !=null){
        const data1 = data.map((item,index)=>{
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


async function GET(req: NextRequest) {
    const { db, connection } = await getDb2();
    const data = await db.select().from(app_categories).orderBy(desc(app_categories.name));
    connection.end();
    if(data !=null){
        const data1 = data.map((item,index)=>{
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
export { POST ,GET}