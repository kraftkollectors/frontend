import { UserDetails } from "./user";

export type ApiSignupResponse = {
    user: UserDetails;
    token: string;
    otp: string;
}

export type UserAuthProps = {
    userId: string;
    userEmail: string;
}