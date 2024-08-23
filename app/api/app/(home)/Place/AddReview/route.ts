import nodemailer from 'nodemailer'
import { getDb2 } from "@/db"
import { app_logintable, app_place, Review } from "@/db/schema";
import { and, asc, eq, InferSelectModel, param } from "drizzle-orm";
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
        const rating: string = data.rating;
        const review: string = data.review;
        var mainresult;
        const { error, user } = await CheckUser(id);

        if (error == true) {
            return NextResponse.json({
                status: 'error',
                message: 'User not Found',
                data:null,
                error: true
            })
        }
        try {

            const r = await db.insert(Review).values({
                placeId: parseInt(placeid),
                userId: parseInt(id),
                status: 'added',
                rating: parseFloat(rating),
                review: `${review}`
            })
            const resul = await db.select({
                id: Review.id,
                userId: app_logintable.id,
                username: app_logintable.username,
                placeId: Review.placeId,
                review: Review.review,
                rating: Review.rating,
                status: Review.status,
                addedAt: Review.addedAt
            }).from(Review).innerJoin(app_logintable, eq(Review.userId,parseInt(id))).where(eq(Review.placeId,parseInt(placeid))).orderBy(asc(Review.id));
            connection.end();
            return NextResponse.json({
                status: 'success',
                message: 'Review added',
                data: resul,
                error: false
            })
        } catch (e) {
            connection.end();
            return NextResponse.json({
                status: 'error',
                message: e,
                data:null,
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
