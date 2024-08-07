import { getDb2 } from ".";
import { AdminLoginTable, Review } from "./schema.js";
import bcrypt from "bcrypt";

async function main() {
    const {db,connection} = await getDb2();
    var password = '';
    // bcrypt.hash('demouser@porukara', 10).then(async (result: string) => {
    //     password = result || "Abianin";
    //     await db.insert(AdminLoginTable).values({
    //         name: 'Demo User',
    //         email: 'demo@gmail.com',
    //         password: password,
    //     })
    //     connection.end();
    //     console.log("Seeded successfully");
    // })
    // id: serial('id').primaryKey(),
    // userId: int('user_id').references(() => app_logintable.id),
    // placeId: int('place_id').notNull(),
    // review: varchar('review',{length:3000}).notNull(),
    // rating: decimal('rating',{precision:2,scale:1}).$type<number>().notNull().default(0.0),
    // status: text('status',{enum:['added','processing','verified','removed']}),
    // addedAt: timestamp('added_at').defaultNow(),
    await db.insert(Review).values({
        userId: 67,
        placeId: 39,
        review: 'Most Beatiful Place',
        rating: 3.5,
        status: 'added'
    })
} 
main();