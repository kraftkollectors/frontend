import { Artisan } from "./artisan";

export type UserDetails = {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    gender: string;
    image: string;
    publicId: string;
    isArtisan: boolean;
    active: boolean;
    emailVerify: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
    lastSeen: string;
    paymentPlan: string;
    notify: boolean;
    notifyReview: boolean;
    __v: number;
  };

  export type UserDetailsPlus = UserDetails & {
    certificates: any[],
    education: any[],
    artisan: Artisan[],
  }