
const paths = {
  home: "/",
  search: (query = '') => `/search/${query}`,
  searchArtisans: (query = '') => `/artisan/${query}`,

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

  premium: "/premium",

  // dynamic paths
  singleArtisan: (slug: string) => `/artisans/${slug}`,
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
  dashboardSettingsAccountDeletion: `/dashboard/settings/account-deletion`,
  dashboardLogout: `/logout`,

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

  // admin
  admin: "/admin",
  adminUsers: "/admin/users",
  adminSingleUser: (userId: string) => `/admin/users/${userId}`,
  adminFeedback: "/admin/feedback",
  adminReports: "/admin/reports",
  adminServices: "/admin/services",
  adminCategories: "/admin/categories",
  adminPayments: "/admin/payments",
  adminAdverts: "/admin/adverts",
  adminSettings: "/admin/settings",

  // admin auth
  adminLogin: "/admin-login",
  adminRegister: "/admin-register",
  adminForgotPassword: "/admin-forgot-password",
  adminLogout: "/admin/logout",
};

export default paths;
