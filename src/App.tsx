import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { AuthProvider } from "./context/AuthContext"
import { CartProvider } from "./context/CartContext"
import ProtectedRoute from "./components/common/ProtectedRoute"
import { Toaster } from "sonner"


// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// lazy loaded routes
const Index = lazy(() => import("./page/Index"))
const Service = lazy(() => import("./page/Service"))
const Projects = lazy(() => import("./page/Projects"))
const Contact = lazy(() => import("./page/Contact"))
const Products = lazy(() => import("./page/Products"))
const ProductDetail = lazy(() => import("./page/ProductDetail"))
const Cart = lazy(() => import("./page/Cart"))
const MyAccount = lazy(() => import("./page/MyAccount"))

const MainLayout = lazy(() => import("./components/layout/MainLayout"))

function App() {
  return (
    <GoogleOAuthProvider clientId="960109017160-cq8bfuipogu6ubk3mc5pjkhaql0jiuu5.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={
              <div className="min-h-screen bg-[#011a1e] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 border-2 border-white/10 border-t-[#fcc42c] rounded-full animate-spin" />
                  <p className="text-gray-400 text-sm">Loading NeoGrid...</p>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Index />} />
                  <Route path="/service" element={<Service />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:productId" element={<ProductDetail />} />
                  <Route path="/cart" element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  } />
                  <Route path="/my-account" element={
                    <ProtectedRoute>
                      <MyAccount />
                    </ProtectedRoute>
                  } />
                  <Route path="/my-account/:tab" element={
                    <ProtectedRoute>
                      <MyAccount />
                    </ProtectedRoute>
                  } />
                </Route>
              </Routes>

              <Toaster
                richColors
                position="bottom-right"
              />

            </Suspense>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  )
}

export default App

