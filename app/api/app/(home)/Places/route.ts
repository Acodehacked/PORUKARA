import nodemailer from 'nodemailer'
import { getDb2 } from "@/db"
import { app_logintable, app_place } from "@/db/schema";
import { and, eq, InferSelectModel, param } from "drizzle-orm";
import { NextResponse, NextRequest } from 'next/server';
import qs from 'qs';

export const dynamic = 'force-dynamic'
export async function POST(request: NextRequest) {
    const { db, connection } = await getDb2();
    try {
        
        const data = await request.json();
        const id: string = data.id;
        const panchayat: string | undefined | null = data.panchayat;
        const filterSuggesstions: number[] | undefined | null = data.userCategories as number[] | undefined;
        var mainresult;
        try {
            var list: typeof app_place.$inferSelect[] = [];
           const result = await db.select().from(app_place).where(panchayat != null && panchayat != undefined ? and(eq(app_place.id,parseInt(panchayat)),eq(app_place.panchayatId,parseInt(panchayat ?? '0'))) : eq(app_place.id,parseInt(id)));
            connection.end();
            
            if(filterSuggesstions != null && filterSuggesstions != undefined){
                result.forEach(place => {
                    var t = false;
                    filterSuggesstions.forEach((item)=>{
                        if(place.app_sub_suggestions.includes(item)){
                            t=true;
                        }
                    });
                    if(t){
                        list.push(place);
                    }
                });
            }
            return NextResponse.json({
                status: 'success',
                data: list,
                error: false
            });

        } catch (e) {
            return NextResponse.json({
                status: 'error',
                message:e,
                error: true
            })
        }
    }
    catch (e) {
        return NextResponse.json({
            error: e
        })
    }
}
