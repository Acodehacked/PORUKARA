'use server'
import nodemailer from 'nodemailer'
import * as SibApiV3Sdk from '@sendinblue/client'
import { getDb2 } from "@/db"
import * as crypto from 'crypto';
import { app_logintable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Code } from 'lucide-react';
import { NextResponse } from 'next/server';
import { error } from 'console';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('email')
    const { db, connection } = await getDb2();

    try {
        const response = await db.select().from(app_logintable).where(eq(app_logintable.email, `${id}`));
        var Mainresponse = {};
        if (response.length > 0) {
            Mainresponse = {
                status: 'success',
                otp: '',
                data: {
                    name: response[0].name,
                    email: response[0].email,
                    phone: response[0].mobile
                },
                error: false
            }
            const otp = generateOTP({ length: 5 });
            SendVerificationMail({
                mail: response[0].email,
                code: otp
            })
        } else {
            await db.insert(app_logintable).values({
                name: 'Abin Antony',
                email: 'abina5448@gmail.com',
                mobile: '+919048741910',
                categories: [],
                device_name: 'realme 10'
            })

            Mainresponse = {
                status: 'not found',
                data: null,
                otp: '',
                error: false
            }
        }
        connection.end();
        return NextResponse.json(Mainresponse)
    }
    catch(e){
        return NextResponse.json({
            error:e
        })
    }
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
