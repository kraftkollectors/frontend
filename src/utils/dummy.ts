import { ArtisanReviewCardProps } from "@/components/reviewCard/ArtisanReviewServiceCard";
import { Service } from "@/utils/types/service";
import { ReviewLineProps } from "@/components/ui/ReviewLines";

export const dummyReviews: ArtisanReviewCardProps[] = [
  {
    _id: "w78efg",
    rating: 4,
    review: "Excellent service, I wish I could give more than 5 stars",
    createdAt: "12/12/2023",
    serviceId: "hewe cbdcn ,d",
    reviewerId: "null"
  },
  {
    _id: "8uwfhe",
    rating: 2,
    review: "Excellent service, I wish I could give more than 5 stars",
    createdAt: "12/12/2023",
    serviceId: "hewe cbdcn ,d",
    reviewerId: "null"
  },
  {
    _id: "ouwvbiewbf",
    rating: 3.5,
    review: "Excellent service, I wish I could give more than 5 stars",
    createdAt: "12/12/2023",
    serviceId: "hewe cbdcn ,d",
    reviewerId: "null"
  },
];

export const dummyRelatedSearch = [
  {
    title: "House music",
    id: "11",
  },
  {
    title: "Party DJ",
    id: "12",
  },
  {
    title: "DJ Controller",
    id: "13",
  },
  {
    title: "Club DJ",
    id: "14",
  },
];

export const dummyReviewsLine: ReviewLineProps[] = [
  { label: 5, value: 100, percentage: 50 },
  { label: 4, value: 10, percentage: 5 },
  { label: 3, value: 30, percentage: 20 },
  { label: 2, value: 30, percentage: 20 },
  { label: 1, value: 30, percentage: 20 },
];
