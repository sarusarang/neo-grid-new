import { UserLoginApi, UserRegisterApi, CheckLoginStatusApi, ResendOtpApi, VerifyOtpApi, UserLogoutApi, GoogleAuthApi } from "@/service/auth/authApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AuthResponse } from "./type";
import { toast } from "sonner";





// user login
export const useLogin = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (data: FormData) => {
            return await UserLoginApi(data);
        },

        onSuccess: (data) => {
            toast.success(data?.message || "Login successful!");
            queryClient.invalidateQueries({ queryKey: ["check-login"] });
        },

        onError: (error: any) => {
            toast.error(error?.message || "Login failed, please try again.");
        }

    });

}




// user logout
export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            return await UserLogoutApi();
        },
        onSuccess: (data) => {
            toast.success(data?.message || "Logged out successfully!");
            queryClient.setQueryData(["check-login"], null);
            queryClient.invalidateQueries({ queryKey: ["check-login"] });
            localStorage.setItem("logout", Date.now().toString());
        },
        onError: (error: any) => {
            toast.error(error?.message || "Logout failed, please try again.");
        }
    });
}




// check login status
export const useCheckLogin = () => {

    return useQuery<AuthResponse>({

        queryKey: ["check-login"],

        queryFn: async () => {

            return await CheckLoginStatusApi() as AuthResponse;

        },

        retry: false, // Do not retry on 401
        staleTime: 5 * 60 * 1000, // 5 minutes

    });

}




// user register
export const useRegister = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {
            return await UserRegisterApi(data);
        },

        onSuccess: (data) => {
            toast.success(data?.message || "OTP sent successfully!");
        },

        onError: (error: any) => {
            toast.error(error?.message || "Registration failed, please try again.");
        }

    });

}



// resend otp
export const useResendOtp = () => {

    return useMutation({

        mutationFn: async (data: FormData) => {
            return await ResendOtpApi(data);
        },

        onSuccess: (data) => {
            toast.success(data?.message || "OTP resent successfully!");
        },

        onError: (error: any) => {
            toast.error(error?.message || "Failed to resend OTP.");
        }

    });

}



// verify otp
export const useVerifyOtp = () => {

    const queryClient = useQueryClient();


    return useMutation({

        mutationFn: async (data: FormData) => {
            return await VerifyOtpApi(data);
        },

        onSuccess: (data) => {
            toast.success(data?.message || "Registration complete!");
            queryClient.invalidateQueries({ queryKey: ["check-login"] });
        },

        onError: (error: any) => {
            toast.error(error?.message || "OTP verification failed.");
        }

    });

}



// google auth
export const useGoogleAuth = () => {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: async (data: FormData) => {
            return await GoogleAuthApi(data);
        },

        onSuccess: (data) => {
            toast.success(data?.message || "Google Login successful!");
            queryClient.invalidateQueries({ queryKey: ["check-login"] });
        },

        onError: (error: any) => {
            toast.error(error?.message || "Google Login failed, please try again.");
        }

    });

}
