import 'dotenv/config';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { getDb2 } from './index.js';

async function migration() {
    const { db, connection } = await getDb2();
    await migrate(db, { migrationsFolder: './drizzle' });
    connection.end();
    console.log('migrated Successfully')
    return 0;
}

migration();