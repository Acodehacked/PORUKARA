import { getDb2 } from "@/db";
import { ClientResponses } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { Submitted } from "./Submitted";

export const dynamic = 'force-dynamic';
export default async function Page() {

    const session = await getServerSession();
    const { db, connection } = await getDb2();
    const result = await db.select().from(ClientResponses).where(eq(ClientResponses.author_id, `${session?.user?.email}`)).orderBy(desc(ClientResponses.id))
    connection.end();
    return <main>

        <div className="flex justify-between">
            <div className="flex flex-col">
                <h4 className="text-[22px]">My Submissions</h4>
                <span className="text-[13px]">{session?.user?.email}</span>
            </div>
            <span className="text-[23px]">Total : {result.length}</span>
        </div>
        <Submitted responses={result} />
    </main>
}