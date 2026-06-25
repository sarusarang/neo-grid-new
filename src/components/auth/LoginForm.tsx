import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { loginSchema, type LoginInput } from "./schemas/authSchemas"
import FormInputField from "./FormInputField"
import GoogleLoginButton from "./GoogleLoginButton"


// Interface for login form props
interface LoginFormProps {
  onSuccess: () => void
  onSwitchTab: () => void
}


export default function LoginForm({ onSuccess, onSwitchTab }: LoginFormProps) {


  // Auth context for login
  const { login, isLoginPending } = useAuth()
  const [showPw, setShowPw] = useState(false)


  // Validation schema
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })


  // Handle form submission
  const onSubmit = async (data: LoginInput) => {
    const { error } = await login(data.email, data.password)
    if (!error) {
      onSuccess()
    }
  }


  return (

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3" noValidate>

      <FormInputField
        id="login-email"
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        error={errors.email?.message}
        registerProps={register("email")}
      />

      <FormInputField
        id="login-password"
        label="Password"
        type={showPw ? "text" : "password"}
        placeholder="Your password"
        icon={Lock}
        error={errors.password?.message}
        registerProps={register("password")}
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
          >
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        }
      />


      <div className="flex justify-end -mt-1">
        <button type="button" className="text-xs text-[#fcc42c] hover:underline cursor-pointer">
          Forgot password?
        </button>
      </div>


      <button
        type="submit"
        disabled={isLoginPending}
        className="w-full py-3 rounded-xl font-bold text-sm bg-[#fcc42c] text-[#011a1e] hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
      >
        {isLoginPending ? (
          <span className="w-4 h-4 border-2 border-[#011a1e]/30 border-t-[#011a1e] rounded-full animate-spin" />
        ) : (
          <>
            Sign In <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>


      <div className="flex items-center gap-2 my-0.5">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-[11px] text-gray-500 font-medium">OR</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>


      {/* Reusable Google Login Component */}
      <GoogleLoginButton onSuccess={onSuccess} />


      <p className="text-center text-xs text-gray-400">
        No account?{" "}
        <button
          type="button"
          onClick={onSwitchTab}
          className="text-[#fcc42c] font-bold hover:underline cursor-pointer"
        >
          Sign up free
        </button>
      </p>
    </form>
  )
}
