import Image from "next/image";

export default function Layout({children}:{children:React.ReactNode}){
    return <main className="min-h-[100vh]">
        <div className="w-full p-3 flex justify-between">
            <Image src={'/assets/app/app_logo.png'} width={60} height={60} alt="My Kuttanad Logo" />
        </div>
        {children}
    </main>   
}