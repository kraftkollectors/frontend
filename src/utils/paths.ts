const paths = {
  home: "/",

  // auth paths
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  // become a seller
  becomeASeller: "/become-a-seller",
  becomeASellerPersonalDetails: "/become-a-seller/personal-details",
  becomeASellerEducation: "/become-a-seller/education",

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
  dashboardSettingsContactInfo: `/dashboard/settings/contact-information`,
  dashboardSettingsNotification: `/dashboard/settings/notification`,

  // dashboard chats
  dashboardChats: `/dashboard/chats`,
  dashboardSingleChat: (slug: string) => `/dashboard/chats/${slug}`,

  //dashboard services
  dashboardServices: `/dashboard/services`,
  dashboardNewService: `/dashboard/services/new`,
};

export default paths;
