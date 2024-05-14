import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
    title: 'National Service Scheme Report | Fr. Porukara CMI College',
    description: 'Report of the National Service Scheme of Fr. Porukara CMI College,Champakulam'
}
export default function Page() {
    return <main className="screen min-h-[100vh] pt-[180px]">
        <div className="flex items-center gap-3 justify-center">
            <Image src={'/assets/nss-logo.jpeg'} width={100} height={100} className="rounded-full" alt="Nss logo" />
            <h2 className="text-[25px]">National Service Scheme</h2>
        </div>
        <div className=" text-foreground mx-auto p-2 text-center mt-3 text-[16px]">
            Report: 2023 – 2024
        </div>
        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col gap-2 px-6">
                <p className="text-[15px] text-justify pe-2">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3">Environment Day Seminar: </h4>
                    {'In commemoration of World Environment Day on June 5th, the NSS unit spearheaded a thought-provoking seminar, dubbed "Karuthal," on June 6th. The event, held at 2:30 PM in the college auditorium, commenced with the stirring strains of the NSS anthem, followed by a warm welcome from Program Officer Soniya Aby. Dr. Josey Kollamalil, the esteemed college principal, graced the occasion as the presiding authority. Mrs. JalajaKumari, President of ChambakulamGrama Panchayat, inaugurated the proceedings, joined by dignitaries such as Ward Member Mr. Thomas Joseph and Staff Secretary Mrs. Asha Annie Thomas. The engaging discourse featured presentations by dedicated NSS volunteers, culminating in the heartfelt felicitation of Volunteer Secretary Abhishek. The event concluded with a harmonious rendition of the NSS anthem, echoing the commitment to environmental stewardship.'}
                </p>
                <Image src={'/assets/1.png'} alt="" width={300} height={100} className="md:max-w-[490px] w-full rounded-2xl" />
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex flex-col gap-2 px-6">
                <p className="text-[15px] text-justify pe-2">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3">International Day of Yoga: </h4>
                    {'In celebration of the International Day of Yoga on June 21st, the NSS unit at Porukara College orchestrated a rejuvenating yoga session. Held within the serene confines of the college auditorium, the program commenced with a soulful prayer, followed by a gracious welcome from Program Officer Soniya Aby. The esteemed presence of Mr. RaghunathGanapathi, an eminent Art of Living instructor, added fervor to the event as he expounded on the transformative power of yoga. Enthusiastic students eagerly participated in invigorating yoga asanas under his expert guidance, fostering a deeper connection with their inner selves. Volunteer Jubimol, effusing with gratitude, encapsulated the collective sentiment at the close of the session.'}
                </p>
                <div className="flex md:flex-row flex-col w-full px-4 gap-4 overflow-hidden"> 
                    <Image src={'/assets/2.png'} alt="" width={600} height={200} className="md:max-w-[600px] h-[200px]  aspect-video w-full rounded-2xl" />
                    <Image src={'/assets/3.png'} alt="" width={300} height={100} className="w-auto h-[200px] rounded-2xl" />
                </div>
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col gap-2 px-6">
                <p className="text-[15px] text-justify pe-2">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3">Book Day Celebration: </h4>
                    {'In collaboration with avid bibliophiles, the NSS unit of Fr. Porukara CMI College of Advanced Studies orchestrated a vibrant Book Day celebration. The event, held on June 26th in the college auditorium, commenced with a soulful prayer, followed by a warm welcome from NSS Program Officer Mrs. Soniya Aby. Dr. Josey Kollamalil, the venerable college principal, presided over the proceedings, lending his august presence to the occasion. The ceremonious inauguration, graced by renowned songwriter Mr. VayalarSarathchandra Varma, heralded a literary feast for the senses. Volunteer Secretary Abhishek eloquently conveyed sentiments of gratitude, underscoring the profound impact of literature in enriching lives. The festivities culminated in a captivating book fair organized by DC Books, igniting a fervent passion for reading among attendees.'}
                </p>
                <Image src={'/assets/4.png'} alt="" width={900} height={50} className="md:max-w-[50%] rounded-2xl mt-10" />
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col gap-2 px-6">
                <p className="text-[15px] text-justify pe-2">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">Anti-Drugs Awareness Seminar: </h4>
                    {'Under the proactive leadership of the NSS unit at Champakulam College, a transformative awareness session titled \'YuvaLahari\' was convened. On September 25th, amidst the hallowed halls of the college auditorium, NSS volunteers initiated the proceedings with a solemn prayer, setting the tone for introspection and enlightenment.'} <br /> {'Volunteer Ananthakrishnan extended a heartfelt welcome, paving the way for Advocate Sharanya T. Nair to inaugurate the event with her insightful address. Students, galvanized by a shared resolve against substance abuse, actively engaged in discussions encompassing crucial topics such as the POCSO Act and anti-ragging measures.'}<br /> {'The session culminated in a poignant expression of gratitude by JubimolBiju, symbolizing the collective commitment to a drug-free future.'}
                </p>
                <Image src={'/assets/5.png'} alt="" width={300} height={100} className="md:max-w-[290px] w-full rounded-2xl" />
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col gap-2 px-6">
                <p className="text-[15px] text-justify pe-2">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">Anganvady and UP School Sanitation Drive:  </h4>
                    {'Embracing the ethos of community service, the NSS unit of Fr. Porukara CMI College embarked on a transformative sanitation drive on July 12, 2023. Guided by the indomitable spirit of Program Officer Soniya Aby, volunteers zealously undertook the noble task of fostering cleanliness and hygiene in Anganvady and UP School premises. Over the course of two days, volunteers meticulously cleaned and beautified the surroundings, with a keen focus on areas susceptible to water stagnation and plastic waste accumulation. The concerted efforts, buoyed by the unwavering dedication of Volunteer Secretaries, epitomized the transformative potential of collective action in nurturing sustainable communities. A well-deserved reprieve awaited volunteers, as they basked in the camaraderie of shared accomplishments over refreshing refreshments at the college.'}
                </p>
            </div>
            <div className="p-3">
                <Image src={'/assets/6.png'} alt="" width={900} height={300} className="md:max-w-[590px] w-full rounded-2xl" />
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col gap-2 px-6">
                <p className="text-[15px] text-justify pe-2">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">Independence Day Football Match:  </h4>
                    {'In honor of Independence Day, the National Service Scheme (NSS) organized a friendly football match at the college on August 15, 2023, under the leadership of NSS Program Officer Soniya Aby. College Principal Dr. Josey Kollamalil inaugurated the event, marking the commencement of a spirited competition. NSS members were divided into two teams, engaging in a thrilling match where Team A succumbed to Team B by two goals. The match resonated with excitement and enthusiasm, particularly among the children. Following the intense showdown, the winners were bestowed trophies by the principal, fostering a sense of achievement and camaraderie. All participating children were encouraged and treated to refreshments, further enhancing the celebratory atmosphere. Through this spirited competition, the children exemplified unity and affection, epitomizing the spirit of Independence Day. The event concluded with heartwarming handshakes exchanged among the  participants, leaving behind cherished memories of camaraderie. The volunteer secretary extended gratitude to all involved, encapsulating the collective appreciation for the memorable event.'}
                </p>
                <Image src={'/assets/7.png'} alt="" width={300} height={100} className="md:max-w-[390px] w-full rounded-2xl" />
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 px-6">
                <Image src={'/assets/8.png'} alt="" width={300} height={100} className="md:max-w-[390px] w-full rounded-2xl" />
                <p className="text-[15px] text-justify ps-3">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">Orientation Program: </h4>
                  {'  New members joining the National Service Scheme participated in an orientation program organized by the college on August 10, 2023. The program, facilitated by the Principal of PorukkaraB.Ed College, Dr. SojanScaria, provided comprehensive insights into the NSS, its objectives, and activities. Icebreaking games were incorporated to foster connections among the new members and facilitate a welcoming atmosphere. NSS Program Officer Soniya Aby and other faculty members actively engaged  with the volunteers, offering guidance and support. Martin Antony represented the volunteers and expressed gratitude for the enriching session, symbolizing the unity and commitment among the NSS community.'}
                </p>

            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col gap-2 px-6">
                <p className="text-[15px] text-justify pe-2">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">Computer Familiarization for School Children: </h4>
                    {'Under the leadership of the NSS unit, computer classes were conducted for the students of Champakkulam SH School on November 16, 2023. As part of the National Service Scheme\'s initiatives in the adopted school, students were equipped with essential computer skills. Volunteers from the college escorted the students to the college computer lab, where they were introduced to basic computer concepts by volunteers Roshan Dev and Devi Jayakumar. With personalized assistance from volunteers, each student gained hands-on experience in using computers, fostering a sense of confidence and proficiency. The session concluded with refreshments provided to the students, further enhancing their learning experience and appreciation for technology. Teachers and Program Officer Siddharth actively participated, underscoring the collaborative efforts to empower students through digital literacy.'}
                </p>
                <Image src={'/assets/9.png'} alt="" width={300} height={100} className="md:max-w-[390px] w-full mt-6 rounded-2xl" />
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 px-6">
                <p className="text-[15px] text-justify ps-3">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">Computer Literacy for Kudumbasree Members: </h4>
                    {'In collaboration with the ChampakkulamGramaPanchayat, Champakkulam College initiated computer literacy training for Kudumbasree members under the Family Welfare Scheme. Selected members attended classes at the college, where NSS volunteers imparted basic computer training and instructions on usage. Program Officer Siddharth and faculty members such as Satyalekshmi, Angel, and Aswathi actively engaged with the participants, catering to their unique learning needs. The eager participation of Kudumbasree workers demonstrated their enthusiasm to enhance their skills and broaden their opportunities. The session concluded on a positive note, with participants expressing gratitude for the invaluable learning experience, further empowering them in their endeavors.'}
                </p>

            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 px-6">
                <p className="text-[15px] text-justify ps-3">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">School Students Visit College Library: </h4>
                    {'In a bid to cultivate reading habits among school students, the National Service Scheme (NSS) organized a visit to the college library for school children. Program Officer Siddharth welcomed the students, while volunteer secretary Martin expounded on the importance of reading. With the assistance of volunteers, the children perused the extensive collection of books, immersing themselves in the world of literature. After indulging in reading, they engaged in lively discussions about the books. NSS volunteer Devi underscored the significance of reading, enriching the student\'s understanding further. As the visit concluded, the students departed for school, enriched with newfound knowledge and appreciation for literature.'}
                </p>
                <Image src={'/assets/10.png'} alt="" width={300} height={100} className="md:max-w-[390px] w-full rounded-2xl" />
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 px-6">
                <Image src={'/assets/11.png'} alt="" width={300} height={100} className="md:max-w-[390px] w-full rounded-2xl" />
                <p className="text-[15px] text-justify ps-3">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">Leadership Training Class: </h4>
                    {'The NSS volunteers at Porukara College orchestrated a leadership training class, held in the auditorium on December 7th at 10:00 AM. Commencing with the NSS anthem, Program Officer Siddharth S extended a warm welcome to the students. The session, led by Mr. Manoj Xavier, a professor at St. Aloysius College, delved into the history, objectives, and activities of NSS. Mr. Xavier emphasized the importance of leadership qualities and a positive attitude among students, elucidating their responsibilities and roles over the two years of service. The Secretary, Martin Antony, expressed gratitude as the meeting concluded with tea, marking the culmination of a fruitful session.'}
                </p>

            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col gap-2 px-6">

                <p className="text-[15px] text-justify pe-3">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">Leadership Training Class: </h4>
                    {'In collaboration with the Grama Panchayat of Champakkulam and the Department of Revenue, a camp for Aadhaar enrollment was organized at the college on January 27, 2024. College Principal Dr. JoseyKollamalil provided instructions as NSS volunteers assumed leadership roles in the camp. The event offered various services, including new Aadhaar card enrollment, correction of errors, and photo updates, with participation exceeding three hundred individuals over the two-day event. Volunteers actively facilitated the registration processes, ensuring a seamless experience for all participants.'}
                </p>
                <div className="mx-auto w-full max-w-[390px]">
                    <Image src={'/assets/12.png'} alt="" width={300} height={100} className=" w-full rounded-2xl" />
                </div>
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 px-6">
                <div className="mx-auto w-full max-w-[290px]">
                    <Image src={'/assets/13.png'} alt="" width={300} height={100} className=" w-full rounded-2xl" />
                </div>
                <p className="text-[15px] text-justify ps-3">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">Election Awareness Seminar: </h4>
                   {' Under the collaboration of the Revenue Department and assistance from the Taluk Office of Kuttanad, the NSS organized an Election Awareness Seminar on March 22, 2024. Commencing with the NSS anthem, Program Officer Jithu Jos extended a warm welcome to all attendees. Representatives from the Revenue Department elucidated the voting process, emphasizing its importance. Students were acquainted with electronic voting machines through mock voting sessions, fostering practical understanding. Volunteers addressed queries, with Volunteer Devi Jayakumar expressing gratitude as the session concluded.'}
                </p>
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col gap-2 px-6">
                <p className="text-[15px] text-justify pe-2">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3">Awareness Classes in the Schools of Kuttanad: </h4>
                   {' On October 16, 2023, under the leadership of Porukkara CMI College\'s PRISM (Porukkara Research, Innovation, and Social Action Mentoring) and the NSS, third-year B.Com (Vocational) students, along with various departments, provided life skill lessons for school children. These lessons encompassed diverse subjects and aimed to empower ordinary students across several schools in Kuttanad. Children were prepared for classes covering topics including online gaming, cybercrimes, health issues, drugs, food adulteration, and study habits.'}
                </p>
                <Image src={'/assets/14.png'} alt="" width={300} height={100} className="md:max-w-[490px] w-full rounded-2xl" />
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 px-6">
                <Image src={'/assets/15.png'} alt="" width={300} height={100} className="md:max-w-[250px] w-full rounded-2xl" />
                <p className="text-[15px] text-justify ps-2">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3">Christmas Celebration: </h4>
                    {'The students of Champakulam CMI College celebrated Christmas and New Year with residents of various centers on December 21, 2023. They visited centers such as ThalavadiSnehalayam, Punnappura Mary Bhavan, PathirappallyKarunyaDeepam, and ParavoorPrathyashaBhavan, organizing various activities including distributing sweets, singing Christmas carols, and dancing. Under the leadership of NSS volunteers, the celebrations were divided into four groups, fostering meaningful interactions with the elderly and creating cherished memories.'}
                </p>

            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col gap-2 px-6">
                <p className="text-[15px] text-justify pe-2">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3">Food Distribution:  </h4>
                   {' Under the leadership of the NSS, Porukkara College organized food distribution on July 26. Students contributed food items, which were distributed to the residents of ThalavadiSnehabhavan along with prepared clothing. This act of compassion conveyed a message of love and solidarity, bringing joy to both the children and recipients.'}
                </p>
                <Image src={'/assets/16.png'} alt="" width={300} height={200} className="md:max-w-[590px] max-h-[400px] h-full w-full rounded-2xl" />
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 px-6">
                {/* <div className="mx-auto w-full max-w-[290px]">
                    <Image src={'/assets/13.png'} alt="" width={300} height={100} className=" w-full rounded-2xl" />
                </div> */}
                <p className="text-[15px] text-justify ps-3">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">Onam Celebration: </h4>
                   {' The Onam celebration at Porukkara College, organized by the NSS on August 23, welcomed residents from  to partake in the festivities. Various cultural programs and Onam games were organized, fostering moments of joy and camaraderie. After the feast, residents were escorted back to Snehabhavan, with NSS volunteers leading the activities alongside faculty members and students.'}


                </p>
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 px-6">
                <div className="mx-auto w-full max-w-[290px]">
                    <Image src={'/assets/17.png'} alt="" width={300} height={100} className=" w-full rounded-2xl" />
                </div>
                <p className="text-[15px] text-justify ps-3">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">Entrepreneurship Discussion: </h4>
                    {'Under the leadership of the NSS, a discussion on entrepreneurship initiatives was held at Porukkara College on January 5. Mebin, a former student and NSS volunteer, shared his ideas for a new initiative, engaging participants in brainstorming sessions. The initiative aimed to promote creativity and innovation among faculty and students.'}

                </p>
            </div>
        </div>

        <div className="bg-white mt-4 p-4">
            <div className="flex md:flex-row flex-col-reverse gap-2 px-6">

                <p className="text-[15px] text-justify ps-3">
                    <Image src={'/assets/nss-logo.jpeg'} width={70} height={70} className="rounded-full" alt="Nss logo" />
                    <h4 className="text-[26px] font-semibold  mb-2 gap-2 items-center left-primary ps-3 text-start">Seminar The Agricultural:  </h4>
                   {' An agricultural seminar, organized in collaboration with the NSS and the Champakkulam Block and Panchayath, addressed challenges faced by farmers in the countryside. Discussions, led by professionals, focused on livelihood issues and potential solutions. The seminar underscored the importance of social and economic surveys in fostering rural development, with directives provided for addressing farmers\' needs. Dr. JoseyKollamalil, the college principal, emphasized children\'s involvement in the seminar, appointing volunteers to lead the discussions.'}

                </p>
            </div>
            <div className="flex flex-wrap p-3 gap-3">
                <Image src={'/assets/18.png'} alt="" width={300} height={100} className=" w-auto rounded-2xl" />
                <Image src={'/assets/19.png'} alt="" width={300} height={100} className=" w-auto rounded-2xl" />
                <Image src={'/assets/20.png'} alt="" width={300} height={100} className=" w-auto rounded-2xl" />
            </div>
        </div>
    </main>
}

