import { ChevronRight } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: 'Rules and Regulations | Fr. Porukara CMI College,Champakulam',
    description: 'Rules and Regulations of Fr. Porukara CMI College,Champakulam'
}
export default function Page() {
    return <main className="min-h-[100vh] screen px-2 pt-[170px]">
        <h1 className="text-[35px] mt-3">Rules & Regulations</h1>
        <div className="flex md:flex-row flex-col gap-3 mt-2 relative">
            <div className="mt-4 text-justify text-[15px] mb-5 w-full px-2 md:me-2">
                1.    The principal is the ultimate disciplinary authority of the
                college.<br />
                2. Political activities from the part of students and the
                members of staff are strictly forbidden on the college
                campus.<br />
                3. Smoking, consumption of alcoholic beverages and use
                of narcotic drugs are strictly prohibited. Criminal pro
                ceedings will be taken against those found under the
                influence	of	alcohol	or	narcotic	drugs	within	the	campus.
                <br />
                4. Vandalism and destruction of college property will be se
                verely dealt with and material loss will be fully recovered
                with		fine.<br />
                5.	Students	should	wear	at	all	times	college	ID	cards	which
                should be shown to the authorities and to the college
                security when demanded. Class teachers may see to it
                that students comply with this.<br />
                6. When the students meet a member of the staff within
                the	campus	or	outside,	they	should	greet	him/her	as	a
                mark of respect.<br />
                7. Teachers shall be responsible for maintaining discipline
                in the classes.<br />
                8. Students are expected to keep decency and decorum in
                their dress and behaviour.<br />
                9.	Conduct	certificate	will	not	be	issued	as	a	matter	of
                course. It has  to be earned by a student{'\''}s good conduct
                and	behaviour.	The	decision	of	the	Principal	shall	be	final
                regarding this matter, and will not be based on any rec
                ommendation.<br />
                10. Any meeting of the faculty, staff or students on the col
                lege campus shall be arranged only with the explicit
                permission of the college authorities.<br />
                11. In the interest of the institution and for the sake of dis
                cipline, the principal is entitled to refuse admission to an
                applicant, to suspend, dismiss or take any other punitive
                action	on	any	student	for	his/her	conduct.
                <br />
                12. Misconduct shall include:<br />
                a)	Staying	away	from	classes	without	sufficient
                reason.<br />
                b) Disrespectful behaviour towards the members of
                the staff.<br />
                c) Provoking students to strike and participate in
                strike, dharna etc. in  the college.<br />
                d) Loitering in and around the main gate, porch, stair
                and the verandas during free hours and creating
                disturbance to the classes in progress. (During
                free hours, the students are expected to make use
                of the library or go to the retiring rooms.)<br />
                e) Disorderly behaviour in the class.<br />
                f) Organizing tours without the permissions of the
                Principal.<br />
                g) Organizing meetings in the college or displaying
                notices on the college notice boards without the
                permission of the  Principal.<br />
                h)	Distributing	leaflets,	handbills	or	other	materials
                and displaying banners and posters inside the
                campus.<br />
                i)	Abusive	or	obscene	words	or	drawing	figures	on
                black boards or any kind of writing on the walls or
                other places in college or on the campus.<br />
                13)  The teachers shall be present in the class before the
                third bell so that they may give good example to the
                students  by participating in prayer.<br />
                <br />
                14)  It is the duty of the students and the staff to get in
                formed	of	all	the		rules	and	notifications	of	the	college
                from time  to  time.<br /><br />
                <b>The following activities are banned in the college
                    campus as per the State Government order:</b><br />
                1.	Ban	on	ragging	as	per	Government	order	16992/Leg
                B/97	dated	24th	April	1998	and	1943/2005UVV	dated
                21st	November	2005.<br />
                2. Ban on the use of cell phone (Mobile Phone) as per
                order	RT/340/	05/UVV	dated	1st	March	2005.<br />
                3.	Ban	on	Cinematic	Dance	as	per	order	RT/340/05/UVV
                dated	1st	March	2005.<br />
            </div>
            <div className="flex flex-col h-max pb-6 sticky top-[100px] items-center md:max-w-[350px] w-full bg-white px-3">
                <h5 className="text-[23px] pt-3 font-semibold px-2 text-center">Related Contents</h5>
                <Link href={'/LeaveApplication'} className="pt-4 justify-between bg-black/10 mt-3 pb-4 px-5 text-[15px] flex w-full">
                    Leave Application <ChevronRight />
                </Link>
                <Link href={'/StudentCouselling'} className="pt-4 justify-between bg-black/10 mt-3 pb-4 px-5 text-[15px] flex w-full">
                    Students Couselling <ChevronRight />
                </Link>
            </div>
        </div>
    </main>
}