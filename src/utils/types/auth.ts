import { UserDetails } from "./user";

export type ApiSignupResponse = {
    user: UserDetails;
    token: string;
    otp: string;
}