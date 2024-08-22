'use server'

import { getDb2 } from "@/db";
import { ClientResponses } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteOneSubmission = async (id:number) =>{
    const {db,connection} = await getDb2();
    await db.delete(ClientResponses).where(eq(ClientResponses.id,id));
    connection.end();
    return true;
}