'use client'

import { cn } from "@/lib/utils";

const DashboardCard = ({children,className,...props}:{children:React.ReactNode,className:string}) =>{
    return <div className={cn('p-4 border-[0.001rem] border-zinc-300 rounded-xl flex flex-col justify-center items-start text-foreground',className)} {...props}>
        {children}
    </div>
}

export default DashboardCard;