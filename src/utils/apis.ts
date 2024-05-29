const API = "https://backends-865y.onrender.com";
const apis = {
    login: API + "/users/login",
    googleAuth: API + "/users/google/signup",
    register: API + "/users/register",
    registerVerifyEmail: API + "/users/verifyemail",
    forgotPasswordSendEmail: API + "/users/forgot",
    forgotPasswordReset: API + "/users/reset",

    uploadSingleFile: API + "/geturl",
    uploadCertificate: API + "/users/certificate",

    getUser(id:string){
        return `${API}/users/dashboard/${id}`
    },
    getUserCertificates(id:string){
        return `${API}/users/certificate/${id}`
    },
    
}

export default apis;