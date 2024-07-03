import UploadImages from "@/components/reusable/admin/UploadImages";
import { useRef } from "react";
import Categories from "./Places";
import { getDb2 } from "@/db";
import { app_categories, app_place } from "@/db/schema";
import Places from "./Places";


export default async function Page() {

    const { db, connection } = await getDb2();
    const places = await db.select().from(app_place).orderBy(app_place.id);
    const categories = await db.select().from(app_categories).orderBy(app_categories.id);
    connection.end();
    return <main>
            <Places data={places} categories={categories} />
    </main>
}