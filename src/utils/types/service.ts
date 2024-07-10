import { CummulativeReview } from "./review";

export type Service = {
    _id: string;
    createdAt: string;
    updatedAt: string;
    address: string;
    title: string;
    category: string;
    subCategory: string;
    description: string;
    estimatedPrice: string;
    state: string;
    longitude: string;
    latitude: string;
    charge: string;
    userId: string;
    portfolio: string[];
    coverPhoto: string;
    active: boolean;
}

export type ServiceDetails = Service & {
    similarAds: Service[];
    cummulativeRating: CummulativeReview
}