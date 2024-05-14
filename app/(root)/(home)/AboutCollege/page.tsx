import { Metadata } from 'next';
import AboutCollege from './AboutCollege';
export const metadata: Metadata = {
    title: 'About College',
    description: 'About Fr. Porukara CMI College,Champakulam'
}
export default function Page() {
    return <main className="min-h-[100vh] pt-[100px] bg-zinc-200">
       <AboutCollege />
    </main>
}