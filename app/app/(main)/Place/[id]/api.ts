'use server'
import { AddFormData } from "@/constants/types";
import { getDb2 } from "@/db";
import { app_place } from "@/db/schema";

type Location = google.maps.LatLng | undefined | null;
export async function AddNewPlace({id, cat_id, formData, image, subSuggestions, maplocation }: {id:number, cat_id: number, formData: AddFormData, image: string[], subSuggestions?: number[], maplocation: string }) {
    const { db, connection } = await getDb2();
    try {
        await db.update(app_place).set({
            app_category_id: cat_id,
            paid: formData.paid,
            paidPeriod: formData.paidPeriod,
            endDate: formData.endDate,
            googleLocation: maplocation,
            name: formData.name,
            place: formData.place,
            app_sub_suggestions: subSuggestions,
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
            latitude: `${formData.latitude}`,
            longitude: `${formData.longitude}`
        });
        connection.end();
        return {
            message: 'Edited Successfully',
            error: null
        }
    }catch (e){
        return {
            message: 'Already Added!'+e,
            error: 'Already'
        }
    }
}
