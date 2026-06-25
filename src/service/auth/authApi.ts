import { CommonApi } from "@/lib/CommonApi";


// User Login
export const UserLoginApi = async (data: FormData) => {

    return await CommonApi("POST", `/auth/login/`, data);

}


// User Logout
export const UserLogoutApi = async () => {

    return await CommonApi("POST", `/auth/logout/`);

}



// refresh token
export const RefreshTokenApi = async () => {

    return await CommonApi("POST", `/auth/token/refresh/`);

}



// check login status
export const CheckLoginStatusApi = async () => {

    return await CommonApi("GET", `/auth/check-login/`);

}



// user register
export const UserRegisterApi = async (data: FormData) => {

    return await CommonApi("POST", `/auth/register/`, data);

}



// resend otp
export const ResendOtpApi = async (data: FormData) => {

    return await CommonApi("POST", `/auth/resend-otp/`, data);

}



// verify otp
export const VerifyOtpApi = async (data: FormData) => {

    return await CommonApi("POST", `/auth/verify-otp/`, data);

}



// google auth
export const GoogleAuthApi = async (data: FormData) => {

    return await CommonApi("POST", `/auth/google-auth/`, data);

}
