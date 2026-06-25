import { Sun, Battery, Cpu, Layers, Package } from "lucide-react"
import type { Product } from "../../../service/product/types"

export function getCategoryIcon(name: string) {
  const lc = name.toLowerCase()
  if (lc.includes("solar") || lc.includes("panel")) return <Sun className="w-4 h-4" />
  if (lc.includes("battery") || lc.includes("storage")) return <Battery className="w-4 h-4" />
  if (lc.includes("inverter") || lc.includes("ups") || lc.includes("lithium") || lc.includes("home"))
    return <Cpu className="w-4 h-4" />
  if (lc.includes("meter")) return <Layers className="w-4 h-4" />
  return <Package className="w-4 h-4" />
}

export function getProductImage(product: Product): string {
  return product.images?.[0]?.image || ""
}
