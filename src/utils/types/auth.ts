import { AdminUser } from "./admin";
import { UserDetails } from "./user";

export type ApiSignupResponse = {
    user: UserDetails;
    token: string;
    otp: string;
}

export type ApiAdminSignupResponse = {
    admin: AdminUser;
    token: string;
    otp: string;
}

export type UserAuthProps = {
    userId: string;
    userEmail: string;
}

export type AdminAuthProps = {
    adminId: string;
    adminEmail: string;
}