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
        author_id: AdminLoginTable.name,
        author_email: AdminLoginTable.email,
        count:  count(ClientResponses.author_id)
    }).from(AdminLoginTable)
    .leftJoin(ClientResponses,eq(AdminLoginTable.email,ClientResponses.author_id))
    .groupBy(AdminLoginTable.email)
    .orderBy(AdminLoginTable.name);
    // await db
    // .select({
    //   country: countries.name,
    //   citiesCount: count(cities.id),
    // })
    // .from(countries)
    // .leftJoin(cities, eq(countries.id, cities.countryId))
    // .groupBy(countries.id)
    // .orderBy(countries.name);
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