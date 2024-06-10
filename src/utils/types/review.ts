
export type Review = {
    serviceId: string;
    userId: string;
    review: string;
    rating: number;
    _id: string;
    createdAt: string;
}

export type CummulativeReview = { averageRating: number, totalRatings: number }