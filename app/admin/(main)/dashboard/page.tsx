
import DashboardItems from "@/components/reusable/admin/Dashboard"
import AnimatedText from "@/components/reusable/public/AnimatedText";
import DashboardCard from "@/components/reusable/public/DashboardCard";
import { getDb2 } from "@/db";
import { ClientResponses, QuestionsDB } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function page() {

    const { db, connection } = await getDb2();
    const Responses = await db.select().from(ClientResponses).where(eq(ClientResponses.status, 'completed'));
    const Questions = await db.select().from(QuestionsDB);
    return <main className="flex flex-col">
        <div className='p-4 flex flex-col'>
            <AnimatedText text="Welcome Admin!" className='pt-3 pb-4 text-[25px]' />
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardCard className=''>
                    <span>Completed Responses</span>
                    <AnimatedText text={Responses.length + ''} className='text-[30px] text-foreground font-bold' />
                </DashboardCard>
                <DashboardCard className=''>
                    <span>Pending Responses</span>
                    <AnimatedText text={'0'} className='text-[30px] text-foreground font-bold' />
                </DashboardCard>
                <DashboardCard className=''>
                    <span>Total Questions</span>
                    <AnimatedText text={Questions.length + ''} className='text-[30px] text-foreground font-bold' />
                </DashboardCard>
                <DashboardCard className='md:col-span-3 flex flex-col gap-1'>
                    <span className="mb-2">Responses</span>
                    {Responses.length > 0 && Responses.map((response, index) => {
                        return <div key={index} className="p-2 w-full rounded-sm text-[15px] bg-black/5 px-3 flex justify-between">
                            <span>{response.gen_id}</span>
                            <span>{response.added_on?.toDateString()}</span>
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