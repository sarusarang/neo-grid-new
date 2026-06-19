import { Suspense, lazy } from "react"
import { Route, Routes } from "react-router-dom"



// lazy loaded routes
const Index = lazy(() => import("./page/Index"))
const Service = lazy(() => import("./page/Service"))
const Projects = lazy(() => import("./page/Projects"))
const Contact = lazy(() => import("./page/Contact"))
const Products = lazy(() => import("./page/Products"))
const ProductDetail = lazy(() => import("./page/ProductDetail"))

const MainLayout = lazy(() => import("./components/layout/MainLayout"))

function App() {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Index />} />
          <Route path="/service" element={<Service />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Suspense>
  );
}


export default App
