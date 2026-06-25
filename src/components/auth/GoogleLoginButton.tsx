import { useState } from "react"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"
import { useAuth } from "../../context/AuthContext"
import GoogleIcon from "./GoogleIcon"


interface GoogleLoginButtonProps {
  onSuccess: () => void
}

export default function GoogleLoginButton({ onSuccess }: GoogleLoginButtonProps) {


  const { loginWithGoogle, isGoogleAuthPending } = useAuth()
  const [isFetchingProfile, setIsFetchingProfile] = useState(false)


  // Configure Google Login hook from @react-oauth/google
  const login = useGoogleLogin({

    onSuccess: async (tokenResponse) => {

      setIsFetchingProfile(true)

      try {

        // Fetch user profile info from Google API using the access token
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        })

        const { email, name } = res.data
        const token = tokenResponse.access_token

        // Call our authentication provider loginWithGoogle
        const { error } = await loginWithGoogle(token, email, name)
        if (!error) {
          onSuccess()
        }

      } catch (err) {

        console.error("Failed to fetch Google user profile information", err)

      } finally {

        setIsFetchingProfile(false)
      }
    },

    onError: (error) => {

      console.error("Google Login failed:", error)

    },

  })


  const isPending = isGoogleAuthPending || isFetchingProfile


  return (

    <button
      type="button"
      onClick={() => login()}
      disabled={isPending}
      className="w-full py-2.5 rounded-xl font-semibold text-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2.5 text-white disabled:opacity-60 cursor-pointer"
    >

      {isPending ? (

        <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />

      ) : (

        <>
          <GoogleIcon /> Continue with Google
        </>

      )}

    </button>

  )

}
