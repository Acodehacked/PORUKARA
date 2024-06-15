import { getDb2 } from "@/db";
import { QuestionsDB } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { useSearchParams } from "next/navigation";
import EditQuestionForm from "./AddQuestionForm";
import NotFound from "@/app/not-found";
import { Edit } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
    const { db, connection } = await getDb2();
    const lastvalue = await db.select().from(QuestionsDB).where(eq(QuestionsDB.id,parseInt(params.id)));
    if(lastvalue.length == 0){
        return NotFound();
    }
    connection.end();
    return <main>
        <div className="flex">
            <div className="w-full">
                <div className="flex flex-col mt-3 items-start">
                    <EditQuestionForm question={lastvalue[0]} />
                </div>
            </div>
        </div>
    </main>
}