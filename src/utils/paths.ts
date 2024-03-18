const paths = {
  home: "/",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",

  // dynamic paths
  artisan(slug: string) {
    return `/artisans/${slug}`;
  },
  service(slug: string) {
    return `/services/${slug}`;
  }
};

export default paths;
