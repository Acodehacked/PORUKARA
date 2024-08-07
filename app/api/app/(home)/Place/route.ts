import nodemailer from 'nodemailer'
import { getDb2 } from "@/db"
import { app_logintable, app_place, Review, reviewRelations } from "@/db/schema";
import { and, asc, avg, eq, InferSelectModel, param, sql } from "drizzle-orm";
import { NextResponse, NextRequest } from 'next/server';
import qs from 'qs';
import CheckUser from '../../auth/checkUser';

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
    try {
        const rawParams = request.url.split('?')[1];
        const params = qs.parse(rawParams);
            const {db,connection} = await getDb2();
            var Mainresponse = {};
        const userid:string = params['id'] as string;
        const place_id: string = params['place_id'] as string;
        var mainresult;
        const {user,error} = await CheckUser(userid);
        if(error == false){
            try {
//   db
//   .select({
//     id: orders.id,
//     shippedDate: orders.shippedDate,
//     shipName: orders.shipName,
//     shipCity: orders.shipCity,
//     shipCountry: orders.shipCountry,
//     productsCount: sql<number>`cast(count(${details.productId}) as int)`,
//     quantitySum: sql<number>`sum(${details.quantity})`,
//     totalPrice: sql<number>`sum(${details.quantity} * ${details.unitPrice})`,
//   })
//   .from(orders)
//   .leftJoin(details, eq(orders.id, details.orderId))
//   .groupBy(orders.id)
//   .orderBy(asc(orders.id))
//   .all();
// id: serial('id').primaryKey(),
// userId: int('user_id').references(() => app_logintable.id),
// placeId: int('place_id').notNull(),
// review: varchar('review',{length:3000}).notNull(),
// rating: decimal('rating',{precision:2,scale:1}).$type<number>().notNull().default(0.0),

               const reviews = await db.select({
                    id: Review.id,
                    name: app_logintable.username,
                    review: Review.review,
                    rating: Review.rating,
                    date: Review.addedAt
               }).from(Review)
               .leftJoin(Review, eq(Review.userId, app_logintable.id))
               .where(eq(Review.placeId,parseInt(place_id)))
                .orderBy(asc(Review.id));
                const reviewsd = await db.select({
                    avg: avg(Review.rating)
                }).from(Review)
               .where(eq(Review.placeId,parseInt(place_id)))
                .orderBy(asc(Review.id));

                connection.end();
                
                return NextResponse.json({
                    status: 'success',
                    data: {
                        reviews :reviews,
                        average: reviewsd
                    },
                    error: false
                });
    
            } catch (e) {
                return NextResponse.json({
                    status: 'error while getting data',
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
