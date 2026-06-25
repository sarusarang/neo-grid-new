import { z } from "zod"

// Validation Schemas for Login
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export type LoginInput = z.infer<typeof loginSchema>

// Validation Schemas for Register
export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPw: z.string().min(1, "Please confirm your password"),
    agreed: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms & Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPw, {
    message: "Passwords do not match",
    path: ["confirmPw"],
  })

export type RegisterInput = z.infer<typeof registerSchema>

// Validation Schemas for OTP Verification
export const otpSchema = z.object({
  otp: z.string().min(4, "OTP must be at least 4 digits").max(8, "OTP is too long"),
})

export type OtpInput = z.infer<typeof otpSchema>
