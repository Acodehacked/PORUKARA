import AdminFooter from "@/components/reusable/admin/AdminFooter";
import { AdminLoginSection } from "@/components/reusable/public/auth/AdminLoginSection";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Admin Login | Fr Porukara CMI College",
    description: "Offical Admin website of Fr. Porukara cmi College"
}

export default async function page() {
    const session = await getServerSession();

    if (session != null) {
        redirect("/admin");
    }
    return <main>
        <AdminLoginSection />
        <AdminFooter />
    </main>
}