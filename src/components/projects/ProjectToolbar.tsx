import { Search, X } from "lucide-react"
import { motion } from "framer-motion"

interface ProjectCategory {
  count: number
  name: string
}

interface ProjectToolbarProps {
  activeTab: "projects" | "gallery"
  categories: ProjectCategory[]
  isFetching: boolean
  onCategoryChange: (category: string) => void
  onSearchChange: (value: string) => void
  onTabChange: (tab: "projects" | "gallery") => void
  searchQuery: string
  selectedCategory: string
}

export default function ProjectToolbar({
  activeTab,
  categories,
  isFetching,
  onCategoryChange,
  onSearchChange,
  onTabChange,
  searchQuery,
  selectedCategory,
}: ProjectToolbarProps) {
  const tabs = [
    { id: "projects" as const, label: "Projects" },
    { id: "gallery" as const, label: "Photo Gallery" },
  ]
  const showCategories = activeTab === "projects" && categories.length > 0

  return (
    <div className="mb-10 flex flex-col gap-10 sm:mb-12 sm:gap-12">
      <div className="mx-auto grid w-full max-w-[460px] grid-cols-2 gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`relative min-h-11 rounded-full px-4 text-xs font-black uppercase tracking-wider transition-colors sm:min-h-14 sm:text-sm ${
              activeTab === tab.id ? "text-[#011a1e]" : "text-gray-300 hover:text-white"
            }`}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="projectActiveTab"
                className="absolute inset-0 rounded-full bg-[#fcc42c]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {showCategories ? (
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide lg:mx-0 lg:flex-wrap lg:px-0 lg:pb-0">
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                onClick={() => onCategoryChange(category.name)}
                className={`inline-flex h-12 shrink-0 items-center gap-2 rounded-full px-6 text-xs font-black uppercase tracking-wider transition-all sm:text-sm ${
                  selectedCategory === category.name
                    ? "bg-[#fcc42c] text-[#011a1e] shadow-lg shadow-[#fcc42c]/20"
                    : "border border-white/10 bg-white/5 text-gray-200 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                {category.name}
                <span
                  className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] ${
                    selectedCategory === category.name
                      ? "bg-[#011a1e]/10 text-[#011a1e]"
                      : "bg-white/10 text-gray-400"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <div />
        )}

        <div className="relative w-full lg:max-w-[405px]">
          <input
            type="text"
            placeholder={activeTab === "projects" ? "Search projects, location..." : "Search gallery..."}
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-14 w-full rounded-full border border-white/10 bg-white/5 px-5 pl-12 pr-12 text-sm text-white transition-all placeholder:text-gray-400 focus:border-[#fcc42c] focus:bg-white/10 focus:outline-none sm:h-16 sm:text-base"
          />
          <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          {searchQuery && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          {isFetching && (
            <span className="absolute -bottom-5 left-5 text-[10px] font-bold uppercase tracking-wider text-[#fcc42c]">
              Updating
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
