import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import './globals.css';

export default function NotFound(){
    return <main className="bg-zinc-50 min-h-[100vh] flex justify-center flex-col items-center">
        <img src={'/assets/logo-gold.webp'} width={100} height={100} alt="logo" />
        <h1 className="text-[40px]">404 Error</h1>
        <p>Page Not found</p>
        <Button variant={'outline'} asChild className="mt-3"><Link href={'/'}>Back to Home</Link></Button>
    </main>
}