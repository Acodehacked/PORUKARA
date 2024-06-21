import UploadImages from "@/components/reusable/admin/UploadImages";
import { useRef } from "react";
import Categories from "./Categories";
import { getDb2 } from "@/db";
import { app_categories } from "@/db/schema";

export default async function Page(){

    const {db,connection} = await getDb2();
    const categories = await db.select().from(app_categories).orderBy(app_categories.id);
    connection.end();
    return <main>
        <h3 className="text-[30px]">Place Categories</h3>
        <Categories data={categories} />
    </main>
}