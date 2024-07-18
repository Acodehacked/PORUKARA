'use server'

import { getDb2 } from "@/db";
import { app_logintable } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function CheckUser(id:string){
    const {db,connection} = await getDb2();
    const response = await db.select().from(app_logintable).where(eq(app_logintable.id, parseInt(id)));
    connection.end();
    if (response.length > 0) {
        return {
            error: false,
            user:response[0]
        }
    }else{
        return {
            error: true,
            user: null
        }
    }
}