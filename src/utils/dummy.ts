import { ArtisanReviewCardProps } from "@/components/ArtisanReviewCard";
import { ServiceCardProps } from "@/components/ServiceCard";
import { ReviewLineProps } from "@/components/ui/ReviewLines";

export const dummyServices: ServiceCardProps[] = [
  {
    img: "/images/auth-bg.png",
    title: "I will create the altimate sound track for your events",
    price: "200,000",
    duration: "session",
    category: "Entertainment | Dj",
    id: "7912gfbh",
    artisan: {
      name: "John Doe",
      img: "/images/auth-bg.png"
    }
  },
  {
    img: "/images/auth-bg.png",
    title: "I will create the altimate sound track for your events",
    price: "200,000",
    duration: "session",
    category: "Entertainment | Dj",
    id: "h9fufos",
    artisan: {
      name: "John Doe",
      img: "/images/auth-bg.png"
    }
  },
  {
    img: "/images/auth-bg.png",
    title: "I will create the altimate sound track for your events",
    price: "200,000",
    duration: "session",
    category: "Entertainment | Dj",
    id: "wf9huf",
    artisan: {
      name: "John Doe",
      img: "/images/auth-bg.png"
    }
  },
  {
    img: "/images/auth-bg.png",
    title: "I will create the altimate sound track for your events",
    price: "200,000",
    duration: "session",
    category: "Entertainment | Dj",
    id: "ouhfefg",
    artisan: {
      name: "John Doe",
      img: "/images/auth-bg.png"
    }
  },
  {
    img: "/images/auth-bg.png",
    title: "I will create the altimate sound track for your events",
    price: "200,000",
    duration: "session",
    category: "Entertainment | Dj",
    id: "9un3v",
    artisan: {
      name: "John Doe",
      img: "/images/auth-bg.png"
    }
  },
  {
    img: "/images/auth-bg.png",
    title: "I will create the altimate sound track for your events",
    price: "200,000",
    duration: "session",
    category: "Entertainment | Dj",
    id: "9fuhufwje",
    artisan: {
      name: "John Doe",
      img: "/images/auth-bg.png"
    }
  }
];

export const dummyReviews: ArtisanReviewCardProps[] = [
  {
    id: "w78efg",
    user: {
      name: "Josh Binus",
      img: "/images/auth-bg.png"
    },
    rating: 4,
    review: "Excellent service, I wish I could give more than 5 stars",
    date: "12/12/2023",
    service: {
      id: "97qfwbh",
      title: "Dj Sets",
      duration: "session",
      price: "20,000",
      img: "/images/auth-bg.png"
    }
  },
  {
    id: "8uwfhe",
    user: {
      name: "Josh Binus",
      img: "/images/auth-bg.png"
    },
    rating: 4,
    review: "Excellent service, I wish I could give more than 5 stars",
    date: "12/12/2023",
    service: {
      id: "97qfwbh",
      title: "Dj Sets",
      duration: "session",
      price: "20,000",
      img: "/images/auth-bg.png"
    }
  },
  {
    id: "ouwvbiewbf",
    user: {
      name: "Josh Binus",
      img: "/images/auth-bg.png"
    },
    rating: 4,
    review: "Excellent service, I wish I could give more than 5 stars",
    date: "12/12/2023",
    service: {
      id: "97qfwbh",
      title: "Dj Sets",
      duration: "session",
      price: "20,000",
      img: "/images/auth-bg.png"
    }
  }
];

export const dummyReviewsLine: ReviewLineProps[] = [
  { label: 5, value: 100, percentage: 50 },
  { label: 4, value: 10, percentage: 5 },
  { label: 3, value: 30, percentage: 20 },
  { label: 2, value: 30, percentage: 20 },
  { label: 1, value: 30, percentage: 20 }
];
