import nodemailer from 'nodemailer'
import { getDb2 } from "@/db"
import { app_logintable, app_place, Review } from "@/db/schema";
import { and, eq, InferSelectModel, param } from "drizzle-orm";
import { NextResponse, NextRequest } from 'next/server';
import qs from 'qs';
import { abort } from 'process';
import CheckUser from '../../../auth/checkUser';

export const dynamic = 'force-dynamic'
export async function POST(request: NextRequest) {
    try {
        const { db, connection } = await getDb2();
    
        const data = await request.json();
        const id: string = data.id;
        const placeid: string = data.placeid;
        const rating : string = data.rating;
        const review: string = data.review;
        var mainresult;
        const {error,user} = await CheckUser(id);
        
        if(error == true){
            return NextResponse.json({
                status: 'error',
                message:'User not Found',
                error: true
            })
        }
        try {
           
          const r = await db.insert(Review).values({
            placeId:parseInt(placeid),
            userId: parseInt(id),
            status:'added',
            rating: parseFloat(rating),
            review: `${review}`
          }) 

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
