const API = "https://backends-865y.onrender.com";
const STATES_AND_CITIES_API = 'https://nigeria-states-towns-lga.onrender.com/api'

const apis = {
    login: API + "/users/login",
    googleAuth: API + "/users/google/signup",
    register: API + "/users/register",
    registerVerifyEmail: API + "/users/verifyemail",
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
    getUser(id:string){
        return `${API}/users/dashboard/${id}`
    },
    getUserCertificates(id:string){
        return `${API}/users/certificate/${id}`
    },
    getUserEducations(id:string){
        return `${API}/users/education/${id}`
    },
    
    // states and cities
    nigerianStates: STATES_AND_CITIES_API + "/all",
    getStateLgas(state:string){
        return `${STATES_AND_CITIES_API}/state/${state}/lgas`
    },

    artisan: API + "/users/artisan"
}

export default apis;