import { getDb2 } from "@/db";
import { AdminLoginTable } from "@/db/schema";
import { AdminsPage } from "./admins";

export default async function Page(){
    const { db, connection } = await getDb2();
    const lastvalue = await db.select().from(AdminLoginTable).orderBy(AdminLoginTable.name);
    
    connection.end();
    return <main>
        <div className="flex">
            <div className="w-full">
                <div className="flex flex-col mt-3 items-start">
                    <h3 className="text-[35px]">Manage Admins</h3>
                    <AdminsPage admins={lastvalue} />
                </div>
            </div>
        </div>
    </main>
}