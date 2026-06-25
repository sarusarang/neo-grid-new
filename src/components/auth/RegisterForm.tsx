import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2, ArrowRight } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { registerSchema, type RegisterInput } from "./schemas/authSchemas"
import FormInputField from "./FormInputField"
import GoogleLoginButton from "./GoogleLoginButton"

// Register form props
interface RegisterFormProps {
  onRegistrationSuccess: (email: string, name: string, pass: string) => void
  onSuccess: () => void
  onSwitchTab: () => void
}

export default function RegisterForm({ onRegistrationSuccess, onSuccess, onSwitchTab }: RegisterFormProps) {
  // Auth context for register
  const { register: performRegister, isRegisterPending } = useAuth()
  const [showPw, setShowPw] = useState(false)

  // Form handling and validation
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      agreed: undefined,
    },
  })

  const agreed = watch("agreed")

  // Handle form submission
  const onSubmit = async (data: RegisterInput) => {
    const { error } = await performRegister(data.name, data.email, data.password)
    if (!error) {
      onRegistrationSuccess(data.email, data.name, data.password)
    }
  }

  const eyeSlot = (
    <button
      type="button"
      onClick={() => setShowPw((v) => !v)}
      className="text-gray-500 hover:text-white transition-colors cursor-pointer"
    >
      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5" noValidate>
      <FormInputField
        id="reg-name"
        label="Username / Full Name"
        type="text"
        placeholder="Your name"
        icon={User}
        error={errors.name?.message}
        registerProps={register("name")}
        compact
      />

      <FormInputField
        id="reg-email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        error={errors.email?.message}
        registerProps={register("email")}
        compact
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <FormInputField
          id="reg-password"
          label="Password"
          type={showPw ? "text" : "password"}
          placeholder="Min. 6 chars"
          icon={Lock}
          error={errors.password?.message}
          registerProps={register("password")}
          rightSlot={eyeSlot}
          compact
        />

        <FormInputField
          id="reg-confirm"
          label="Confirm"
          type={showPw ? "text" : "password"}
          placeholder="Re-enter"
          icon={Lock}
          error={errors.confirmPw?.message}
          registerProps={register("confirmPw")}
          compact
        />
      </div>

      {/* Terms */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <input
          type="checkbox"
          className="hidden"
          {...register("agreed")}
          checked={!!agreed}
          onChange={(e) => setValue("agreed", e.target.checked, { shouldValidate: true })}
        />
        <div
          className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
            agreed ? "bg-[#fcc42c] border-[#fcc42c]" : "border-white/20 hover:border-white/40"
          }`}
        >
          {agreed && <CheckCircle2 className="w-2.5 h-2.5 text-[#011a1e]" />}
        </div>
        <span className="text-xs text-gray-400 leading-snug">
          I agree to the <span className="text-[#fcc42c]">Terms</span> &amp;{" "}
          <span className="text-[#fcc42c]">Privacy Policy</span>
        </span>
      </label>
      {errors.agreed && (
        <p className="text-[11px] text-red-400 text-left -mt-1">{errors.agreed.message}</p>
      )}

      <button
        type="submit"
        disabled={isRegisterPending}
        className="w-full py-3 rounded-xl font-bold text-sm bg-[#fcc42c] text-[#011a1e] hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
      >
        {isRegisterPending ? (
          <span className="w-4 h-4 border-2 border-[#011a1e]/30 border-t-[#011a1e] rounded-full animate-spin" />
        ) : (
          <>
            Create Account <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-[11px] text-gray-500 font-medium">OR</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Reusable Google Login Component */}
      <GoogleLoginButton onSuccess={onSuccess} />

      <p className="text-center text-xs text-gray-400">
        Have an account?{" "}
        <button
          type="button"
          onClick={onSwitchTab}
          className="text-[#fcc42c] font-bold hover:underline cursor-pointer"
        >
          Sign in
        </button>
      </p>
    </form>
  )
}
