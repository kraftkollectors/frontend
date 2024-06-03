const API = "https://backends-865y.onrender.com";
const STATES_AND_CITIES_API = 'http://localhost:3000/api'

const apis = {
    login: API + "/users/login",
    googleAuth: API + "/users/google/signup",
    register: API + "/users/register",
    registerVerifyEmail: API + "/users/verifyemail",
    resendVerificationCode: API + "/users/otpagain",
    forgotPasswordSendEmail: API + "/users/forgot",
    forgotPasswordReset: API + "/users/reset",

    uploadSingleFile: API + "/geturl",
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

    artisan: API + "/users/artisan"
}

export default apis;