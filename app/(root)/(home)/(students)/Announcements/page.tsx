import { Metadata } from "next";
import Annoucements from "./Annoucements";
import { cn } from "@/lib/utils";
import Tab from "@/components/ui/Tab";
export const metadata: Metadata = {
    title: 'Announcements',
    description: 'Latest Events of Porukara College'
}

export default function Page() {
    return <main className="min-h-[100vh] screen px-2 pt-[160px]">
        <h1 className="text-[30px] left-primary sm:mt-5 mb-3 px-3">Announcements</h1>
        <div className="flex flex-wrap justify-end gap-3 px-3 w-full">
            <Tab><span>All Time</span></Tab>
            <Tab><span>This Month</span></Tab>
            <Tab active ><span>This Year</span></Tab>
        </div>
        <Annoucements />
    </main>
}

