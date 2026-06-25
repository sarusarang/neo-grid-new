import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"


// Protected route props
interface ProtectedRouteProps {
  children: React.ReactNode
}


export default function ProtectedRoute({ children }: ProtectedRouteProps) {


  const { user, isLoading } = useAuth()
  const location = useLocation()


  // Loading state while checking authentication
  if (isLoading) {

    return (

      <div className="min-h-screen bg-[#011a1e] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/10 border-t-[#fcc42c] rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Verifying session...</p>
        </div>
      </div>

    )

  }

  if (!user) {
    // Redirect to home and trigger auth modal open with current path saved for redirect back
    const redirectUrl = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`/?auth=login&redirect=${redirectUrl}`} replace />
  }

  return <>{children}</>

}
