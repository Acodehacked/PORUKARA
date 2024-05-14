// import { db } from "@/db";
import { getDb } from "@/db";
import { AdminLoginTable } from "@/db/schema";
import { compare, hash } from "bcrypt";
import { sql } from "drizzle-orm";
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions = NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/admin/login'
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'username', type: 'text', placeholder: 'Enter Your Username', },
        password: { label: 'Username', type: 'password' },
      },
      async authorize(credentials, req) {
        const db = await getDb();
        
        const user = await db.select().from(AdminLoginTable).where(
          sql`${AdminLoginTable.email}=${credentials?.username}`);

        let User = {
          id: '',
          name: '',
          email: ''
        }
        if (user.length > 0) {
          User = {
            id: user[0].id.toString(),
            name: user[0].name || "",
            email: user[0].email || ""
          };
          if (await compare(credentials?.password || '',user[0].password || 'Unknownpass')) {
            return User;
          }
        }
        return null;
      },
    })
  ]
});

export { authOptions as GET, authOptions as POST }
