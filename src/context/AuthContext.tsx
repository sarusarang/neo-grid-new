import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useLogin, useLogout, useCheckLogin, useRegister, useVerifyOtp, useResendOtp, useGoogleAuth, } from "../service/auth/useAuth"
import AuthModal from "../components/auth/AuthModal"

// user interface
export interface User {
  id: string | number
  name: string
  username: string
  email: string
  phone?: string
  avatar?: string
  provider?: "email" | "google"
  total_orders?: number
  address_count?: number
  cart_count?: number
  total_spend?: number
}

// Auth context value interface
interface AuthContextValue {
  user: User | null
  isLoading: boolean
  isLoginPending: boolean
  isRegisterPending: boolean
  isVerifyOtpPending: boolean
  isResendOtpPending: boolean
  isGoogleAuthPending: boolean
  isAuthModalOpen: boolean
  authModalTab: "login" | "register"
  openAuthModal: (tab?: "login" | "register") => void
  closeAuthModal: () => void
  login: (email: string, password: string) => Promise<{ error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>
  verifyOtp: (otp: string, email: string, name: string, pass: string) => Promise<{ error?: string }>
  resendOtp: (email: string) => Promise<{ error?: string }>
  loginWithGoogle: (token: string, email: string, name: string) => Promise<{ error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient()

  // Auth modal state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login")

  const openAuthModal = (tab: "login" | "register" = "login") => {
    setAuthModalTab(tab)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)

    // Clear ?auth= and ?redirect= from URL search params if present
    try {
      const url = new URL(window.location.href)
      if (url.searchParams.has("auth") || url.searchParams.has("redirect")) {
        const redirectPath = url.searchParams.get("redirect")
        url.searchParams.delete("auth")
        url.searchParams.delete("redirect")
        window.history.replaceState({}, "", url.pathname + url.search)
        if (redirectPath) {
          window.location.href = decodeURIComponent(redirectPath)
        }
      }
    } catch { /* ignore */ }
  }

  // Auto-open modal if URL query param ?auth=login or ?auth=register is present on initial load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const authVal = params.get("auth")
      if (authVal === "login" || authVal === "register") {
        setAuthModalTab(authVal)
        setIsAuthModalOpen(true)
      }
    } catch { /* ignore */ }
  }, [])

  // 1. Check Login Query
  const { data: authData, isLoading: isCheckLoading } = useCheckLogin()

  // 2. Mutations
  const loginMutation = useLogin()
  const logoutMutation = useLogout()
  const registerMutation = useRegister()
  const verifyOtpMutation = useVerifyOtp()
  const resendOtpMutation = useResendOtp()
  const googleAuthMutation = useGoogleAuth()

  // Sync logout across tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "logout") {
        queryClient.invalidateQueries({ queryKey: ["check-login"] })
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [queryClient])

  // Derive user object from API response
  const user: User | null = authData?.is_logged_in && authData?.user
    ? {
      ...authData.user,
      name: authData.user.username || authData.user.email.split("@")[0],
      provider: "email",
    }
    : null

  // Login handler
  const login = async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const formData = new FormData()
      formData.append("identifier", email)
      formData.append("password", password)

      await loginMutation.mutateAsync(formData)
      closeAuthModal()
      return {}
    } catch (err: any) {
      return { error: err?.message || "Login failed, please check your credentials." }
    }
  }

  // Register handler
  const register = async (name: string, email: string, password: string): Promise<{ error?: string }> => {
    try {
      const formData = new FormData()
      formData.append("identifier", email)
      formData.append("username", name)
      formData.append("password", password)

      await registerMutation.mutateAsync(formData)
      return {}
    } catch (err: any) {
      return { error: err?.message || "Registration failed. Email or username might be already taken." }
    }
  }

  // Verify OTP handler
  const verifyOtp = async (otp: string, email: string, name: string, pass: string): Promise<{ error?: string }> => {
    try {
      const formData = new FormData()
      formData.append("identifier", email)
      formData.append("otp", otp)
      formData.append("username", name)
      formData.append("password", pass)

      await verifyOtpMutation.mutateAsync(formData)
      closeAuthModal()
      return {}
    } catch (err: any) {
      return { error: err?.message || "OTP verification failed. Please try again." }
    }
  }

  // Resend OTP handler
  const resendOtp = async (email: string): Promise<{ error?: string }> => {
    try {
      const formData = new FormData()
      formData.append("identifier", email)

      await resendOtpMutation.mutateAsync(formData)
      return {}
    } catch (err: any) {
      return { error: err?.message || "Failed to resend OTP." }
    }
  }

  // Google Login handler
  const loginWithGoogle = async (token: string, email: string, name: string): Promise<{ error?: string }> => {
    try {
      const formData = new FormData()
      formData.append("token", token)
      formData.append("email", email)
      formData.append("name", name)

      await googleAuthMutation.mutateAsync(formData)
      closeAuthModal()
      return {}
    } catch (err: any) {
      return { error: err?.message || "Google Authentication failed." }
    }
  }

  // Logout handler
  const logout = () => {
    logoutMutation.mutate()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: isCheckLoading,
        isLoginPending: loginMutation.isPending,
        isRegisterPending: registerMutation.isPending,
        isVerifyOtpPending: verifyOtpMutation.isPending,
        isResendOtpPending: resendOtpMutation.isPending,
        isGoogleAuthPending: googleAuthMutation.isPending,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        verifyOtp,
        resendOtp,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        defaultTab={authModalTab}
      />
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
