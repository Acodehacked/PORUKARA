import nodemailer from 'nodemailer'
import { getDb2 } from "@/db"
import { app_activities, app_logintable, app_place, Review, reviewRelations } from "@/db/schema";
import { and, asc, avg, eq, InferSelectModel, param, sql } from "drizzle-orm";
import { NextResponse, NextRequest } from 'next/server';
import qs from 'qs';
import CheckUser from '../../auth/checkUser';

export const dynamic = 'force-dynamic';

type o = typeof Review.$inferSelect
export async function GET(request: NextRequest) {
    try {
        const rawParams = request.url.split('?')[1];
        const params = qs.parse(rawParams);
        const { db, connection } = await getDb2();
        var Mainresponse = {};
        const userid: string = params['id'] as string;
        const place_id: string = params['place_id'] as string;
        var mainresult;
        const { user, error } = await CheckUser(userid);
        if (error == false) {
            try {
                const resul = await db.select({
                    id: Review.id,
                    userId: app_logintable.id,
                    username: app_logintable.username,
                    placeId: Review.placeId,
                    review: Review.review,
                    rating: Review.rating,
                    status: Review.status,
                    addedAt: Review.addedAt
                }).from(Review).innerJoin(app_logintable, eq(Review.userId, parseInt(userid))).where(eq(Review.placeId, parseInt(place_id))).orderBy(asc(Review.id));

                await db.insert(app_activities).values({
                    user_id: parseInt(userid),
                    type: 'page',
                    value: `${place_id}`
                });
                const reviewsd = await db.select({
                    avg: avg(Review.rating)
                }).from(Review)
                    .where(eq(Review.placeId, parseInt(place_id)))
                    .orderBy(asc(Review.id));

                connection.end();

                return NextResponse.json({
                    status: 'success',
                    data: {
                        reviews: resul,
                        average: reviewsd[0].avg
                    },
                    error: false
                });

            } catch (e) {
                return NextResponse.json({
                    status: 'error while getting data',
                    message: e,
                    error: true
                })
            }
        } else {
            return NextResponse.json({
                status: 'error',
                message: 'No User Found',
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
