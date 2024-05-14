import { getDb } from "@/db";
import AddQuestionForm from "./AddQuestionForm";
import { QuestionsDB } from "@/db/schema";
import { desc } from "drizzle-orm";

export default async function Page() {
    const db = await getDb();
    const lastvalue = await db.select().from(QuestionsDB).limit(1).orderBy(desc(QuestionsDB.question_no))
    let v = 0;
    if(lastvalue.length > 0){
        v = lastvalue[0].question_no + 1; 
    }

    return <main>
        <div className="flex">
            <div className="w-full">
                <div className="flex flex-col mt-3 items-start">
                   <AddQuestionForm lastindex={v} />
                </div>
            </div>
        </div>
    </main>
}