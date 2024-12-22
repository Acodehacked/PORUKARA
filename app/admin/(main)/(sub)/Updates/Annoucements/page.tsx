import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EventTypes } from "@/constants";
import { Events } from "@/db/schema";

import { eq, sql } from "drizzle-orm";
import { DeleteIcon, Edit2Icon, Plus, Trash2 } from "lucide-react";
import AddItem from "./AddItem";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import UpcomingEvents from "./Announcements";
import {  getDb2 } from "@/db";
import Announcements from "./Announcements";

export default async function Page() {
    const EventNO = 1;
    const {db,connection} = await getDb2();
    const events = (await db.select().from(Events).where(eq(Events.eventType,'Announcement')).limit(50)).reverse();
    connection.end();
    return <main className="flex flex-col items-start w-full">
        <div className="flex justify-between md:flex-row w-full flex-col items-center">
            <h3 className="text-[30px] mb-2">All {EventTypes[EventNO] + 's'}</h3>
            <AddItem />
        </div>
        <hr />
        <div className="bg-foreground px-3 py-1 text-[13px] rounded-xl text-white mb-2">Live Now</div>
        <Announcements events={events} />
    </main>
}