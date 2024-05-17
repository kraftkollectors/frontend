const API = "https://backend-1-xex5.onrender.com";
const apis = {
    login: API + "/auth/app/login/",
    register: API + "/auth/app/register/",
    registerToken: API + "/auth/app/verify/email/",
    forgotPasswordSendEmail: API + "/auth/app/user/reset/password/",

    user: API + '/auth/app/user/',
}

export default apis;