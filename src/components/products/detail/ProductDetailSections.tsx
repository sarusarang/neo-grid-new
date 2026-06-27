import { useMemo, useState } from "react"
import { BadgeInfo, FileText, ShieldCheck, Wrench } from "lucide-react"
import type { Product } from "../../../service/product/types"


// Props interface for ProductHtmlSection component
interface ProductHtmlSectionProps {
  title: string
  html?: string
  fallback: string
}


// ProductHtmlSection component for displaying product information
function ProductHtmlSection({ title, html, fallback }: ProductHtmlSectionProps) {
  return (
    <section className="rounded-lg border border-white/10 bg-white/5 p-4 sm:p-5">
      <h2 className="mb-3 text-base font-black text-white sm:mb-4 sm:text-lg">{title}</h2>
      {html ? (
        <div
          className="text-sm leading-7 text-gray-300 [&_h1]:mb-3 [&_h1]:text-xl [&_h1]:font-black [&_h1]:text-white [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-black [&_h2]:text-white [&_h3]:mb-2 [&_h3]:font-black [&_h3]:text-white [&_h4]:mb-2 [&_h4]:font-black [&_h4]:text-white [&_h5]:mb-2 [&_h5]:font-black [&_h5]:text-white [&_li]:mb-2 [&_p]:mb-3 [&_strong]:text-white [&_ul]:ml-5 [&_ul]:list-disc"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="text-sm leading-7 text-gray-400">{fallback}</p>
      )}
    </section>
  )
}


// Product tab id enum
type ProductTabId = "description" | "additional" | "technical" | "warranty"


// Props interface for ProductDetailSections component
interface ProductDetailSectionsProps {
  product: Product
}


// ProductDetailSections component for displaying product information
export default function ProductDetailSections({ product }: ProductDetailSectionsProps) {


  // Product tabs
  const tabs = useMemo(() => [
    {
      id: "description" as ProductTabId,
      label: "Description",
      icon: <FileText className="h-4 w-4" />,
      html: product.description,
      fallback: "Description will be updated soon.",
    },
    {
      id: "additional" as ProductTabId,
      label: "Additional Info",
      icon: <BadgeInfo className="h-4 w-4" />,
      html: product.additional_info,
      fallback: "Additional product information will be updated soon.",
    },
    {
      id: "technical" as ProductTabId,
      label: "Technical Specs",
      icon: <Wrench className="h-4 w-4" />,
      html: product.technical_spec,
      fallback: "Technical specifications will be updated soon.",
    },
    {
      id: "warranty" as ProductTabId,
      label: "Warranty",
      icon: <ShieldCheck className="h-4 w-4" />,
      html: product.warrenty_info,
      fallback: "Warranty information will be updated soon.",
    },
  ], [product])


  // Active tab state
  const [activeTab, setActiveTab] = useState<ProductTabId>(tabs[0]?.id ?? "description")

  // Selected tab
  const selectedTab = tabs?.find(tab => tab?.id === activeTab) ?? tabs[0]


  if (!selectedTab) return null



  return (

    <section className="mt-8 sm:mt-12">

      <div className="mb-4 flex gap-2 overflow-x-auto border-b border-white/10 pb-2 scrollbar-hide sm:mb-5">

        {tabs?.map(tab => {

          const isActive = tab?.id === selectedTab?.id

          return (

            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-[10px] font-black uppercase tracking-wider transition-colors sm:px-4 sm:py-3 sm:text-xs ${isActive
                ? "bg-[#fcc42c] text-[#011a1e]"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              {tab?.icon}
              {tab?.label}

            </button>
          )
        })}

      </div>

      <ProductHtmlSection title={selectedTab?.label} html={selectedTab?.html} fallback={selectedTab?.fallback} />

    </section>

  )

}
