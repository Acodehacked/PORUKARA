'use server'
import { getDb2 } from "@/db";
import { AdminLoginTable, ClientResponses } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { GetPermission } from "../AdminQuestions/api";
import { AdminLoginSection } from "@/components/reusable/public/auth/AdminLoginSection";

export async function GetAllPerson() {
    const session = await getServerSession();
    const { db, connection } = await getDb2();
    const result = await db.select().from(AdminLoginTable);

    connection.end();
    const permission = await GetPermission();

    return result;
}
export async function GetByPerson(id: string) {
    const { db, connection } = await getDb2();
    if (id == '0') {
        const result = await db.select().from(ClientResponses).groupBy(ClientResponses.author_id);
        connection.end();
        return result;
    } else {
        const result = await db.select().from(ClientResponses).where(eq(ClientResponses.author_id, `${id}`)).orderBy(desc(ClientResponses.id));
        connection.end();
        return result;
    }
}