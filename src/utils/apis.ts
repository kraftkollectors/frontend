const API = "https://backends-865y.onrender.com";
const STATES_AND_CITIES_API = 'https://abundiko-api.vercel.app/api';
const admin = API + '/admin';

const apis = {
    login: API + "/users/login",
    googleAuth: API + "/users/google/signup",
    register: API + "/users/register",
    registerVerifyEmail: API + "/users/verifyemail",
    resendVerificationCode: API + "/users/otpagain",
    forgotPasswordSendEmail: API + "/users/forgot",
    forgotPasswordReset: API + "/users/reset",

    uploadSingleFile: API + "/users/geturl",
    uploadManyFiles: API + "/users/geturls",
    uploadCertificate: API + "/users/certificate",
    uploadEducation: API + "/users/education",
    editCertificate(id: string) {
        return `${API}/users/certificate/${id}`
    },
    editEducation(id: string) {
        return `${API}/users/education/${id}`
    },
    getArtisan(id: string) {
        return `${API}/users/artisan/${id}`
    },
    getUser(id: string) {
        return `${API}/users/dashboard/${id}`
    },
    updateUserPassword(id: string) {
        return `${API}/users/dashboard/password/${id}`
    },
    updateArtisanProfile(id: string) {
        return `${API}/users/artisan/${id}`
    },
    updateUserProfile(id: string) {
        return `${API}/users/dashboard/profile/${id}`
    },
    getUserCertificates(id: string) {
        return `${API}/users/certificate/user/${id}`
    },
    getUserEducations(id: string) {
        return `${API}/users/education/user/${id}`
    },

    // states and cities
    nigerianStates: `${STATES_AND_CITIES_API}/nigerian-states`,
    getStateLgas(state: string) {
        return `${STATES_AND_CITIES_API}/nigerian-states`
    },

    artisan: API + "/users/artisan",
    services: API + "/users/ads",
    getArtisanServices(id: string) {
        return `${API}/users/myads/${id}`
    },
    getSingleArtisanService(id: string) {
        return `${API}/users/ads/${id}`
    },
    editArtisanService(id: string) {
        return `${API}/users/ads/edit/${id}`
    },
    myFavouriteServices: (id: string) => (`${API}/users/getsavead/${id}`),

    contactSupport: API + "/users/contact",
    reportService: API + "/users/reportad",
    rateService: API + "/users/rateads",
    userReviews: (userId: string) => (API + "/users/userreviews/" + userId),
    userReviewsCount: (userId: string) => (API + "/users/userreviewscount/" + userId),
    getServiceRatings: (id: string) => (`${API}/users/rateads/${id}`),
    checkFavourite: (user: string, service: string) => (`${API}/users/checksavead?userid=${user}&serviceid=${service}`),
    makeFavourite: (id = '') => (`${API}/users/savead${id ? '/' + id : ''}`),
    deleteFavourite: (userId: string, serviceId: string) => (`${API}/users/savead?userid=${userId}&serviceid=${serviceId}`),

    getChatHeads: (userId: string) => `${API}/users/chatheads/${userId}`,
    deleteChat: (chatId: string) => `${API}/users/chat/${chatId}`,
    updateLastSeen: (userId: string) => `${API}/users/lastseen/${userId}`,
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
     * GET - get all adverts.
     */
    getTransactions: `${admin}/transactions`,
    categories: ``
}

export default apis;