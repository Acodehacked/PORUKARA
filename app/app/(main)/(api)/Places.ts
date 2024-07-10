'use server'
import { getDb2 } from "@/db";
import { app_place } from "@/db/schema";

export async function GetAllPlaces() {
    try {
        const { db, connection } = await getDb2();
        const response = await db.select().from(app_place);
        connection.end();
        return {
            message: 'got Successfully',
            data: response,
            error: null
        }
    } catch (e) {
        return {
            message: 'got nothing',
            data: null,
            error: 'error'
        }
    }
}
