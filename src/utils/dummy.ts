import { ArtisanReviewCardProps } from "@/components/ArtisanReviewCard";
import { Service } from "@/utils/types/service";
import { ReviewLineProps } from "@/components/ui/ReviewLines";

const _dummyServices = [
  {
    coverPhoto: "/images/auth-bg.png",
    title: "I will create the altimate sound track for your events",
    estimatedPrice: "200,000",
    charge: "session",
    category: "Entertainment | Dj",
    _id: "7912gfbh",
    
  },
  {
    coverPhoto: "/images/auth-bg.png",
    title: "I will create the altimate sound track for your events",
    estimatedPrice: "200,000",
    charge: "session",
    category: "Entertainment | Dj",
    _id: "h9fufos",
    
  },
  {
    coverPhoto: "/images/auth-bg.png",
    title: "I will create the altimate sound track for your events",
    estimatedPrice: "200,000",
    charge: "session",
    category: "Entertainment | Dj",
    _id: "wf9huf",
    
  },
  {
    coverPhoto: "/images/auth-bg.png",
    title: "I will create the altimate sound track for your events",
    estimatedPrice: "200,000",
    charge: "session",
    category: "Entertainment | Dj",
    _id: "ouhfefg",
    
  },
  {
    coverPhoto: "/images/auth-bg.png",
    title: "I will create the altimate sound track for your events",
    estimatedPrice: "200,000",
    charge: "session",
    category: "Entertainment | Dj",
    _id: "9un3v",
    
  },
  {
    coverPhoto: "/images/auth-bg.png",
    title: "I will create the altimate sound track for your events",
    estimatedPrice: "200,000",
    charge: "session",
    category: "Entertainment | Dj",
    _id: "9fuhufwje",
    
  },
];

export const dummyServices = _dummyServices as Service[];

export const dummyReviews: ArtisanReviewCardProps[] = [
  {
    id: "w78efg",
    user: {
      name: "Josh Binus",
      img: "/images/auth-bg.png",
    },
    rating: 4,
    review: "Excellent service, I wish I could give more than 5 stars",
    date: "12/12/2023",
    service: {
      _id: "97qfwbh",
      title: "Dj Sets",
      charge: "session",
      estimatedPrice: "20,000",
      coverPhoto: "/images/auth-bg.png",
    },
  },
  {
    id: "8uwfhe",
    user: {
      name: "Josh Binus",
      img: "/images/auth-bg.png",
    },
    rating: 2,
    review: "Excellent service, I wish I could give more than 5 stars",
    date: "12/12/2023",
    service: {
      _id: "97qfwbh",
      title: "Dj Sets",
      charge: "session",
      estimatedPrice: "20,000",
      coverPhoto: "/images/auth-bg.png",
    },
  },
  {
    id: "ouwvbiewbf",
    user: {
      name: "Josh Binus",
      img: "/images/auth-bg.png",
    },
    rating: 3.5,
    review: "Excellent service, I wish I could give more than 5 stars",
    date: "12/12/2023",
    service: {
      _id: "97qfwbh",
      title: "Dj Sets",
      charge: "session",
      estimatedPrice: "20,000",
      coverPhoto: "/images/auth-bg.png",
    },
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
