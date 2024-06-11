const API = "https://backends-865y.onrender.com";
const STATES_AND_CITIES_API = 'https://abundiko-api.vercel.app/api';

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
    editCertificate(id:string){
        return `${API}/users/certificate/${id}`
    },
    editEducation(id:string){
        return `${API}/users/education/${id}`
    },
    getArtisan(id:string){
        return `${API}/users/artisan/${id}`
    },
    getUser(id:string){
        return `${API}/users/dashboard/${id}`
    },
    updateUserPassword(id:string){
        return `${API}/users/dashboard/password/${id}`
    },
    updateArtisanProfile(id:string){
        return `${API}/users/artisan/${id}`
    },
    updateUserProfile(id:string){
        return `${API}/users/dashboard/profile/${id}`
    },
    getUserCertificates(id:string){
        return `${API}/users/certificate/user/${id}`
    },
    getUserEducations(id:string){
        return `${API}/users/education/user/${id}`
    },
    
    // states and cities
    nigerianStates: `${STATES_AND_CITIES_API}/nigerian-states`,
    getStateLgas(state:string){
        return `${STATES_AND_CITIES_API}/nigerian-states`
    },

    artisan: API + "/users/artisan",
    services: API + "/users/ads",
    getArtisanServices(id:string){
        return `${API}/users/myads/${id}`
    },
    getSingleArtisanService(id:string){
        return `${API}/users/ads/${id}`
    },
    editArtisanService(id:string){
        return `${API}/users/ads/edit/${id}`
    },
    myFavouriteServices: (id:string) => (`${API}/users/getsavead/${id}`),

    contactSupport: API + "/users/contact",
    reportService: API + "/users/reportad",
    rateService: API + "/users/rateads",
    getServiceRatings: (id:string) => (`${API}/users/rateads/${id}`),
    checkFavourite: (user: string, service: string) => (`${API}/users/checksavead?userid=${user}&serviceid=${service}`),
    toggleFavourite: (id = '') => (`${API}/users/savead${id ? '/'+id : ''}`),
}

export default apis;