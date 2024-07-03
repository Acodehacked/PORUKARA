import UploadImages from "@/components/reusable/admin/UploadImages";
import { useRef } from "react";
import { getDb2 } from "@/db";
import { app_categories, app_place, app_top_categories } from "@/db/schema";
import Categories from "./Categories";

export default async function Page() {

    const { db, connection } = await getDb2();
    // const places = await db.select().from(app_place).orderBy(app_place.id);
    const categories = await db.select().from(app_categories).orderBy(app_categories.id);
    const topcategories = await db.select().from(app_top_categories).orderBy(app_top_categories.id);
    connection.end();
    return <main>
            <Categories topcategories={topcategories} data={categories} />
    </main>
}