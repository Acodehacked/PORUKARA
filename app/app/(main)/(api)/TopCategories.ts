'use server'
import { getDb2 } from "@/db";
import { Events, app_categories, app_top_categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GetAllTopCategories() {
    const {db,connection} = await getDb2();
    const response = await db.select().from(app_top_categories);
    connection.end();
    return {
        message: 'Added Successfully',
        data:response,
        error: null
    }
}

export async function AddTopCategory(title: string,image:string,subCategories:number[]) {
    const {db,connection} = await getDb2();
    try{
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
    }catch(e){
        return {
            message: '',
            error: 'Already Added'
        }
    }
}

export async function EditTopCategory(id:number,title: string,image:string,subCategories:number[]) {
    const {db,connection} = await getDb2();
    await db.update(app_top_categories).set({
        name:title,
        image: image,
        subCategories: subCategories,
    }).where(eq(app_top_categories.id,id))
    connection.end();
    return {
        message: 'Edited Successfully',
        error: null
    }
}


//delete


export async function deleteTopCategory(id: number) {
    const {db, connection} = await getDb2();
    await db.delete(app_top_categories).where(eq(app_top_categories.id, id))
    connection.end();
    return {
        message: 'Deleted Successfully',
        error: null
    }
}