import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "../admin/(main)/loading";
import '../globals.css'
import Image from "next/image";
import { Appnavbar, AppLoader } from "./Appnavbar";
import { Metadata } from "next";
import Link from "next/link";
import { SnackbarContextProvider } from "@/lib/SnackbarProvider";
import Snackbar from "@/components/ui/snackbar/snackbar";
export const metadata: Metadata = {
    title: "Kuttanadu App Admin Page",
    description: "Official Admin Page for contolling the working of My Kuttanadu App. Developed by Abin Antony Kattady. Managed by Fr.Porukara CMI College, Champakulam"
}
export default async function Layout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession();
    if (session == null) {
        redirect('/admin/dashboard');
    } else {
        if (session.user?.email != 'abina5448@gmail.com' && session.user?.email != 'porukaracollege@gmail.com') {
            redirect('/admin/dashboard');
        }
    }
    return <main className="bg-zinc-200">
        <AppLoader />
        <SnackbarContextProvider>
            <div className="w-full fixed top-0 flex flex-col z-[999] bg-green-900">
                <nav className="w-full px-3 screen items-center flex justify-between ">
                    <div className="flex gap-2 items-center">
                        <Image src={'/assets/app/app_logo.png'} className='m-3 rounded-xl shadow-xl' alt="Kuttanadu App" width={60} height={60} />
                        <h2 className="text-[17px] text-white font-semibold">Kuttanadu App</h2>
                    </div>
                    <Link className="bg-white/90 px-2 py-1" href={'/admin/dashboard'}>Back to Dashbard</Link>
                </nav>
                <Appnavbar />
            </div>
            <div className="min-h-[90vh] px-4 w-full pt-[170px] screen">
                <Suspense fallback={Loading()}>
                    {children}
                </Suspense>

            </div>
            <div className="w-full bg-zinc-300">
                <div className=" flex justify-between screen px-4 py-5">
                    <span>2024 &copy; all rights reserved by Fr.Porukara CMI College</span>
                </div>
            </div>
            <Snackbar />
        </SnackbarContextProvider>

    </main>
}