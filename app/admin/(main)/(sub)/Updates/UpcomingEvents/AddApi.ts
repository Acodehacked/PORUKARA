'use server'
import {  getDb2 } from "@/db/index";
import { Events } from "@/db/schema";
import { eq } from "drizzle-orm";
export async function AddEvent(title: string,date: Date) {
    const {db,connection} = await getDb2();
    await db.insert(Events).values({
        title: title,
        description: '',
        eventType: 'Upcoming Event',
        images: '',
        date: date,
        link: '/link',
    })
    connection.end();
    return {
        message: 'Added Successfully',
        error: null
    }
}

export async function deleteEvent(id: number) {
    const {db,connection} = await getDb2();
    await db.delete(Events).where(eq(Events.id, id));
    connection.end();
    return {
        message: 'Deleted Successfully',
        error: null
    }
}