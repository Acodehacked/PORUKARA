'use server'
import { getDb2 } from "@/db";
import { ClientResponses, QuestionsDB } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function deleteQuestion(id: number) {
    const { db, connection } = await getDb2();
    await db.delete(QuestionsDB).where(eq(QuestionsDB.question_no, id))
    connection.end();
    return {
        message: 'Deleted Successfully',
        error: null
    }
}

export async function updatenummber(id: number) {
    try {
        const { db, connection } = await getDb2();
        const response = await db.execute(sql`UPDATE QuestionsDb SET question_no=question_no+1 WHERE  question_no >= ${id}`);
        connection.end();
        return {
            message: 'Updated Successfully',
            error: null
        }
    }catch(e){
        return {
            message: 'Error',
            error: e
        }
    }
}

export async function ExportExcel() {
    try {
        const { db, connection } = await getDb2();
        const response = await db.select().from(ClientResponses).orderBy(desc(ClientResponses.added_on));
       
        connection.end();
        return {
            data: response,
            message: 'Updated Successfully',
            error: null
        }
    }catch(e){
        return {
            message: 'Error',
            data: [],
            error: e
        }
    }
}