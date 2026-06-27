import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import type { Product } from "../../../service/product/types"
import ProductSlider from "../ProductSlider"
import ProductDetailGallery from "./ProductDetailGallery"
import ProductDetailSections from "./ProductDetailSections"
import ProductDetailSummary from "./ProductDetailSummary"


// Props interface for ApiProductDetail component
interface ApiProductDetailProps {
  product: Product
}


export default function ApiProductDetail({ product }: ApiProductDetailProps) {


  // Get product department name from nested structure
  const department = product?.family?.department?.name


  return (


    <div className="min-h-screen bg-[#011a1e] pt-20 pb-10 text-white sm:pt-20 sm:pb-16">

      <div className="container mx-auto px-3 sm:px-4 lg:px-8">

        <div className="mb-4 flex flex-wrap items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 sm:mb-6 sm:gap-2 sm:text-xs">

          <Link to="/" className="hover:text-white">Home</Link>

          <ChevronRight className="h-3.5 w-3.5" />

          <Link to="/products" className="hover:text-white">Products</Link>

          {department && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                to={`/products?department=${encodeURIComponent(department)}`}
                className="hover:text-white"
              >
                {department}
              </Link>
            </>
          )}

          <ChevronRight className="h-3.5 w-3.5 text-gray-700" />

          <span className="max-w-full truncate text-[#fcc42c]">{product?.name}</span>

        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">

          <div className="lg:sticky lg:top-24 lg:col-span-6">
            <ProductDetailGallery product={product} />
          </div>

          <div className="lg:col-span-6">
            <ProductDetailSummary product={product} />
          </div>

        </div>

        <ProductDetailSections product={product} />

      </div>

      <ProductSlider
        title="More Power"
        accentTitle="Solutions"
        subtitle="Browse more products from the NeoGrid catalog selected for dependable backup, clean output, and daily performance."
        excludeProductId={product?.id}
        className="pb-0 pt-10 sm:pt-14"
      />
    </div>
  )
}
