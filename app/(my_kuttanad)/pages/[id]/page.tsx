import { getDb2 } from "@/db";
import { AppShareTable, app_place } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    // read route params
    const { db, connection } = await getDb2();
    var name = "";
    var image: string = "";
    const share = await db.select().from(AppShareTable).where(eq(AppShareTable.userId, params.id)).limit(1);
    if (share.length > 0) {
        const ShareName = share[0].userName;
        const SharePlace = share[0].pageId;
        if (share != null) {
            const place = await db.select().from(app_place).where(eq(app_place.id, SharePlace));
            if (place.length > 0) {
                name = place[0].name;
                image = `https://mykuttanadu.s3.us-west-1.amazonaws.com/${place[0].images[0]}`;
            }
        }
    }
    connection.end();
    return {
        title: `${name} | My Kuttanad App, No.1 Travel App for kuttand`,
        description: 'Discover the world like never before with Kuttand, your all-in-one travel app designed to make your adventures seamless and unforgettable. Whether you\'re planning a weekend getaway or a month-long expedition, Kuttand is your trusty sidekick, providing everything you need from start to finish.',
        openGraph: {
            images: [image],
        },
    }
}
type Place = {
    id: number;
    app_category_id: number;
    name: string;
    phone: string[];
    email: string | null;
    website: string | null;
    description: string | null;
    images: string[];
    videos: string[];
    facilities: string[];
    activities: string[];
    nearest_places: number[];
    latitude: number;
    longitude: number;
}[];

export default async function Page({ params }: { params: { id: string } }) {

    const { db, connection } = await getDb2();
    var place: Place | null = null;
    var ShareName: string = "";
    var image: string = "";
    const share = await db.select().from(AppShareTable).where(eq(AppShareTable.userId, params.id)).limit(1);
    if (share.length > 0) {
        ShareName = share[0].userName;
        const SharePlace = share[0].pageId;
        if (share != null) {
            place = await db.select().from(app_place).where(eq(app_place.id, SharePlace));
        }
    } else {
        return notFound();
    }
    connection.end();
    return <div className="screen flex flex-col items-center">
        <div className="p-3">
            <h2>shared by {ShareName}</h2>
            
        </div>
        {
            place != null ? <div className="max-w-[300px] w-full mx-auto rounded-xl overflow-hidden">
            <Image src={`https://mykuttanadu.s3.us-west-1.amazonaws.com/${place[0].images[0]}`} width={300} height={300} alt='' />
        </div> : ''
        }
        <div className="px-3 py-1">
            <h3 className="text-[24px] font-bold">{place != null ? place[0].name : ''}</h3>
        </div>
    </div>
}