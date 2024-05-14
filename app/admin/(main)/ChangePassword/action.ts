'use server'
import { getDb } from "@/db";
import { AdminLoginTable } from "@/db/schema";
import { compare, hash } from "bcrypt";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

async function changePasswordServer({ oldpassword, newpassword }:
    {
        oldpassword: string,
        newpassword: string,
    }
) {
    const session = await getServerSession();

    const usermail = session?.user?.email || '';
    const db = await getDb();
    const user = await db.select().from(AdminLoginTable).where(eq(AdminLoginTable.email, usermail));

    if (await compare(oldpassword, user[0]?.password || '01234')) {
        hash(newpassword, 10, async (error, newhash) => {
            const response = await db.update(AdminLoginTable).set({
                password: newhash
            }).where(eq(AdminLoginTable.email, usermail))
        })
        return {
            error: null,
            message: "Password changed successfully"
        }
    }

    return {
        error: "Incorrect Admin Password"
    };
}

export { changePasswordServer }