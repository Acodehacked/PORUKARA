'use server'
import { getDb } from "@/db/index";
import { Events } from "@/db/schema";
import { eq } from "drizzle-orm";
export async function AddEvent(title: string,date: Date) {
    const db = await getDb();
    await db.insert(Events).values({
        title: title,
        description: '',
        eventType: 'Upcoming Event',
        images: '',
        date: date,
        link: '/link',
    })
    return {
        message: 'Added Successfully',
        error: null
    }
}

export async function deleteEvent(id: number) {
    const db = await getDb();
    await db.delete(Events).where(eq(Events.id, id))
    return {
        message: 'Deleted Successfully',
        error: null
    }
}