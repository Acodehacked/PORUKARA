import UploadImages from "@/components/reusable/admin/UploadImages";
import { useRef } from "react";
import Categories from "./Categories";
import { getDb2 } from "@/db";
import { app_categories, app_sub_suggesstions, app_top_categories } from "@/db/schema";

export default async function Page(){

    const {db,connection} = await getDb2();
    const categories = await db.select().from(app_categories).orderBy(app_categories.id);
    const subSuggestions = await db.select().from(app_sub_suggesstions).orderBy(app_sub_suggesstions.id);
    connection.end();
    return <main>
        <Categories data={categories} subSuggestions={subSuggestions} />
    </main>
}