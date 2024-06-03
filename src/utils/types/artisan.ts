
export type Artisan = {
    userId: string,
    userEmail?: string,
    workHourFrom: string,
    workHourTo: string,
    website: string,
    instagram: string,
    twitter: string,
    facebook: string,
    linkedin: string,
    phoneNumber: string,
    description: string,
    businessName: string,
    state: string,
    lga: string,
    showContact: boolean;
    areaOfSpecialization: string,
    nin: string,
}

export type ArtisanDetails = Artisan & {
    _id:string;
    createdAt: string,
      updatedAt: string,
}