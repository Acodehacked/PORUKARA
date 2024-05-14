import Image from "next/image";

export default function NotFound(){
    return <main className="bg-zinc-50 min-h-[100vh] flex justify-center flex-col items-center">
        <h1 className="text-[40px]">404 Error</h1>
        <p>Page Not found</p>
    </main>
}