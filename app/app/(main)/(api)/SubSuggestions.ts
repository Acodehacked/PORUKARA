'use server'
import { getDb2 } from "@/db";
import { Events, app_categories, app_sub_suggesstions, app_top_categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GetAllSuggestions() {
    const { db, connection } = await getDb2();
    const response = await db.select().from(app_sub_suggesstions).orderBy(app_sub_suggesstions.name);
    connection.end();
    return {
        message: 'suggestions got Successfully',
        data: response,
        error: null
    }
}

export async function AddSuggestion(title: string) {
    try {
        const { db, connection } = await getDb2();
        await db.insert(app_sub_suggesstions).values({
            name: title,
        })
        connection.end();
        return {
            message: 'Added Successfully',
            error: null
        }
    }catch(e){
        return {
            message: 'Already Added',
            error: null
        }
    }
}

export async function EditSuggestion(id: number, title: string) {
    const { db, connection } = await getDb2();
    await db.update(app_sub_suggesstions).set({
        name: title,
    }).where(eq(app_sub_suggesstions.id, id));
    connection.end();
    return {
        message: 'Edited Successfully',
        error: null
    }
}

//delete

export async function deleteSuggestion(id: number) {
    const { db, connection } = await getDb2();
    await db.delete(app_sub_suggesstions).where(eq(app_sub_suggesstions.id, id))
    connection.end();
    return {
        message: 'Suggestion Deleted Successfully',
        error: null
    }
}