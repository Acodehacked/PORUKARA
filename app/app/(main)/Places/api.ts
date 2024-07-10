'use server'
import { getDb2 } from "@/db";
import { app_place } from "@/db/schema";
import { eq } from "drizzle-orm";
export async function AddPlace(cat_id:number,title: string,description:string,image: string[]) {
    
   
}

export async function deletePlace(id: number) {
    const {db, connection} = await getDb2();
    await db.delete(app_place).where(eq(app_place.id, id))
    connection.end();
    return {
        message: 'Deleted Successfully',
        error: null
    }
}