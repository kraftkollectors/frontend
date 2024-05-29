const API = "https://backends-865y.onrender.com";
const apis = {
    login: API + "/users/login",
    register: API + "/users/register",
    registerVerifyEmail: API + "/users/verifyemail",
    forgotPasswordSendEmail: API + "/users/forgot",

    getUser(id:string){
        return `${API}/users/dashboard/${id}`
    },
    
}

export default apis;