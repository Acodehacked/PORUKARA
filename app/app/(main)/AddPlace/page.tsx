import { getDb2 } from "@/db";
import { app_categories, app_place, app_sub_suggesstions, app_top_categories } from "@/db/schema";
import { AddPlace } from "./Addplace";

export const dynamic = 'force-dynamic';
export default async function Page() {
    const dynamic = 'force-dynamic';
    const { db, connection } = await getDb2();
    const categories = await db.select().from(app_categories).orderBy(app_categories.id);
    const topcategories = await db.select().from(app_top_categories).orderBy(app_top_categories.id);
    const suggestions = await db.select().from(app_sub_suggesstions).orderBy(app_sub_suggesstions.id);
    connection.end();
    return <main>
        <AddPlace suggestions={suggestions} topcategories={topcategories} categories={categories} />
    </main>
}