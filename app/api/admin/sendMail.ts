'use server'
import nodemailer from 'nodemailer'
import * as SibApiV3Sdk from '@sendinblue/client'

export async function sendeMail() {
    const apiInstance = new SibApiV3Sdk.AccountApi()

    apiInstance.setApiKey(SibApiV3Sdk.AccountApiApiKeys.apiKey, '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');

    var transactionalAPI = new SibApiV3Sdk.TransactionalEmailsApi();

    var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

    sendSmtpEmail = {
        sender: {
            "name": "Porukara Alex",
            "email": "porukaracollege@gmail.com"
        },
        to: [{
            email: 'abina5448@gmail.com',
            name: 'Abin Antony'
        }],
        subject: 'Hai',
        htmlContent: '<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Brevo.</p></body></html>',
        headers: {
            'api-key': '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',
            'accept': 'application/json',
            'content-type': 'application/json'
        }
    };

    transactionalAPI.sendTransacEmail(sendSmtpEmail).then(function (data) {
        console.log('API called successfully. Returned data: ' + data);
    }, function (error) {
        console.error("error");
        console.error(error);
    });



}

export async function sendMail(mail?: string, name?: string) {

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
        subject: "Admission Application - Fr.Porukara CMI College", // Subject line
        html: `<html><head>
            <style>
                .muted{
                    color: grey
                }
            </style>
        </head><body><img src="https://porukaracollege.in/assets/thumbnail.webp"  width="350px"  /><h3></h3><p>Hello, ${name ?? ''}</p></p>
        <p>&middot; Your Application has submitted. Please Download Application Form from website or from link given below.<br></p>
        <p>&middot; Our Faculties will contact you as soon as possible.<br></p>
        <p>Please contact to college if needed <br> 0477-2737399 <br>
+91 9961465063 <br>
+91 9061062517 <br></p>

        <br>
        <a style="padding:10px; background:blue;border-radius:10px margin:10px 20px;" href="https://porukaracollege.in/assets/PorukaraApplicationForm.pdf">Download Form</a>
        <p></p>
        <br >
        <br />
        <br>
        <span classname="muted">Fr. Porukara CMI College of Advanced Studies, Champakulam
Address, <br>
Gagultha Monastry Campus, <br>
Champakulam, Alappuzha District, <br>
Kerala, 688505</span>
        </body></html>`,
    });
    console.log('sent : ' + info.messageId)
}


// sendMail().catch(console.error);