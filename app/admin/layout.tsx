import type { Metadata } from "next";
import "@/app/globals.css";
import HomeLoader from "@/components/reusable/public/HomeLoader";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { useContext } from "react";
import SnackbarContext from "@/lib/Snackbar-context";
import Snackbar from '@/components/ui/snackbar/snackbar'
import AdminNavbar from "@/components/reusable/admin/AdminNavbar";
import { AdminNavbarProvider } from "@/components/contexts/AdminNavbarContext";
import { SnackbarContextProvider } from "@/lib/SnackbarProvider";
import AdminFooter from "@/components/reusable/admin/AdminFooter";

export const metadata: Metadata = {
    title: "Admin | Fr Porukara CMI College | For Advanced Studies",
    description: "Offical website of Fr. Porukara cmi College for advanced Studies, Champakulam",
};

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = getServerSession();

    return (
        <main className="flex max-h-[100vh] flex-col">
            <HomeLoader />
            <SnackbarContextProvider>
                <AdminNavbarProvider>
                    <AdminNavbar session={session} />
                    {children}
                    <Snackbar />
                </AdminNavbarProvider>
            </SnackbarContextProvider>
        </main>
    );
}
