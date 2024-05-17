import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EventTypes } from "@/constants";
import { AdmissionTable, Events } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import { DeleteIcon, Edit2Icon, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import {  getDb2 } from "@/db";
import Admissionsapps from "./Applications";

export default async function Page() {
    const EventNO = 0;
    const {db,connection}= await getDb2();
    const Applications = await db.select().from(AdmissionTable).orderBy(desc(AdmissionTable.submittedAt));
    connection.end();
    return <main className="flex flex-col items-start w-full">
        <div className="flex justify-between md:flex-row w-full flex-col items-center">
            <h3 className="text-[30px] mb-2">Admission Applications</h3>
        </div>
        <Admissionsapps data={Applications} />
    </main>
}