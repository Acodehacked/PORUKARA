import nodemailer from 'nodemailer'
import { getDb2 } from "@/db"
import { app_categories, app_logintable, app_place, app_top_categories } from "@/db/schema";
import { arrayContains, desc, eq, gt, inArray, param } from "drizzle-orm";
import { NextResponse,NextRequest } from 'next/server';
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
              const {error,user} = await CheckUser(userid);
            //   return NextResponse.json(user);
                if(error == true){
                    connection.end();
                    Mainresponse = {
                        status: 'error',
                        error:true,
                        topcategories:[],
                        categories:[],
                        top_places:[],
                        interest_places:[],
                        sponsored_places:[],
                    }
                }else{
                    var interest_places = [];
                    var interest_categories:number[] = [];
                    var oneliny = JSON.parse(user?.categories as unknown as string);
                    const ry = await db.select().from(app_top_categories).where(inArray(app_top_categories.id,oneliny));
                    ry.forEach(async (cat,index)=> {
                        var subcate = JSON.parse(cat?.subCategories as unknown as string);
                        subcate.forEach((mcate:number)=>{
                                interest_categories.push(mcate);
                            });
                    })
                    // return NextResponse.json(interest_categories);
                    // return NextResponse.json(JSON.parse(user?.categories as unknown as string))
                    const topcate = await db.select().from(app_top_categories);
                    const categ = await db.select().from(app_categories).limit(50);
                    const top_places = await db.select().from(app_place).where(gt(app_place.rating,4.0)).limit(10);
                    const recently_places = await db.select().from(app_place).orderBy(desc(app_place.id)).limit(10);
                    interest_places = await db.select().from(app_place).where(inArray(
                        app_place.app_category_id,interest_categories)).limit(10);
                    const sponsor_places = await db.select().from(app_place).where(eq(
                        app_place.paid,
                        true
                    )).orderBy(desc(app_place.id)).limit(10);
        
                    connection.end();
                    Mainresponse = {
                        status: 'success', //string
                        topcategories:topcate, //List<topCategoryModel>
                        categories:categ, //List<CategoryModel>
                        top_places:top_places, //List<PlaceModel>
                        recently_added:recently_places, //List<PlaceModel>
                        interest_places:interest_places,//List<PlaceModel>
                        sponsored_places:sponsor_places,//List<PlaceModel>
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