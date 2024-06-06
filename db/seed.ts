import { getDb2 } from ".";
import { AdminLoginTable } from "./schema.js";
import bcrypt from "bcrypt";

async function main() {
    const {db,connection} = await getDb2();
    var password = '';
    bcrypt.hash('demouser@porukara', 10).then(async (result: string) => {
        password = result || "Abianin";
        await db.insert(AdminLoginTable).values({
            name: 'Demo User',
            email: 'demo@gmail.com',
            password: password,
        })
        console.log("Seeded successfully")
    })
} 
main();