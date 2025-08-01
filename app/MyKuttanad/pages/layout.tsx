import type { Metadata } from "next";
import "@/app/globals.css";
import React from 'react'
import { SnackbarContextProvider } from "@/lib/SnackbarProvider";
import Image from "next/image";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Fr Porukara CMI College | of Advanced Studies",
    description: "Offical website of Fr. Porukara CMI College of advanced Studies, Gagultha Monastry,Champakulam , Kerala",
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    return <main className="flex flex-col min-h-[100vh] relative">
        <SnackbarContextProvider>
            <div className="w-full bg-gradient-to-b fixed z-[99] px-6 py-3 to-center from-black to-transparent">
                <div className="flex items-center screen justify-between">
                    <div className="flex items-center gap-2 ps-4">
                        <Image src={'/assets/app/app_logo.webp'} width={50} height={50} alt="Kuttanad App" />
                        <h3 className="text-white">My Kuttanad App</h3>
                    </div>
                    <div className="pe-4">
                        <Link href={'/'} className="bg-green-600 shadow-sm rounded-sm text-white px-3 py-2">Open in App</Link>
                    </div>
                </div>
            </div>
            {children}
        </SnackbarContextProvider>
    </main>;
}

