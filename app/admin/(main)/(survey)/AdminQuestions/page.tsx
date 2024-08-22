import {  getDb2 } from "@/db"
import { AdminLoginTable, ClientResponses, QuestionsDB } from "@/db/schema";
import QuestionsList from "./Questions";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";
export default async function Page() {
    const session = await getServerSession();
    const {db,connection} = await getDb2();
    if(session?.user?.email != 'abina5448@gmail.com'){
        redirect('/admin/dashboard');
    }
    const Questions = await db.select().from(QuestionsDB).orderBy(QuestionsDB.question_no);
    const Admins = await db.select().from(AdminLoginTable).orderBy(desc(AdminLoginTable.id)).limit(1);
    connection.end();
    return <main>
        <div className="flex">
            <div className="w-full">
                <div className="flex flex-col mt-3 items-start gap-3">
                    <QuestionsList Admins={Admins[0]} Questions={Questions} />
                </div>
            </div>
        </div>
    </main>
}