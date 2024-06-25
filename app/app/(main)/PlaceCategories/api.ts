'use server'
import { getDb2 } from "@/db";
import { Events, app_categories, app_top_categories } from "@/db/schema";
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
export async function AddTopCategory(title: string,image:string,subCategories:number[]) {
    const {db,connection} = await getDb2();
    await db.insert(app_top_categories).values({
        name:title,
        image: image,
        subCategories: subCategories,
    })
    connection.end();
    return {
        message: 'Added Successfully',
        error: null
    }
}



//delete

export async function deleteCategory(id: number) {
    const {db, connection} = await getDb2();
    await db.delete(app_categories).where(eq(app_categories.id, id))
    connection.end();
    return {
        message: 'Deleted Successfully',
        error: null
    }
}
export async function deleteTopCategory(id: number) {
    const {db, connection} = await getDb2();
    await db.delete(app_top_categories).where(eq(app_top_categories.id, id))
    connection.end();
    return {
        message: 'Deleted Successfully',
        error: null
    }
}