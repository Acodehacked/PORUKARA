import type { Metadata } from "next";
import { Manrope, Bebas_Neue } from "next/font/google";
import "@/app/globals.css";
import HomeNavbar from "@/components/reusable/HomeNavbar";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { GraduationCap, Home, LucideBookMarked, PhoneCallIcon, PhoneForwarded } from "lucide-react";
import React from 'react'
import HomeFooter from "@/components/reusable/HomeFooter";
import HomeLoader from "@/components/reusable/public/HomeLoader";
import LinkMenu from "@/components/reusable/public/LinkMenu";
import { SnackbarContextProvider } from "@/lib/SnackbarProvider";
import Snackbar from "@/components/ui/snackbar/snackbar";


export const metadata: Metadata = {
  title: 'Fr. Porukara CMI College of Advanced Studies | Champakulam, Kerala, India.',
  generator: 'porukaracollege, PorukaraCollege, Porukara Website, porukara, Fr Porukara School, Official Website of Porukara CMI College, Kerala ',
  description: 'Official Website of Porukara CMI Colllege, Champakulam, Kerala, India. Fr Porukara College Admission Opened. Apply for BCA, B.Com, BA and other 4 year UG Programmes. Admissions Open Admissions Open for BCA, BCOM with Finance and Taxation, BCOM with Computer Application, BA English Contact: 9446249412',
  keywords: 'Fr. Porukara CMI College, BCA Colleges,Best BCA, B.Com COllege in kerala,Colleges in Kerala,Best Colleges in Kuttanad, Best College in Alappuzha,BCA,B.Com',
  openGraph: {
      type: "website",
      url: "https://porukaracollege.in",
      title: "Fr. Porukara CMI Colllege of Advanced Studies",
      description: "Offical website of Fr. Porukara CMI College of advanced Studies, Gagultha Monastry,Champakulam , Kerala",
      siteName: "Fr. Porukara CMI College",
      images: ["https://porukaracollege.in/assets/collegepic.jpg","https://porukaracollege.in/assets/college1.png"],
  }
}
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return <main className="flex flex-col">
    <SnackbarContextProvider>
      <HomeNavbar />
      <HomeLoader />
      {children}
      <HomeFooter />
      <div className="fixed z-[10] bottom-0 w-full left-0 right-0 sm:hidden grid grid-cols-4 bg-foreground text-white">
        <LinkMenu text="Home" link="/"><Home /></LinkMenu>
        <LinkMenu text="Courses" link="/Course"><GraduationCap /></LinkMenu>
        <LinkMenu text="Admission" link="/Admission"><LucideBookMarked /></LinkMenu>
        <LinkMenu text="Contact" link="/Contact"><PhoneForwarded /></LinkMenu>
      </div>
      <Snackbar />
    </SnackbarContextProvider>
  </main>;
}

