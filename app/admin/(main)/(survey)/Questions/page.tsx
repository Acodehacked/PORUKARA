import {  getDb2 } from "@/db"
import { ClientResponses, QuestionsDB } from "@/db/schema";
import QuestionsList from "./Questions";

export const dynamic = "force-dynamic";
export default async function Page() {
    const {db,connection} = await getDb2();
    const Questions = await db.select().from(QuestionsDB).orderBy(QuestionsDB.question_no);
    const Responses = await db.select().from(ClientResponses).orderBy(ClientResponses.id);
    connection.end();
    return <main>
        <div className="flex">
            <div className="w-full">
                <h3>total Questions: {Questions.length}</h3>
                <div className="flex flex-col mt-3 items-start gap-3">
                    <QuestionsList Responses={Responses} Questions={Questions} />
                </div>
            </div>
        </div>
    </main>
}