'use server'
import { AddFormData } from "@/constants/types";
import { getDb2 } from "@/db";
import { app_place } from "@/db/schema";
import { eq } from "drizzle-orm";

type SubSuggestions = {
    id: number;
    name: string | null;
};
type Location = google.maps.LatLng | undefined | null;
export async function AddNewPlace({ cat_id, formData, image, location, subSuggestions, maplocation }: { cat_id: number, formData: AddFormData, image: string[], location: Location, subSuggestions?: SubSuggestions[], maplocation: string }) {
    const { db, connection } = await getDb2();
    try {
        await db.insert(app_place).values({
            app_category_id: cat_id,
            paid: formData.paid,
            paidPeriod: formData.paidPeriod,
            endDate: formData.endDate,
            googleLocation: maplocation,
            name: formData.name,
            place: formData.place,
            sub_place: formData.sub_place,
            panchayatId: formData.panchayatId,
            wardNo: formData.wardNo,
            pinCode: formData.pinCode,
            address: formData.address,
            phone: formData.phone,
            email: formData.email,
            website: formData.website,
            socialLinks: formData.socialLinks,
            description: formData.description,
            facilities: formData.facilities,
            workingDays: formData.workingDays,
            openingTime: formData.openingHours,
            images: image,
            nearest_places: [],
            latitude: formData.latitude,
            longitude: formData.longitude
        });
        connection.end();
        return {
            message: 'Added Successfully',
            error: null
        }
    }catch (e){
        return {
            message: 'Already Added!'+e,
            error: 'Already'
        }
    }
}

export async function deletePlace(id: number) {
    const { db, connection } = await getDb2();
    await db.delete(app_place).where(eq(app_place.id, id))
    connection.end();
    return {
        message: 'Deleted Successfully',
        error: null
    }
}