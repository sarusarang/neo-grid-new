import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import OtpVerificationForm from "./OtpVerificationForm"


// AuthModal component is a modal that is used to display the login and register forms.
interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: "login" | "register"
}




export default function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {


  const [tab, setTab] = useState<"login" | "register" | "verify-otp">(defaultTab)


  // Registration data cached temporarily for OTP submit
  const [regCache, setRegCache] = useState<{ email: string; name: string; pass: string } | null>(null)



  // Use effect to set the tab and regCache when the modal is opened.
  useEffect(() => {
    setTab(defaultTab)
    setRegCache(null)
  }, [defaultTab, isOpen])




  // Use effect to close the modal when the escape key is pressed.
  useEffect(() => {

    if (!isOpen) return

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handler)

    return () => document.removeEventListener("keydown", handler)

  }, [isOpen, onClose])



  useEffect(() => {

    document.body.style.overflow = isOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }

  }, [isOpen])



  // Handle registration success by setting the regCache and switching to the OTP verification tab.
  const handleRegistrationSuccess = (email: string, name: string, pass: string) => {
    setRegCache({ email, name, pass })
    setTab("verify-otp")
  }



  return (

    <AnimatePresence>

      {isOpen && (

        <>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-100 bg-black/75 backdrop-blur-sm"
          />

          {/* Scrollable container */}
          <div className="fixed inset-0 z-101 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md my-auto"
            >
              <div
                className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                style={{ background: "linear-gradient(145deg, #012229 0%, #011a1e 60%, #010e11 100%)" }}
              >
                {/* Glows */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#fcc42c]/8 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#04444c]/20 rounded-full blur-3xl pointer-events-none" />

                {/* Modal header */}
                <div className="relative flex items-center justify-between px-5 pt-5 pb-3">
                  <div className="flex items-center gap-2">
                    <img src="/neo grid logo-01.png" alt="NeoGrid" className="h-6 object-contain" />
                    <span className="text-[11px] text-gray-500">
                      {tab === "login"
                        ? "Welcome back"
                        : tab === "register"
                          ? "Create account"
                          : "Verify your email"}
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Tabs */}
                {tab !== "verify-otp" && (
                  <div className="relative px-5 pb-3">
                    <div className="flex gap-1 bg-white/5 rounded-xl p-1">
                      {(["login", "register"] as const).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTab(t)}
                          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-200 cursor-pointer ${tab === t ? "bg-[#fcc42c] text-[#011a1e] shadow-sm" : "text-gray-400 hover:text-white"
                            }`}
                        >
                          {t === "login" ? "Sign In" : "Register"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Form body */}
                <div className="relative px-5 pb-5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, x: tab === "login" ? -12 : 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: tab === "login" ? 12 : -12 }}
                      transition={{ duration: 0.18 }}
                    >
                      {tab === "login" ? (
                        <LoginForm
                          onSuccess={onClose}
                          onSwitchTab={() => setTab("register")}
                          onPolicyNavigate={onClose}
                        />
                      ) : tab === "register" ? (
                        <RegisterForm
                          onRegistrationSuccess={handleRegistrationSuccess}
                          onSuccess={onClose}
                          onSwitchTab={() => setTab("login")}
                          onPolicyNavigate={onClose}
                        />
                      ) : (
                        regCache && (
                          <OtpVerificationForm
                            email={regCache.email}
                            name={regCache.name}
                            password={regCache.pass}
                            onSuccess={onClose}
                          />
                        )
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
