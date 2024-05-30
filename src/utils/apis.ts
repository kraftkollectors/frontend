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
    
}

export default apis;