'use server'
import { getDb2 } from "@/db";
import { Events, app_categories, app_top_categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GetAllCategories() {
    const {db,connection} = await getDb2();
    const response = await db.select().from(app_categories);
    connection.end();
    return {
        message: 'got Successfully',
        data:response,
        error: null
    }
}

export async function AddCategory(title: string,image:string,subSuggestions?:number[]) {
    const {db,connection} = await getDb2();
    await db.insert(app_categories).values({
        name:title,
        image: image,
        type: [0],
        subSuggestions:subSuggestions
    })
    connection.end();
    return {
        message: 'Added Successfully',
        error: null
    }
}

export async function EditCategory(id:number,title: string,image:string,subSuggestions?:number[]) {
    const {db,connection} = await getDb2();
    await db.update(app_categories).set({
        name:title,
        image: image,
        type: [0],
        subSuggestions:subSuggestions
    }).where(eq(app_categories.id,id));
    connection.end();
    return {
        message: 'Edited Successfully',
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