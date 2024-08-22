'use server'
import { AdminLoginSection } from "@/components/reusable/public/auth/AdminLoginSection";
import { getDb2 } from "@/db";
import { AdminLoginTable, QuestionsDB } from "@/db/schema";
import { eq, ne, sql } from "drizzle-orm";
import { getDefaultAutoSelectFamily } from "net";

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


export async function DeleteAllResponses() {
    const {db,connection} = await getDb2();
    const response = await db.execute(sql`DELETE FROM ClientResponses`);
    return {
        message: 'Deleted Successfully',
        error: null
    }
}


export async function OpenSurvey() {
    const {db,connection} = await getDb2();
    const response = await db.update(AdminLoginTable).set({
        permission:true
    });
    connection.end();
    return {
        message: 'Opened Successfully',
        error: null
    }
}
export async function GetPermission(){
    const {db,connection} = await getDb2();
    const response = await db.select().from(AdminLoginTable).where(ne(AdminLoginTable.email,'abina5448@gmail.com'));
    connection.end();
    return response[0].permission;
}
export async function CloseSurvey() {
    const {db,connection} = await getDb2();
    const response = await db.update(AdminLoginTable).set({
        permission:false
    }).where(ne(AdminLoginTable.email,'abina5448@gmail.com'));
    connection.end();
    return {
        message: 'Closed Successfully',
        error: null
    }
}