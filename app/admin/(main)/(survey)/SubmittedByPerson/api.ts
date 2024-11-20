'use server'
import { getDb2 } from "@/db";
import { AdminLoginTable, ClientResponses } from "@/db/schema";
import { count, desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { GetPermission } from "../AdminQuestions/api";
import { AdminLoginSection } from "@/components/reusable/public/auth/AdminLoginSection";

export async function GetAllPerson() {
    const session = await getServerSession();
    const { db, connection } = await getDb2();
    const authors = await db.select().from(AdminLoginTable).groupBy();
    const result = await db.select({
        author_id: ClientResponses.author_id,
        count:  count(ClientResponses.author_id)
    }).from(ClientResponses).groupBy(ClientResponses.author_id).orderBy(desc(ClientResponses.added_on));

    connection.end();
    // const permission = await GetPermission();
    
    return {authors,result};
}
export async function GetByPerson(id: string) {
    const { db, connection } = await getDb2();
    if (id == '') {
        const result = await db.select().from(ClientResponses).groupBy(ClientResponses.author_id);
        connection.end();
        return result;
    } else {
        const result = await db.select().from(ClientResponses).where(eq(ClientResponses.author_id, `${id}`)).orderBy(desc(ClientResponses.id));
        connection.end();
        return result;
    }
}