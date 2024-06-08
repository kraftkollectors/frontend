import { FaCediSign } from "react-icons/fa6";

const paths = {
  home: "/",
  search: (query = '') => `/search/${query}`,

  // auth paths
  login: "/login",
  signup: "/signup",
  signupDetails: "/signup/details",
  signupToken: "/signup/token",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  // legal
  support: "/contact",
  contact: "/contact",
  termsAndConditions: "/terms-and-conditions",

  // become a seller
  becomeASeller: "/become-a-seller",
  becomeASellerPersonalDetails: "/become-a-seller/personal-details",
  becomeASellerPersonalInfo: "/become-a-seller/personal-information",
  becomeASellerIdVerification: "/become-a-seller/id-verification",

  // dynamic paths
  artisan: (slug: string) => `/artisans/${slug}`,
  service: (slug: string) => `/services/${slug}`,

  // dashboard
  dashboard: "/dashboard",
  dashboardReviews: `/dashboard/reviews`,
  dashboardSaved: "/dashboard/saved",

  // dashboard settings
  dashboardSettings: `/dashboard/settings`,
  dashboardSettingsPersonalDetails: `/dashboard/settings/personal-details`,
  dashboardSettingsAccount: `/dashboard/settings/account`,
  dashboardSettingsPassword: `/dashboard/settings/change-password`,
  dashboardSettingsPhoto: `/dashboard/settings/photo`,
  dashboardSettingsContactInfo: `/dashboard/settings/contact-information`,
  dashboardSettingsNotification: `/dashboard/settings/notification`,
  dashboardLogout: `/dashboard/logout`,

  // dashboard chats
  dashboardChats: `/dashboard/chats`,
  dashboardSingleChat: (slug: string) => `/dashboard/chats/${slug}`,

  //dashboard services
  dashboardServices: `/dashboard/services`,
  dashboardNewService: `/dashboard/services/new`,
  dashboardEditService: (serviceId: string)=>`/dashboard/services/${serviceId}`,

  // app
  android: "/",
  ios: "/",

  // socials
  facebook: "/",
  instagram: "/",
  twitter: "/",
  tiktok: "/",
  linkedin: "/",
};

export default paths;
