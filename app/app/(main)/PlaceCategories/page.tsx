import UploadImages from "@/components/reusable/admin/UploadImages";
import { useRef } from "react";
import Categories from "./Categories";
import { getDb2 } from "@/db";
import { app_categories, app_top_categories } from "@/db/schema";

export default async function Page(){

    const {db,connection} = await getDb2();
    const Topcategories = await db.select().from(app_top_categories).orderBy(app_top_categories.id);
    const categories = await db.select().from(app_categories).orderBy(app_categories.id);
    connection.end();
    return <main>
        <h3 className="text-[30px]">Place Categories</h3>
        <Categories data={categories} topcategories={Topcategories} />
    </main>
}