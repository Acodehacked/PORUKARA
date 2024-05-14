'use server'
import { getDb2 } from "@/db";
import { Events, app_categories } from "@/db/schema";
import { eq } from "drizzle-orm";
export async function AddCategory(title: string,image:string) {
    const {db,connection} = await getDb2();
    await db.insert(app_categories).values({
        name:title,
        image: image,
        type: [0]
    })
    connection.end();
    return {
        message: 'Added Successfully',
        error: null
    }
}

export async function deleteCategory(id: number) {
    const {db, connection} = await getDb2();
    await db.delete(app_categories).where(eq(app_categories.id, id))
    connection.end();
    return {
        message: 'Deleted Successfully',
        error: null
    }
}