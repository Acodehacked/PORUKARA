import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Leave Application ',
    description: 'Leave Application page of Fr. Porukara CMI College,Champakulam'
}
export default function Page() {
    return <main className="min-h-[100vh] screen px-2 pt-[160px]">
        <h1 className="text-[30px] mt-6">Leave Application</h1>
        <div className="mt-4 text-[15px]">
            ATTENDANCE AND LEAVE<br /><br />
            Students are not allowed to take leave or remain absent
            from the College. However, in special circumstances,
            leave is granted as per University Rules. For this,
            request from the parents is required.<br /> In case of Medical
            leave,	a	Certificate	from	the	Registered	Medical	Practi-
            tioner is to be submitted, and these documents must be
            kept		in	the	leave	application	file.
            If leave is required for more than one hour, the student
            must apply for it in the prescribed format to th Principal.
            The reasons for each day’s absence will have to be
            explained and in the case of absence due to illness,
            a	medical	certificate	also	will	have	to	be	submitted
            especially	if	one	student	is	absent	for	more	than	five
            working days.
        </div>
    </main>
}
