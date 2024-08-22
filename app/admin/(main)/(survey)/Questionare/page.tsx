import {  getDb2 } from "@/db";
import { QuestionsDB } from "@/db/schema";
import { sql } from "drizzle-orm";
import SurveyForm from "./form";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { GetPermission } from "../AdminQuestions/api";

export const dynamic = 'force-dynamic';
export default async function Page() {

    const { db, connection } = await getDb2();
    const data = await db.select().from(QuestionsDB).orderBy(QuestionsDB.question_no);
    const unique_id = randomUUID();
    const session = await getServerSession();
    const permission = await GetPermission();
    connection.end();
    return <main>
        <div className="px-5 mb-10 flex flex-col items-center">
            <h2 id="home" className="mal text-[24px] font-semibold text-center mt-3 mb-2">
                സാമൂഹിക സാമ്പത്തിക സർവ്വേ <br />
                കുട്ടനാട് താലൂക്കിലെ  ചമ്പക്കുളം  പഞ്ചായത്ത്  -  2024
            </h2>
            <h3 className="text-[16px] font-semibold">New Questionare</h3>
        </div>
        <SurveyForm id={session?.user?.email ?? ''} allowed={permission} MainData={data} gene_id={unique_id} />
    </main>
}