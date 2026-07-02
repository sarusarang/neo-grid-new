import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./components/common/ProtectedRoute"
import { Toaster } from "sonner"
import ScrollToTop from "./components/common/ScrollToTop"
import PageLoader from "./components/loaders/PageLoader"


// lazy loaded routes
const Index = lazy(() => import("./page/Index"))
const Service = lazy(() => import("./page/Service"))
const Projects = lazy(() => import("./page/Projects"))
const Contact = lazy(() => import("./page/Contact"))
const Products = lazy(() => import("./page/Products"))
const ProductDetail = lazy(() => import("./page/ProductDetail"))
const Cart = lazy(() => import("./page/Cart"))
const MyAccount = lazy(() => import("./page/MyAccount"))
const NotFound = lazy(() => import("./page/NotFound"))
const StoreLocator = lazy(() => import("./page/StoreLocator"))
const PolicyPage = lazy(() => import("./page/PolicyPage"))


// layout
const MainLayout = lazy(() => import("./components/layout/MainLayout"))




function App() {

  return (


    <Suspense fallback={<PageLoader />}>

      <ScrollToTop />
      
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

          <Route path="/store-locator" element={<StoreLocator />} />
          <Route path="/privacy-policy" element={<PolicyPage slug="privacy-policy" />} />
          <Route path="/terms-and-conditions" element={<PolicyPage slug="terms-and-conditions" />} />
          <Route path="/return-and-refund-policy" element={<PolicyPage slug="return-and-refund-policy" />} />
          <Route path="/shipment-policy" element={<PolicyPage slug="shipment-policy" />} />
      
        </Route>

        {/* 404 catch-all */}
        <Route path="*" element={<NotFound />} />
      
      </Routes>

      <Toaster
        richColors
        position="bottom-right"
      />

    </Suspense>

  )

}

export default App
