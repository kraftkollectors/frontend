
export type Review = {
    serviceId: string;
    reviewerId: string;
    ownerId: string;
    review: string;
    rating: number;
    _id: string;
    createdAt: string;
}

export type CummulativeReview = { averageRating: number, totalRatings: number }

export type TotalUserReviews = {
    totalRatings: number,
    ratingCounts: { '1': number, '2': number, '3': number, '4': number, '5': number, };
    sumRating: number;
}