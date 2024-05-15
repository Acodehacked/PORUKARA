import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page(){
    const session = await getServerSession();

    if(session == null){
        redirect('/admin/login');
    }else{
        redirect("/admin/dashboard")
    }
    return <div className="flex h-[100vh]">
        <aside className="max-w-[300px] w-full bg-white rounded-tr-xl">
            Links
        </aside>
    </div>
}
