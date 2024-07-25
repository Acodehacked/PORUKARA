import nodemailer from 'nodemailer'
import { getDb2 } from "@/db"
import { app_logintable, app_top_categories } from "@/db/schema";
import { eq, param } from "drizzle-orm";
import { NextResponse,NextRequest } from 'next/server';
import qs from 'qs';

export const dynamic = 'force-dynamic'
export async function GET(request: NextRequest) {
    try {
        const rawParams = request.url.split('?')[1];
      const params = qs.parse(rawParams);

      const name = params['name'];
      const device = params['device_name'];
        const { db, connection } = await getDb2();
        const topcategories = await db.select({
            id:app_top_categories.id,
            name:app_top_categories.name
        }).from(app_top_categories);
        const result = await db.insert(app_logintable).values({
            username: `${name}`,
            mobile: ``,
            email: null,
            device_name: `${device}`,
            categories: []
        }).$returningId();
        connection.end();
        return NextResponse.json({
            status: 'success',
            id:result[0].id,
            topcategories:topcategories,
            error: false
        });
    }
    catch(e){
        return NextResponse.json({
            error:true,
            msg:e,
            statue:'error',
            id:0,
        })
    }
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