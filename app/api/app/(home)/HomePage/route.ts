import nodemailer from 'nodemailer'
import { getDb2 } from "@/db"
import { app_categories, app_logintable, app_place, app_top_categories } from "@/db/schema";
import { arrayContains, desc, eq, gt, inArray, param } from "drizzle-orm";
import { NextResponse,NextRequest } from 'next/server';
import qs from 'qs';
import CheckUser from '../../auth/checkUser';

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
        const rawParams = request.url.split('?')[1];
      const params = qs.parse(rawParams);
      const {db,connection} = await getDb2();
      var Mainresponse = {};
      const userid:string = params['id'] as string;
      const {error,user} = await CheckUser(userid);
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
            user?.categories.forEach(async (cat,index)=> {
                
                const ry = await db.select().from(app_top_categories).where(eq(app_top_categories.id,cat));
                if(ry.length > 0){
                    ry[0].subCategories.forEach((mcate)=>{
                        interest_categories.push(mcate);
                    })
                }
                // interest_categories.push()
            })
            const topcate = await db.select().from(app_top_categories);
            const categ = await db.select().from(app_categories).limit(50);
            const top_places = await db.select().from(app_place).where(gt(app_place.rating,4)).limit(10);
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

function generateOTP({ length }: { length: number }) {
    let digits = '0123456789';
    let OTP = '';
    let len = digits.length
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * len)];
    }

    return OTP;
}
async function SendVerificationMail({ mail, code }: { mail?: string, code?: string }) {

    let transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "77d555001@smtp-brevo.com", // generated ethereal user
            pass: "9wKmVZG24zFk0a8y", // generated ethereal password
        },
    });

    // send mail with defined transport object
    setTimeout(async ()=>{
        let info = await transporter.sendMail({
            from: 'porukaracollege@gmail.com', // sender address
            to: [`${mail}`, 'porukaracollege@gmail.com'], // list of receivers
            subject: "Verification Code - My Kuttanad App", // Subject line
            html: `<html><head>
                    <style>
                        .muted{
                            color: grey
                        }
                    </style>
                </head><body>
                <img src="https://porukaracollege.in/assets/app/app_logo.png"  width="60px"  /><h3></h3>
                
                <p>Hi ${mail},</p>
                <p>Greetings from My Kuttanad App</p>
                <br>
                <h2>Your Verification Code is ${code ?? ''}</h2>
                <br>
                <p>Please use this code to verify signup / login in My Kuttanad App</p>
                <br>
                <p>If you didn't request this code, you can safely ignore this mail. Someone else might have typed your mail address by mistake.</p>
                <br>
                <br>
                <br>
                <br>
                <p>Thanks, My Kuttanad App Developer</p>
                <p>Abin Antony Kattady</p>
                <p>2024 all rights reserved &copy; mykuttanad</p>
                </body></html>`,
        });
        console.log('sent : ' + info.messageId)
    },400);
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