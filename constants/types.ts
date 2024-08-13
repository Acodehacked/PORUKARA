export type AddFormData = {
    paid: boolean,
    paidPeriod: number,
    endDate: Date,
    name: string,
    place: string,
    description: string,
    sub_place: string,
    panchayatId: number,
    wardNo: number | null,
    pinCode: number | null,
    address: string,
    phone: string[],
    website: string | null,
    socialLinks: {
        type: string,
        link: string,
        text: string
    }[],
    email: string,
    facilities: string[],
    workingDays: {
        from: string,
        to: string
    } | null,
    openingHours: {
        from: string,
        to: string
    } | null,
    latitude:string,
    longitude:string
}
