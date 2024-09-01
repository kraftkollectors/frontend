import { ReviewLineProps } from "@/components/ui/ReviewLines";
import { UserDetails } from "./types/user";
import { Artisan } from "./types/artisan";
import { Service, ServiceDetails } from "./types/service";
import { Payment } from "./types/payment";
import { ContactMessage } from "./types/contact";
import { resolve } from "path";
import { Category, SubCategory } from "./types/category";
import { Advert } from "./types/advert";

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
  updatedAt: '',
  longitude: '',
  latitude: '',
  active: true,
}

export const dummyPayment: Payment = {
  _id: "njbdmsn",
  amount: "20000",
  date: "02-04-2024 12:45:30",
  createdAt: "02-04-2024 12:45:30",
  plan: 'monthly',
  active: false,
  userId: "edrftgyhu"
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
  resolved: true

}

export const dummySubCategory: SubCategory = {
  _id: '1234569',
  title: "eatery",
  categoryId: "1256789",
  serviceCount: 10,
}

export const dummyCategory: Category = {
  _id: '1256789',
  title: 'food and resturant',
  serviceCount: 10,
  subcategories: [
    dummySubCategory,
    dummySubCategory,
  ]
}

export const dummyCategory2: Category = {
  _id: '16789',
  title: 'Code and tech',
  serviceCount: 10,
  subcategories: [
    dummySubCategory,
    dummySubCategory,
  ]
}


export const dummyAdvert: Advert = {
  _id: "gvhsdbcj",
  createdAt: "04-04-2024 12:45:30",
  duration: "7",
  image: "/images/become-a-seller.png",
  isActive: true,
  startDate: "04-04-2024 12:45:30",
  title: "Are you looking to get the best food? we have the best goat meat",
  url: "https://goats.com"
}
