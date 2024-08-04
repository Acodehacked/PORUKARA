import { Metadata } from "next";
import React from "react";
import './globals.css'
import { Manrope,Bebas_Neue, Rubik, Work_Sans, Poppins } from 'next/font/google'
import type { Viewport } from 'next'
 
export const viewport: Viewport = {
  width: 'device-width',
  maximumScale: 1,
  userScalable: false,
}
const manrop = Poppins({ subsets: ['latin'],
display:'swap',
weight:["300","400","500","600","700","800","900"]
 })
const bebas = Bebas_Neue({ subsets: ['latin'] ,weight : '400',display:'swap'})


export const metadata: Metadata = {
    title:{
        template: '%s | Fr. Porukara CMI College of Advanced Studies',
        default: 'Fr. Porukara CMI College of Advanced Studies'
    },
    generator: 'porukaracollege, PorukaraCollege, Porukara Website, porukara, Fr Porukara School, Official Website of Porukara CMI College, Kerala. e college is named after Rev. Fr. Thomas Porukara, a great  and co-founder of the CMI Catholic Religious Congregation. The college is managed by Mount Tabor  and Charitable Society of Gagultha Monastery, Champakulam, CMI Colleges in Kuttanadu, Top College in Kerala and Kuttanadu',
    keywords: 'Fr. Porukara CMI College, BCA Colleges,Best BCA, B.Com COllege in kerala,Colleges in Kerala,Best Colleges in Kuttanad, Best College in Alappuzha,BCA,B.Com',
    description: 'Official Website of Porukara CMI Colllege, Champakulam, Kerala, India',
    openGraph: {
        type: "website",
        url: "https://porukaracollege.in",
        title: "Fr. Porukara CMI Colllege of Advanced Studies",
        description: "Offical website of Fr. Porukara CMI College of advanced Studies, Gagultha Monastry,Champakulam , Kerala",
        siteName: "Fr. Porukara College",
        images: ["https://porukaracollege.in/assets/thumbnail.jpg"],
    }
}
export const dynamic = 'force-dynamic'; 
export default async function RootLayout({children}:{children:React.ReactNode}){
    return (<html lang="en">
        <body className={`${bebas.className} ${manrop.className}`}>
            {children}
        </body>
    </html>)
}