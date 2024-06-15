'use server'
import { getDb2 } from "@/db";
import { QuestionsDB } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function deleteQuestion(id: number) {
    const {db,connection} = await getDb2();
    await db.delete(QuestionsDB).where(eq(QuestionsDB.question_no, id))
    return {
        message: 'Deleted Successfully',
        error: null
    }
}

export async function updatenummber(id: number) {
    const {db,connection} = await getDb2();
    const response = await db.execute(sql`UPDATE QuestionsDb SET question_no=question_no+1 WHERE  question_no >= ${id}`);
    return {
        message: 'Updated Successfully',
        error: null
    }
}