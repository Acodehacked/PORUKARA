
import React from 'react'
import { HomeAboutUs, HomeMissionandVision } from '@/components/reusable/public/HomeAboutUs'
import HomeAll from '@/components/reusable/public/HomeAll'
import { AdmssionForm, HomeCoreValues, HomeEvents, HomeHead } from '@/components/reusable/public/HomeEvents'
import HomeCentres from '@/components/reusable/public/HomeCentres'
import HomeActivities from '@/components/reusable/public/HomeActivities'
import HomeGallery from '@/components/reusable/Home/HomeGallery'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Fr. Porukara CMI College of Advanced Studies | Champakulam, Kerala, India.',
    generator: 'porukaracollege, PorukaraCollege, Porukara Website, porukara, Fr Porukara School, Official Website of Porukara CMI College, Kerala ',
    description: 'Official Website of Porukara CMI Colllege, Champakulam, Kerala, India. Fr Porukara College Admission Opened. Apply for BCA, B.Com, BA and other 4 year UG Programmes. Admissions Open Admissions Open for BCA, BCOM with Finance and Taxation, BCOM with Computer Application, BA English Contact: 9446249412',
    keywords: 'Fr. Porukara CMI College, BCA Colleges,Best BCA, B.Com COllege in kerala,Colleges in Kerala,Best Colleges in Kuttanad, Best College in Alappuzha,BCA,B.Com',
    openGraph: {
        type: "website",
        url: "https://porukaracollege.in",
        title: "Fr. Porukara CMI Colllege of Advanced Studies",
        description: "Offical website of Fr. Porukara CMI College of advanced Studies, Gagultha Monastry,Champakulam , Kerala",
        siteName: "Fr. Porukara CMI College",
        images: ["https://porukaracollege.in/assets/thumbnail.webp"],
    }
  }
export default function Page() {
    return <main className='w-100 bg-foreground min-h-[100vh] block relative'>
        <HomeAll />
        <div className='bg-white'>
            <HomeEvents />
            <HomeHead />
            <HomeCentres />
            <HomeGallery />
            <HomeActivities />
            <HomeAboutUs />
            <div className='screen flex items-center flex-col'>
                <h2 className='text-[35px] font-bold mb-3 text-pink-700 text-center'>Some of the CMI institutions</h2>
                <Link className='link-hover text-[20px] hover:underline' href={'http://www.cmi.org.in/'}>http://www.cmi.org.in/</Link>
                <div className='flex md:flex-row flex-col px-4 items-center md:justify-center md:items-start pt-5'>
                    <Image className='md:w-[40%]' src={'/assets/cmi.webp'} width={400} height={400} alt='CMI institutes' />
                    <table border={1} className='screen-lg table-custom text-[20px] text-primary mb-4'>
                        <tr>Christ University, Bangalore,<br /> </tr>
                        <tr>
                            Kristhu Jyayanthi College, Bangalore,
                        </tr>
                        <tr>
                            Christ College, Pune,<br />

                        </tr>
                        <tr>
                            S. H. College, Thevara<br />

                        </tr>
                        <tr>
                            Rajagiri Group of Schools and Colleges, Kochi<br />

                        </tr>
                        <tr>
                            Rajagiri Hospital, Aluva<br />

                        </tr>
                        <tr>
                            Christ College, Irinjalakuda<br />

                        </tr>
                        <tr>
                            K.E. College, Mannanam,<br />

                        </tr>
                        <tr>
                            KE Carmel School, Muhamma <br />

                        </tr>
                        <tr>
                            St. Joseph{'\''}s College, Moolamattom<br />

                        </tr>
                        <tr>
                            Christ College, Puliyanmala<br />

                        </tr>
                        <tr>
                            Devagiri College, Kozhikode<br />

                        </tr>
                        <tr>
                            Carmel Polytechnic & Engineering College, Punnapra<br />

                        </tr>
                        <tr>
                            KE Carmel Group of Schools, Kolkata<br />

                        </tr>
                        <tr>
                            Devagiri Public School, Kozhikode<br />

                        </tr>
                        <tr>
                            Chavara Cultural Centre, Kochi<br />

                        </tr>
                        <tr>
                            Darsana ,Kottayam<br />

                        </tr>
                        <tr>
                            Amala Medical College, Thrissur<br />
                        </tr>
                        <tr>
                            Chethana Music Academy, Thrissur<br />
                        </tr>
                        <tr>
                            Christ Central-Thiruvalla </tr>
                        <tr>
                            Kristhu Jyothi Institutions ,Chethipuzha<br />
                        </tr>
                        <tr>
                            Sargakshethra, Chethipuzha</tr>
                        <tr>
                            Christ Nagar Group of Institutions, Trivandrum<br />
                        </tr>
                        <tr>
                            Silverhills School, Kozhikode,<br />
                        </tr>
                        <tr>
                            Porukara Central School, Champakulam,<br />
                        </tr>
                        <tr>
                            St. Joseph{'\''}s and KE Carmel Schools, Pulincunnu,</tr>
                    </table>
                </div>

            </div>
            <AdmssionForm />
        </div>
    </main >

}