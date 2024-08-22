import {  getDb2 } from "@/db"
import { AdminLoginTable, ClientResponses, QuestionsDB } from "@/db/schema";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { Submissions } from "./Submissions";

export const dynamic = "force-dynamic";
export default async function Page() {
    const session = await getServerSession();
    const {db,connection} = await getDb2();
    if(session?.user?.email != 'abina5448@gmail.com'){
        redirect('/admin/dashboard');
    }
    const Admins = await db.select().from(AdminLoginTable).orderBy(AdminLoginTable.id);
    const Responses = await db.select().from(ClientResponses).orderBy(ClientResponses.id);
    connection.end();
    return <main>
        <div className="flex">
            <div className="w-full">
                <div className="flex flex-col mt-3 items-start gap-3">
                    <Submissions 
                    allAdmins={Admins}
                    Responses={Responses} />
                </div>
            </div>
        </div>
    </main>
}