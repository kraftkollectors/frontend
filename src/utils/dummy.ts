import { ReviewLineProps } from "@/components/ui/ReviewLines";
import { UserDetails } from "./types/user";
import { Artisan } from "./types/artisan";
import { Service, ServiceDetails } from "./types/service";
import { Payment } from "./types/payment";
import { ContactMessage } from "./types/contact";
import { resolve } from "path";
import { CategoryDetails, SubCategoryDetails } from "./types/category";

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

export const dummyUser: UserDetails = {
  _id: "hsdvajfh",
  firstName: "John",
  lastName: "Doe",
  userName: "JohnDoe",
  email: "john@yahoo.com",
  gender: "male",
  createdAt: "10-12-2023 12:12:04",
  active: true,
  emailVerify: true,
  image: "",
  isArtisan: true,
} as UserDetails;

export const dummyArtisan: Artisan = {
  userId: "hvbdhabdjkbj",
  businessName: "John's spoon",
  areaOfSpecialization: "Professional chef",
  available: true,
  description: "I am a professional chef that will make your food stand out so much",
  facebook: "fb.com/john",
  instagram: "fb.com/john",
  twitter: "fb.com/john",
  linkedin: "fb.com/john",
  website: "fb.com/john",
  lga: "umuahia",
  state: "Abia",
  nin: '12345678910',
  phoneNumber: "+2347031594603",
  showContact: true,
  workHourFrom: '06:30',
  workHourTo: '18:30',
  awayMessage: "I am away so don't message me",
  userEmail: "john@gmail.com"
}

export const dummyService: Service = {
  _id: "vhjbdasncfs",
  address: "that str, aba road",
  category: "food and resturant",
  charge: "fixed",
  coverPhoto: "/images/galaxy s24.jpg",
  createdAt: "01-02-2024 10:45:23",
  description: "I can cook and I can clean, lemme do this thing for u",
  estimatedPrice: "20000",
  portfolio: ["/images/galaxy s24.jpg", "/images/galaxy s24.jpg"],
  state: "imo",
  subCategory: "cooking",
  title: "I cook the best dishes",
  userId: "jnakcamanskdnsdk",
  updatedAt: ''
}

export const dummyPayment: Payment = {
  _id: "njbdmsn",
  amount: "20000",
  date: "02-04-2024 12:45:30",
  duration: 'monthly',
  isActive: false
}

export const dummyContact: ContactMessage = {
  _id: "ggdgg",
  createdAt: "04-04-2024 12:45:30",
  email: "hello@gmail.com",
  message: "i don't cut grass",
  name: "jake",
  phone: "0708456233",
  read: true,
  subject: "",
  status: "resolved"

}

export const dummySubCategory: SubCategoryDetails = {
  _id: '1234569',
  title: "eatery",
  categoryId: "1256789",
  servicesCount: 10,
}

export const dummyCategory: CategoryDetails = {
  _id: '1256789',
  title: 'food and resturant',
  servicesCount: 10,
  subCategories: [
    dummySubCategory,
    dummySubCategory,
  ]
}

export const dummyCategory2: CategoryDetails = {
  _id: '16789',
  title: 'Code and tech',
  servicesCount: 10,
  subCategories: [
    dummySubCategory,
    dummySubCategory,
  ]
}
