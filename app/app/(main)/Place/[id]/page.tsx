import { getDb2 } from "@/db";
import { app_categories, app_place, app_sub_suggesstions, app_top_categories } from "@/db/schema";
import { Place } from "./Place";
import { eq, param } from "drizzle-orm";

export default async function Page({ params }: { params: { id: string } }){
    const { db, connection } = await getDb2();
    const categories = await db.select().from(app_categories).orderBy(app_categories.id);
    const topcategories = await db.select().from(app_top_categories).orderBy(app_top_categories.id);
    const suggestions = await db.select().from(app_sub_suggesstions).orderBy(app_sub_suggesstions.id);
    const place = await db.select().from(app_place).where(eq(app_place.id,parseInt(params.id)));
    connection.end();
    return <main>
        <Place place={place[0]} id={parseInt(params.id)} suggestions={suggestions} topcategories={topcategories} categories={categories} />
    </main>
}