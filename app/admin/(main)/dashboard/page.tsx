
import DashboardItems from "@/components/reusable/admin/Dashboard"
import AnimatedText from "@/components/reusable/public/AnimatedText";
import DashboardCard from "@/components/reusable/public/DashboardCard";
import { getDb2 } from "@/db";
import { ClientResponses, QuestionsDB } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import moment from 'moment-timezone';

export const dynamic = "force-dynamic";
export default async function page() {
    moment().tz("Asia/Kolkata").format();

    const { db, connection } = await getDb2();
    const Responses = await db.select().from(ClientResponses).where(eq(ClientResponses.status, 'completed')).orderBy(desc(ClientResponses.added_on)).limit(25);
    const Questions = await db.select().from(QuestionsDB);
    connection.end();
    return <main className="flex flex-col">
        <div className='p-4 flex flex-col'>
            <AnimatedText text="Welcome Admin!" className='pt-3 pb-4 text-[25px]' />
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardCard className=''>
                    <span>Completed Responses</span>
                    <AnimatedText text={Responses.length + ''} className='text-[30px] text-foreground font-bold' />
                </DashboardCard>
                <DashboardCard className=''>
                    <span>Total Questions</span>
                    <AnimatedText text={Questions.length + ''} className='text-[30px] text-foreground font-bold' />
                </DashboardCard>
                <DashboardCard className='md:col-span-3 flex flex-col gap-1'>
                    <span className="mb-2">Responses</span>
                    {Responses.length > 0 && Responses.map((response, index) => {
                        return <div key={index} className="p-2 w-full rounded-sm text-[15px] bg-black/5 px-3 flex justify-between">
                            <div>
                            <span className="text-[10px]">{response.gen_id}</span>
                            <h2>{response.author_id}</h2>
                            </div>
                            {/* {new Date().toLocaleString('en-US',{
                                timeZone:'Asia/Kolkata'})} */}
                            {/* {response.added_on.toUTCString()} */}
                            <span>{`${moment(`${response.added_on.toLocaleString('en-US',{
                                timeZone:'Asia/Kolkata'})}`).fromNow()}`}</span>
                        </div>
                    })}
                    {Responses.length == 0 ? <span>No responses Recorded</span> : ''}
                </DashboardCard>
            </div>
            {/* <Button onClick={()=>{
      setnum((prev)=>{
          return prev+1
      })
      snackbarctx.displayMsg('Added Successfully'+num)
    }}>Show txt</Button> */}
        </div>
    </main>
} 