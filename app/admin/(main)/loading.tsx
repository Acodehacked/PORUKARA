import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return <main className="p-3">
        <Skeleton className="w-[100px] h-[20px] mt-2 mb-5"></Skeleton>
        <div className="flex flex-col gap-4 overflow-hidden">
            <Skeleton className="w-[500px] h-[30px] mt-2 mb-5"></Skeleton>
            <Skeleton className="w-[600px] h-[30px] mt-2 mb-5"></Skeleton>
            <Skeleton className="w-[460px] h-[30px] mt-2 mb-5"></Skeleton>
            <Skeleton className="w-[560px] h-[30px] mt-2 mb-5"></Skeleton>
            <Skeleton className="w-[300px] h-[30px] mt-2 mb-5"></Skeleton>
        </div>
    </main>
}