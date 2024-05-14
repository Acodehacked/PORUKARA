import { getDb } from "@/db"
import { QuestionsDB } from "@/db/schema";
import { desc } from "drizzle-orm";
import QuestionsList from "./Questions";

export default async function Page() {
    const db = await getDb();
    const Questions = await db.select().from(QuestionsDB).orderBy(QuestionsDB.question_no);
    
    return <main>
        <div className="flex">
            <div className="w-full">
                <h3>total Questions: {Questions.length}</h3>
                <div className="flex flex-col mt-3 items-start gap-3">
                    <QuestionsList Questions={Questions} />
                </div>
            </div>
        </div>
    </main>
}