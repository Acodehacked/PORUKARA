import nodemailer from 'nodemailer'
import { getDb2 } from "@/db"
import { app_logintable, app_place } from "@/db/schema";
import { and, eq, InferSelectModel, param } from "drizzle-orm";
import { NextResponse, NextRequest } from 'next/server';
import qs from 'qs';
import CheckUser from '../../../auth/checkUser';

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
    try {
        
        const rawParams = request.url.split('?')[1];
        const params = qs.parse(rawParams);
            const {db,connection} = await getDb2();
            var Mainresponse = {};
        const userid:string = params['id'] as string;
        const location: string = params['location'] as string;
        var mainresult;
        const {user,error} = await CheckUser(userid);
        if(error == false){
            try {
               const result = await db.select().from(app_place).where(eq(app_place.place,location ?? ''));
                connection.end();
                
                return NextResponse.json({
                    status: 'success',
                    data: result,
                    error: false
                });
    
            } catch (e) {
                return NextResponse.json({
                    status: 'error',
                    message:e,
                    error: true
                })
            }
        }else{
            return NextResponse.json({
                status: 'error',
                message:'No User Found',
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
