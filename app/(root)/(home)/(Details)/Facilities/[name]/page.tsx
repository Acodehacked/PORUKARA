import Course from "@/components/reusable/public/Course";
import { COURSES, FACILITES } from "@/constants";
import { ArrowRightIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type facilityType = {
    text: string,
    title: string,
    image: string,
    description: string
} | null;
type Props = {
    params: { name: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    // read route params
    var Facilitiy: facilityType = {
        title: 'dfd',
        image: 'dffdfdf',
        text: '',
        description: 'dd'
    };
    var find = false;
    FACILITES.forEach((fac) => {
        if (params.name == fac?.text) {
            Facilitiy = fac;
            find = true;
        }
    })
    if (Facilitiy?.title == 'dfd') {
        return notFound()
    }
    return {
        title: Facilitiy?.title,
        openGraph: {
            images: [Facilitiy?.image],
        },
    }
}

export default function Page({ params }: { params: { name: string } }) {
    var Facilitiy: facilityType = {
        title: 'dfd',
        image: 'dffdfdf',
        text: '',
        description: 'dd'
    };
    var find = false;
    FACILITES.forEach((fac) => {
        if (params.name == fac?.text) {
            Facilitiy = fac;
            find = true;
        }
    })
    if (Facilitiy?.title == 'dfd') {
        return notFound()
    }
    const fac2 = FACILITES.filter((item) => item.title != Facilitiy?.title);
    return <main className="pt-[200px] screen px-4 items-center">
        <h2 className="text-[30px] left-primary bg-white px-4 py-1 mb-2 w-max">
            {Facilitiy.title}
        </h2>
        <p className="text-black/70">AboutCollege &gt; Facilities &gt; {Facilitiy.text}</p>
        <div className="flex w-full mt-5 md:gap-5 md:flex-row flex-col items-start mb-5">
            <div className="md:max-w-[350px] w-full flex flex-col items-center">
                <Image width={500} height={400} className="rounded-sm" src={`/assets/${Facilitiy.image}.jpg`} alt={`${Facilitiy.title} image`} />
                <div className="px-2 flex flex-col mt-3 w-full">
                    <span className="text-[16px] text-zinc-600 px-4 py-2 peer">Other Facilities</span>
                    <div className="w-full">
                        {fac2.map((item, index) => {
                            return <Link href={`/Facilities/${item.text}`} className="shadow-sm w-full px-4 py-2 bg-white flex justify-between items-center group rounded-sm my-1" key={index}>
                                {item.title}
                                <ArrowRightIcon size={15} className="text-zinc-400 transition-all ms-[-10px] group-hover:scale-105 group-hover:text-black" />
                            </Link>
                        })}
                    </div>
                </div>
            </div>
            <p className="md:w-[70%] w-full px-4 md:pt-0 pt-4">
                {Facilitiy.description}
                {Facilitiy.title == 'Library' ? <div>
                    <h3 className="text-[27px] font-semibold">Library Rules & Reguations</h3>
                    <hr className="mb-2 mt-2" />

                    1. On entering the library, one should register their name
                    and signature in the register book.
                    <br />
                    2. Borrowing of books and documents without a valid ID
                    card number is not allowed.
                    <br />
                    3. The use of another{'\''}s Identity card is prohibited.
                    <br />
                    4. Students should keep silence in the Library.
                    <br />
                    5.	Personal	belongings	must	be	kept	in	the	provided	cupboards outside the Library. The management  is not responsible for any item left in the Library.
                    <br />
                    6. Food or Drink is not allowed in the Library.
                    <br />
                    7. Laptop if used in the library must have its own power
                    and cable connectors.
                    <br />
                    8. Cell phones are to be set in the {'\"'}OFF{'\"'} or {'\"'}VIBRATOR{'\"'}
                    mode prior to  entering the Library.
                    <br />
                    9.	The	use	of	pen	drive	is	strictly	prohibited	in	the	library.
                    <br />
                    10. Students must take care of the Library books and must
                    not deface,  underline, write or draw in the books.
                    <br />
                    11. If any student intentionally deface or damage any
                    library	item,	will	have	his/her	Library		privileges	revoked
                    for a period of time determined by the Library Committee.
                    <br />
                    12. The Library is available for the use of all members of
                    Fr. Porukara CMI College. Its working hours are
                    9.00	am	to	5.00	pm	Monday	to	Saturday.
                    <br />
                    13. Students may borrow books or Journals during the working hours at   the library circulation Counter. A Student
                    can borrow books by following the rules of the library.
                    The books are issued for students for a period of seven
                    days & for the teaching staff maximum seven books for
                    one month. Fine will be charged on late return of books,
                    periodicals and CD{'\''}s.
                    <br />
                    14. Books and Periodicals borrowed from the library cannot
                    be taken  outstation unless special permission is given.
                    Students  should deposit their borrowed books in the
                    library before they go on leave.
                </div> : ''}
                {Facilitiy.title == 'Computer Lab' ? <div>
                    <h3 className="text-[27px] font-semibold">Computer Lab Instructions</h3>
                    <hr className="mb-2 mt-2" />
                    1. Students should keep their foot wears, bag and other
                    belongings outside the computer lab and bring only the
                    lab assignment related  books with them.
                    <br />
                    2. Students are not allowed to bring food & drinks in to the
                    lab.
                    <br />
                    3. Students should keep silence in the lab.
                    <br />
                    4. Computer lab is to be used only for academic purposes.
                    <br />
                    5.	Students,	who	enter	the	lab	should	write	their	Name,
                    Roll no, system no, etc. in the Lab Register. Don{'\''}t forget
                    to write logout time on leaving the lab.
                    <br />
                    6. Students are supposed to use the system allotted to
                    them, only during the lab hours.
                    <br />
                    7. Students are not allowed to use the lab resources or
                    printers for personal  use.
                    <br />
                    8. Students are not permitted to do any changes in the
                    system	properties,	system	configurations,	either	hard-
                    ware or software. {'('}Eg. Display Properties, screen savers,
                    wallpapers, network properties, etc.{')'}
                    <br />
                    9.	Students	are	not	allowed	to	download,	install	or	use	any
                    outside software in the lab.
                    <br />
                    10. Do not use games, chat rooms or messengers.
                    <br />
                    11. Students are not permitted to rearrange or replace or
                    misplace any of the computer peripherals such as monitor, CPU, Keyboard, mouse etc..else seek the help of the system administrator under unavoidable circumstances.
                    <br />
                    12. Before leaving the lab, students should shutdown the
                    system allotted to them and arrange their chairs properly.
                </div> : ''}
                {Facilitiy.title == 'Chapel' ? <div>
                    <h3 className="text-[27px] font-semibold">About Chapel</h3>
                    <hr className="mb-2 mt-2" />
                    <p className="text-justify text-[16px]">
                        Nestled within the serene confines of the college grounds, the chapel stands as a beacon of spiritual solace and architectural grace. Its elegant facade, adorned with intricate stained glass windows depicting scenes of faith and enlightenment, invites students, faculty, and visitors alike to step into a realm of tranquility and contemplation. Inside, the air is imbued with a sense of reverence, heightened by the soft glow of candlelight and the gentle strains of sacred music echoing off the polished wooden pews. Sunlight filters through the high vaulted ceilings, casting a warm and ethereal glow upon the altar where the flickering candles dance in homage to something greater than oneself. Here, amidst the hushed whispers of prayer and the subtle scent of incense, one finds a sanctuary for reflection, renewal, and communion with the divine.
                    </p>
                </div> : ''}
                {Facilitiy.title == 'Canteen' ? <div>
                    <h3 className="text-[27px] font-semibold">About Canteen</h3>
                    <hr className="mb-2 mt-2" />
                    <p className="text-justify text-[15px]">
                        The college canteen exudes a vibrant energy, serving as a bustling hub where students gather to refuel both body and spirit. Its inviting aroma of freshly brewed coffee and sizzling delicacies wafts through the air, enticing passersby with promises of culinary delights. With its eclectic menu catering to diverse tastes and dietary preferences, the canteen becomes a melting pot of flavors, where friendships are forged over shared meals and laughter. Brightly lit and adorned with colorful posters advertising upcoming events and student initiatives, the canteen pulsates with the rhythm of campus life. Here, amidst the lively chatter and clinking of cutlery, students find respite from their academic pursuits, forming bonds that transcend classroom boundaries. Whether grabbing a quick bite between classes or lingering over a leisurely meal with friends, the college canteen offers a dynamic space where nourishment, camaraderie, and a sense of belonging converge.
                    </p>
                </div> : ''}
                {Facilitiy.title == 'Seminar Hall' ? <div>
                    <h3 className="text-[27px] font-semibold">About Seminar Hall</h3>
                    <hr className="mb-2 mt-2" />
                    <p className="text-justify text-[15px]">
                        Nestled at the heart of academic discourse, the college seminar hall stands as a testament to the pursuit of knowledge and the exchange of ideas. Its spacious interior, adorned with rows of comfortable seating and equipped with state-of-the-art audiovisual technology, provides a conducive environment for intellectual exploration and scholarly engagement. Bathed in the soft glow of ambient lighting, the hall exudes an aura of anticipation, as students and faculty alike gather to participate in lectures, workshops, and symposiums. Here, amidst the hushed whispers of eager minds and the occasional rustle of notebooks, vibrant discussions unfold, fueled by a shared passion for learning and discovery. Whether hosting distinguished guest speakers or facilitating student-led presentations, the seminar hall serves as a catalyst for intellectual growth and academic excellence. It is a place where ideas take flight, boundaries are challenged, and new horizons of understanding are illuminated, shaping the future leaders and innovators of tomorrow.
                    </p>
                </div> : ''}

            </p>
        </div>
    </main>
}