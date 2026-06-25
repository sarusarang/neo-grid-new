import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock, ArrowRight } from "lucide-react"
import { useAuth } from "../../context/AuthContext"
import { otpSchema, type OtpInput } from "./schemas/authSchemas"
import FormInputField from "./FormInputField"


// 
interface OtpVerificationFormProps {
  email: string
  name: string
  password: string
  onSuccess: () => void
}



export default function OtpVerificationForm({ email, name, password, onSuccess, }: OtpVerificationFormProps) {


  const { verifyOtp, resendOtp, isVerifyOtpPending, isResendOtpPending } = useAuth()
  const [cooldown, setCooldown] = useState(60)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
  })


  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])



  // Handle form submission.
  const onSubmit = async (data: OtpInput) => {
    const { error } = await verifyOtp(data.otp, email, name, password)
    if (!error) {
      onSuccess()
    }
  }

  
  // Resend OTP functionality
  const handleResend = async () => {
    if (cooldown > 0) return
    const { error } = await resendOtp(email)
    if (!error) {
      setCooldown(60)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left" noValidate>
      <div className="text-center mb-1">
        <p className="text-sm text-gray-300">
          We have sent a verification code to <br />
          <strong className="text-white">{email}</strong>
        </p>
      </div>

      <FormInputField
        id="otp-code"
        label="Enter OTP Verification Code"
        type="text"
        placeholder="e.g. 123456"
        icon={Lock}
        error={errors.otp?.message}
        registerProps={register("otp")}
      />

      <button
        type="submit"
        disabled={isVerifyOtpPending}
        className="w-full py-3 rounded-xl font-bold text-sm bg-[#fcc42c] text-[#011a1e] hover:brightness-110 transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
      >
        {isVerifyOtpPending ? (
          <span className="w-4 h-4 border-2 border-[#011a1e]/30 border-t-[#011a1e] rounded-full animate-spin" />
        ) : (
          <>
            Verify OTP & Complete Registration <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="text-center text-xs">
        <span className="text-gray-400">Didn't receive the code? </span>
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0 || isResendOtpPending}
          className={`font-bold transition-all cursor-pointer ${cooldown > 0 || isResendOtpPending
              ? "text-gray-600 cursor-not-allowed"
              : "text-[#fcc42c] hover:underline"
            }`}
        >
          {isResendOtpPending ? (
            "Resending..."
          ) : cooldown > 0 ? (
            `Resend OTP in ${cooldown}s`
          ) : (
            "Resend OTP"
          )}
        </button>
      </div>
    </form>
  )
}
