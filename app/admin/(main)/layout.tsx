import 'boxicons/css/boxicons.css'
import React from 'react'

import { getServerSession } from 'next-auth'
import { Sidebar } from './sidebar';
export default async function Layout({ children }: { children: React.ReactNode }) {

    const session = await getServerSession();;

    return <main className="flex max-h-[100vh] overflow-x-hidden ">
        <Sidebar session={session} >
            {children}
        </Sidebar>
    </main>
}