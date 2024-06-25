// import { db } from "@/db";
import { getDb2 } from "@/db";
import { AdminLoginTable } from "@/db/schema";
import { compare, hash } from "bcrypt";
import { eq, sql } from "drizzle-orm";
import { connect } from "http2";
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
        const { db, connection } = await getDb2();

        const user = await db.select().from(AdminLoginTable).where(
          sql`${AdminLoginTable.email}=${credentials?.username}`);

        let User = {
          id: '',
          name: '',
          email: '',
        }
        if (user.length > 0) {
          console.log(user)
          User = {
            id: user[0].id.toString(),
            name: user[0].name || "",
            email: user[0].email || "",
          };
          if (user[0].status == 'offline') {
            if (await compare(credentials?.password || '', user[0].password || 'Unknownpass')) {
              if (user[0].email != 'abina5448@gmail.com') {
                const resp = await db.update(AdminLoginTable).set({
                  status: 'online'
                }).where(eq(AdminLoginTable.id,user[0].id));
                console.log(resp)
                connection.end();
              }
                return User;
            }
          }
        }
        return null;
      },
    })
  ]
});

export { authOptions as GET, authOptions as POST }
