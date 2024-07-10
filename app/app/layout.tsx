import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "../admin/(main)/loading";
import '../globals.css'
import Image from "next/image";
import { Appnavbar, AppLoader, MKAdminNavbar } from "./Appnavbar";
import { Metadata } from "next";
import Link from "next/link";
import { SnackbarContextProvider } from "@/lib/SnackbarProvider";
import Snackbar from "@/components/ui/snackbar/snackbar";
import { MyKuttanaduAdminNavbarProvider } from "@/components/contexts/MyKuttanaduNavbarContext";
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
            <MyKuttanaduAdminNavbarProvider>
                <div className="bg-green-900">
                    <MKAdminNavbar />
                </div>
                <div className="flex">
                    <Appnavbar />
                    <article className="w-full">
                        <div className="min-h-[90vh] px-4 w-full pt-[20px] screen">
                            <Suspense fallback={Loading()}>
                                {children}
                            </Suspense>
                        </div>
                        <div className="w-full bg-zinc-300">
                            <div className=" flex justify-between screen px-4 py-5">
                                <span>2024 &copy; all rights reserved by Fr.Porukara CMI College</span>
                                <span>Developed by Abin Kattady</span>
                            </div>
                        </div>
                    </article>
                </div>
                <Snackbar />
            </MyKuttanaduAdminNavbarProvider>
        </SnackbarContextProvider>

    </main>
}