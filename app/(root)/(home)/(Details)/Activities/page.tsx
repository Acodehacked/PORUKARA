import { Metadata } from 'next'
import Activities from './Activities'

export const metadata: Metadata = {
    title: 'Activities',
    description: 'Activities in Fr. Porukara CMI College,Champakulam'
}
export default function Page() {
    return <main style={{ background: 'url("/assets/bg3.webp") no-repeat', backgroundSize: 'cover' }} className="min-h-[100vh] pt-[100px]">
        <Activities />
    </main>
}