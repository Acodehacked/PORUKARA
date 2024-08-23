'use server'
import { getDb2 } from "@/db";
import { AdminLoginTable, QuestionsDB } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq, sql } from "drizzle-orm";

export async function AddAdmin(name: string, email: string, password: string) {
    const { db, connection } = await getDb2();
    bcrypt.hash(password, 10).then(async (result: string) => {
        password = result || "Abianin";
        const response = await db.insert(AdminLoginTable).values({
            name: name,
            email: email,
            password: password
        });
        console.log(response)
        connection.end();
    })

    return {
        message: 'Added Successfully',
        error: null
    }
}

export async function DeleteAdminn(id: number) {
    const { db, connection } = await getDb2();
    var password = '';
    const response = await db.delete(AdminLoginTable).where(eq(AdminLoginTable.id,id));
    console.log(response)
    connection.end();

    return {
        message: 'Deleted Successfully',
        error: null
    }
}

export async function GetAllAdmins() {
    const { db, connection } = await getDb2();
    const response = await db.select().from(AdminLoginTable).orderBy(AdminLoginTable.name);
    connection.end();

    return {
        data: response,
        error: null
    }
}
