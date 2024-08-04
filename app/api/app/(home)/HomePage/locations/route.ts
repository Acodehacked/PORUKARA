import nodemailer from 'nodemailer'
import { getDb2 } from "@/db"
import { app_categories, app_logintable, app_place, app_top_categories } from "@/db/schema";
import { arrayContains, desc, eq, gt, inArray, like, param } from "drizzle-orm";
import { NextResponse,NextRequest } from 'next/server';
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
              const search:string = params['search'] as string;
              const {error,user} = await CheckUser(userid);
            //   return NextResponse.json(user);
                if(error == true){
                    connection.end();
                    Mainresponse = {
                        status: 'error',
                        error:true,
                        locations:[]
                    }
                }else{
                    var loc = [];
                    
                    if(search != '' && search != undefined){
                        loc = await db.select({
                            location :app_place.place
                        }).from(app_place).where(like(app_place.place,`%${search}%`)).orderBy(desc(app_place.place)).limit(15);
                    }else{
                        loc = await db.selectDistinct({
                            location: app_place.place
                        }).from(app_place).orderBy(desc(app_place.place)).limit(15);
                    }
        
                    connection.end();
                    Mainresponse = {
                        status: 'success', //string
                        locations: loc,
                        error: false,
                    }
                }
        return NextResponse.json(Mainresponse);

    }
    catch(e){
        return NextResponse.json({
                    error:true,
                    message:e,
                    data:'error'
                });
    }
    //   try{
    //  
     
    //   }catch(e){
    //     
    //   }
}




 
// async function getCookieData() {
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       // cookies will be called outside of the async context, causing a build-time error
//       resolve(cookies().getAll())
//     }, 1000)
//   )
// }
 
// export default async function Page() {
//   const cookieData = await getCookieData()
//   return <div>Hello World</div>
// }

 
// async function getCookieData() {
//   const cookieData = cookies().getAll()
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       resolve(cookieData)
//     }, 1000)
//   )
// }
 
// export default async function Page() {
//   const cookieData = await getCookieData()
//   return <div>Hello World</div>
// }