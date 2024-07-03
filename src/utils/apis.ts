const API = "https://backends-865y.onrender.com";
const STATES_AND_CITIES_API = 'https://abundiko-api.vercel.app/api';
const admin = API + '/admin';

/**
 * NOTE:
 * all user forms submitted must send {userId: the users _id, userEmail: the users email} and header: {x-access-token: the token returned from login and register}
 */

const apis = {
    /**
     * POST - users login {email:string, password:string}
     */
    login: API + "/users/login",
    /**
     * POST - google auth register and login. {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    gender: string;
} for register | {email:string} for login
      */
    googleAuth: API + "/users/google/signup",
    /**
     * POST - register new user. 
     * {
     * email: string;
    firstName: string;
    lastName: string;
    userName: string;
    gender: string;
    password: string;
     * }
     */
    register: API + "/users/register",
    /**
     * POST - verify user email after register
     * {
     * token: string,
     * email: string,
     * }
     */
    registerVerifyEmail: API + "/users/verifyemail",
    /**
     * POST - resend verification code
     * {email: string}
     */
    resendVerificationCode: API + "/users/otpagain",
    /**
     * POST - forgot password verify email
     * {email: string} response: {otp, stored}
     */
    forgotPasswordSendEmail: API + "/users/forgot",
    /**
     * POST - reset forgot password
     *  {otp, stored, email, password}
     */
    forgotPasswordReset: API + "/users/reset",
    /**
     * POST - upload a file and return a url
     * FormData {file}
     * response - {uploadUrl: string }
     */
    uploadSingleFile: API + "/users/geturl",
    /**
     * POST - upload a multi files and return urls
     * FormData {file}
     * response - [{uploadUrl: string }]
     */
    uploadManyFiles: API + "/users/geturls",
    /**
     * POST - upload a certificate for a user
     * {
    certificate: string;
    certifiedBy: string;
    year: string;
}
     */
    uploadCertificate: API + "/users/certificate",
    /**
     * POST - upload education for a user
     * {university: string;
    degree: string;
    areaOfStudy: string;
    year: string;}
     */
    uploadEducation: API + "/users/education",
    /**
     * @param id (the certificate id)
     * PATCH - edit a certificate
     * {...same as create certificate}
     * DELETE - delete a certificate
     * {...same as create certificate}
     */
    editCertificate(id: string) {
        return `${API}/users/certificate/${id}`
    },
    /**
     * @param id (the education id)
     * PATCH - edit a education
     * {...same as create education}
     * DELETE - delete a education
     * {...same as create education}
     */
    editEducation(id: string) {
        return `${API}/users/education/${id}`
    },
    /**
     * @param id (the user _id)
     * GET - get an artisan object
     */
    getArtisan(id: string) {
        return `${API}/users/artisan/${id}`
    },
      /**
     * @param id (the user _id)
     * GET - get a user object
     */
    getUser(id: string) {
        return `${API}/users/dashboard/${id}`
    },
      /**
     * @param id (the user _id)
     * PATCH - change user password
     * {password: string}
     */
    updateUserPassword(id: string) {
        return `${API}/users/dashboard/password/${id}`
    },
      /**
     * @param id (the user _id)
     * PATCH - update artisan details
     * {... any from the Artisan Model}
     */
    updateArtisanProfile(id: string) {
        return `${API}/users/artisan/${id}`
    },
      /**
     * @param id (the user _id)
     *  PATCH - update user details
     * {... any from the User Model}
     */
    updateUserProfile(id: string) {
        return `${API}/users/dashboard/profile/${id}`
    },
      /**
     * @param id (the user _id)
     * GET - get user certificates
     */
    getUserCertificates(id: string) {
        return `${API}/users/certificate/user/${id}`
    },
    /**
     * @param id (the user _id)
     * GET - get user educations
     */
    getUserEducations(id: string) {
        return `${API}/users/education/user/${id}`
    },

    // states and cities
    /**
     * GET - get nigerian states and lgas
     * response: {name: string, capital: string, lgas: []}
     */
    nigerianStates: `${STATES_AND_CITIES_API}/nigerian-states`,


    artisan: API + "/users/artisan",
    services: API + "/users/ads",
      /**
     * @param id (the user _id)
     * GET - get all services posted by artisan
     */
    getArtisanServices(id: string) {
        return `${API}/users/myads/${id}`
    },
      /**
     * @param id (the service _id)
     * GET - get a service
     */
    getSingleArtisanService(id: string) {
        return `${API}/users/ads/${id}`
    },
    /**
     * @param id (the service id)
     * PATCH - edit a service
     * {...same as create service}
     * DELETE - delete a service
     * {...same as create service}
     */
    editArtisanService(id: string) {
        return `${API}/users/ads/edit/${id}`
    },
    /**
     * GET - get my favourite services
     * @param id (the user _id)
     */
    myFavouriteServices: (id: string) => (`${API}/users/getsavead/${id}`),

    /**
     * POST - contact support
     * {    email: string,
    name: string,
    phone: string,
    subject: string,
    message: string,}
     */
    contactSupport: API + "/users/contact",
    /**
     * POST - report a service
     * { reporterId: string (the user id);
    reportedId: string (the service id);
    postId: string;}
     */
    reportService: API + "/users/reportad",
    /**
     * POST - rate a service
     * {serviceId: string;
    rating: string 1,2,3,4,5;
    reviewerId: string}
     */
    rateService: API + "/users/rateads",
    /**
     * GET - get the reviews of a user
     * @param id (the user _id)
     */
    userReviews: (userId: string) => (API + "/users/userreviews/" + userId),
    /**
     * GET - get the reviews count of a user
     * @param id (the user _id)
     */
    userReviewsCount: (userId: string) => (API + "/users/userreviewscount/" + userId),
    /**
     * GET - get the ratings of a service
     * @param id (the service _id)
     */
    getServiceRatings: (id: string) => (`${API}/users/rateads/${id}`),
    /**
     * GET - check if a service is in favourite
     * @param user (the user _id)
     * @param service (the service _id)
     */
    checkFavourite: (user: string, service: string) => (`${API}/users/checksavead?userid=${user}&serviceid=${service}`),
    /**
     * POST - add a service to favourites
     * {serviceId: string}
     */
    makeFavourite: (`${API}/users/savead`),
    /**
     * DELETE - Delete a service from favourites/saved
     * @param userId (the user _id)
     * @param serviceId (the service _id)
     */
    deleteFavourite: (userId: string, serviceId: string) => (`${API}/users/savead?userid=${userId}&serviceid=${serviceId}`),

    getChatHeads: (userId: string) => `${API}/users/chatheads/${userId}`,
    /** */
    deleteChat: (chatId: string) => `${API}/users/chat/${chatId}`,
    /**
     * GET - updates the last seen of a user (use >= 30s interval to update this)
     * @param userId (the user _id)
     */
    updateLastSeen: (userId: string) => `${API}/users/lastseen/${userId}`,
    /**
     * GET - get the previous chats in a chat room
     * @param userId (the user _id)
     * @param guestId (the guest|second person _id)
     * QueryParams: time=<the time of the first fetched Message object> (optional). if set, fetches the 10 messages before [time]
     * response: list of Messages
     */
    getChats: (userId: string, guestId: string) => `${API}/users/chat?userid=${userId}&receiverid=${guestId}`,

    // admin endpoints
    /**
     * POST - register admin. {email: string, password: string, accessCode: string}
     */
    adminRegister: `${admin}/register`,
    /**
     * POST - login admin {email: string, password: string}
     */
    adminLogin: `${admin}/login`,
    /**
     * GET - get admin details
     */
    adminDashboard: (adminId: string) => `${admin}/dashboard/${adminId}`,
    /**
     * PATCH - edit admin password. {password: string}
     */
    adminPassword: (adminId: string) => `${admin}/dashboard/password/${adminId}`,
    /**
     * GET - get user details
     * 
     * PATCH - activate/disable user. {active: true|false}
     * 
     * DELETE - delete a user
     */
    adminSingleUser: (userId: string) => `${admin}/users/${userId}`,
    /**
     * GET - get all users.
     * sort = date | a-z
        artisanOnly = true(only artisans) | false(only users) (if not set, return all users)
     */
    getUsers: `${admin}/users`,
    /**
     * GET - get all adverts.
     */
    getAdverts: `${admin}/paidads`,
    /**
     * GET - get all feedbacks.
     */
    getFeedbacks: `${admin}/contact`,
    /**
     * @param id (the feedback _id)
     * GET - get single feedback.
     * PATCH - update the feedback
     * DELETE - delete the feedback
     */
    getSingleFeedbacks: (id: string)=>`${admin}/contact`,
    /**
     * GET - get all categories
     * POST - create a category
     */
    category: `${admin}/cat/category`,
    /**
     * GET - get a categories
     * PATCH - edit a category
     * DELETE - edit a category
     */
    singleCategory: (id:string)=>`${admin}/cat/category/${id}`,
    /**
     * GET - get all sub-categories
     * POST - create a sub-category
     */
    subCategory: `${admin}/cat/subcategory`,
    /**
     * GET - get one sub-category
     * PATCH - edit a sub-category
     * DELETE - edit a sub-category
     */
    singleSubCategory: (id:string)=>`${admin}/cat/subcategory/${id}`,
    
    getTransactions: `${admin}/transactions`,
    getCategories: ``,
}

export default apis;