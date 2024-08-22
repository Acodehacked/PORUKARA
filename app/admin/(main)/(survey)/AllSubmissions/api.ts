'use server'

import { getDb2 } from "@/db"
import { ClientResponses } from "@/db/schema";

export const getResponses = async () =>{
    const {db,connection} = await getDb2();
    const responses= await db.select().from(ClientResponses);
    connection.end();
    return {
        data:responses,
        error:null
    }
}