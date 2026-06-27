import { useParams } from "react-router-dom"
import ApiProductDetail from "../components/products/detail/ApiProductDetail"
import { ProductDetailError, ProductDetailNotFound, ProductDetailSkeleton } from "../components/loaders/ProductDetailStates"
import { useProductDetail } from "../service/product/useAuth"



export default function ProductDetail() {

  const { productId } = useParams<{ productId: string }>()

  const productQuery = useProductDetail(productId)

  const product = productQuery?.data?.data


  if (productQuery.isLoading || productQuery?.isFetching && !product) {
    return <ProductDetailSkeleton />
  }


  if (productQuery?.isError) {
    return <ProductDetailError onRetry={() => productQuery?.refetch()} />
  }


  if (!product) {
    return <ProductDetailNotFound />
  }


  return <ApiProductDetail product={product} />

  
}
