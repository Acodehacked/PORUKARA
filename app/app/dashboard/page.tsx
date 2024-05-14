import DashboardCard from "@/components/reusable/public/DashboardCard";

export default function page() {
    return <main>
        <h2 className="text-[30px]">App dashboard</h2>
        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3 mt-3">
            <DashboardCard className="bg-white border-0 rounded-sm">
                <h5>Total users</h5>
                <h1 className="text-[30px] shadow-sm font-semibold">0</h1>
            </DashboardCard>
            <DashboardCard className="bg-white border-0 rounded-sm">
                <h5>Total Places added</h5>
                <h1 className="text-[30px] shadow-sm font-semibold">0</h1>
            </DashboardCard>
            <DashboardCard className="bg-white border-0 rounded-sm">
                <h5>Total Categories</h5>
                <h1 className="text-[30px] shadow-sm font-semibold">0</h1>
            </DashboardCard>
        </div>
    </main>
}