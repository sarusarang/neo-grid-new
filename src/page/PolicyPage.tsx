import { useMemo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, CalendarDays, FileText, ShieldCheck } from "lucide-react"
import {
  POLICY_LINKS,
  getPolicyDocument,
  type PolicyItem,
  type PolicySlug,
} from "../data/policies"

type PolicyPageProps = {
  slug: PolicySlug
}

type PolicyBlock =
  | { kind: "heading"; id: string; level: 2 | 3 | 4; text: string }
  | { kind: "paragraph"; text: string; isDivider?: boolean }
  | { kind: "list"; items: string[] }
  | { kind: "table"; rows: readonly (readonly string[])[] }

const numberedHeadingPattern = /^\d+\.\s+/

function createId(text: string, index: number, counts: Map<string, number>) {
  const base =
    text
      .toLowerCase()
      .replace(/["']/g, "")
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `section-${index + 1}`

  const count = counts.get(base) ?? 0
  counts.set(base, count + 1)

  return count === 0 ? base : `${base}-${count + 1}`
}

function isHeading(item: PolicyItem) {
  return (
    item.type === "paragraph" &&
    (item.style === "Heading2" ||
      item.style === "Heading3" ||
      item.style === "Heading4" ||
      numberedHeadingPattern.test(item.text.trim()))
  )
}

function getHeadingLevel(item: PolicyItem): 2 | 3 | 4 {
  if (item.type === "paragraph" && item.style === "Heading4") return 4
  if (item.type === "paragraph" && item.style === "Heading3") return 3
  return 2
}

function isMarkedBullet(item: PolicyItem | undefined) {
  return item?.type === "paragraph" && /^[*•]\s+/.test(item.text.trim())
}

function endsWithColon(item: PolicyItem | undefined) {
  return item?.type === "paragraph" && item.text.trim().endsWith(":")
}

function getListText(item: PolicyItem, previous: PolicyItem | undefined, next: PolicyItem | undefined) {
  if (item.type !== "paragraph" || isHeading(item)) return null

  const text = item.text.trim()

  if (item.style === "ListBullet" || item.style === "ListParagraph") {
    return text
  }

  if (isMarkedBullet(item)) {
    return text.replace(/^[*•]\s+/, "")
  }

  if (endsWithColon(previous) && isMarkedBullet(next)) {
    return text
  }

  return null
}

function toBlocks(items: readonly PolicyItem[]) {
  const blocks: PolicyBlock[] = []
  const idCounts = new Map<string, number>()

  for (let index = 0; index < items.length; index += 1) {
    const item = items[index]

    if (item.type === "table") {
      blocks.push({ kind: "table", rows: item.rows })
      continue
    }

    if (isHeading(item)) {
      blocks.push({
        kind: "heading",
        id: createId(item.text, index, idCounts),
        level: getHeadingLevel(item),
        text: item.text,
      })
      continue
    }

    const listText = getListText(item, items[index - 1], items[index + 1])
    if (listText) {
      const listItems = [listText]

      while (index + 1 < items.length) {
        const nextItem = items[index + 1]
        const nextListText = getListText(nextItem, items[index], items[index + 2])

        if (!nextListText) break

        listItems.push(nextListText)
        index += 1
      }

      blocks.push({ kind: "list", items: listItems })
      continue
    }

    blocks.push({
      kind: "paragraph",
      text: item.text,
      isDivider: item.text.trim() === "***",
    })
  }

  return blocks
}

function isTopLevelHeading(block: PolicyBlock): block is Extract<PolicyBlock, { kind: "heading" }> {
  return block.kind === "heading" && block.level === 2
}

function PolicyTable({ rows }: { rows: readonly (readonly string[])[] }) {
  const [header, ...bodyRows] = rows

  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-[#d8dfd7] bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        {header && (
          <thead className="bg-[#011a1e] text-white">
            <tr>
              {header.map((cell) => (
                <th key={cell} className="px-4 py-3 font-black">
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {bodyRows.map((row, rowIndex) => (
            <tr key={row.join("-") || rowIndex} className="border-t border-[#e5ebe3]">
              {row.map((cell) => (
                <td key={cell} className="px-4 py-3 text-[#31474b]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function PolicyContentBlock({ block }: { block: PolicyBlock }) {
  if (block.kind === "heading") {
    const HeadingTag = `h${block.level}` as const
    const className =
      block.level === 2
        ? "mt-10 scroll-mt-28 text-2xl font-black leading-tight text-[#011a1e] md:text-3xl"
        : block.level === 3
          ? "mt-8 scroll-mt-28 text-xl font-black leading-tight text-[#17373d]"
          : "mt-6 scroll-mt-28 text-base font-black uppercase tracking-wide text-[#04444c]"

    return (
      <HeadingTag id={block.id} className={className}>
        {block.text}
      </HeadingTag>
    )
  }

  if (block.kind === "list") {
    return (
      <ul className="my-5 space-y-3">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-[#31474b] md:text-base">
            <span
              aria-hidden="true"
              className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#fcc42c] ring-4 ring-[#fcc42c]/20"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (block.kind === "table") {
    return <PolicyTable rows={block.rows} />
  }

  if (block.isDivider) {
    return <p className="my-10 text-center text-lg font-black tracking-[0.35em] text-[#a6b3af]">{block.text}</p>
  }

  return <p className="mt-4 text-sm leading-7 text-[#31474b] md:text-base">{block.text}</p>
}

export default function PolicyPage({ slug }: PolicyPageProps) {
  const policy = getPolicyDocument(slug)
  const blocks = useMemo(() => (policy ? toBlocks(policy.body) : []), [policy])
  const sectionLinks = blocks.filter(isTopLevelHeading)

  if (!policy) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#f6f8f4] text-[#011a1e] selection:bg-[#fcc42c] selection:text-[#011a1e]">
      <section className="relative overflow-hidden bg-[#011a1e] pt-28 pb-10 text-white md:pt-32 md:pb-14">
        <div className="absolute inset-0">
          <img
            src="/1920-1080 service-01.jpg.jpeg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#011a1e]/45 via-[#011a1e]/82 to-[#011a1e]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#fcc42c] transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#fcc42c]/30 bg-[#fcc42c]/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#fcc42c]">
              <ShieldCheck className="h-3.5 w-3.5" />
              NeoGrid Policy
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-none tracking-tight md:text-6xl">
              {policy.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-gray-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <CalendarDays className="h-4 w-4 text-[#fcc42c]" />
                {policy.updatedAt}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                <FileText className="h-4 w-4 text-[#fcc42c]" />
                Full policy content
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#dfe7dd] bg-white">
        <div className="container mx-auto flex gap-2 overflow-x-auto px-4 py-3 lg:px-8">
          {POLICY_LINKS.map((link) => {
            const isActive = link.slug === policy.slug

            return (
              <Link
                key={link.slug}
                to={link.href}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-wide transition-all ${
                  isActive
                    ? "border-[#011a1e] bg-[#011a1e] text-white"
                    : "border-[#d7dfd5] bg-[#f6f8f4] text-[#31474b] hover:border-[#fcc42c] hover:text-[#011a1e]"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-4 py-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:px-8 lg:py-12">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 border-l border-[#d8dfd7] pl-5" aria-label={`${policy.title} sections`}>
            <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-[#778783]">
              On this page
            </p>
            <div className="flex flex-col gap-2">
              {sectionLinks.map((block) => (
                <a
                  key={block.id}
                  href={`#${block.id}`}
                  className="text-sm font-bold leading-snug text-[#526864] transition-colors hover:text-[#011a1e]"
                >
                  {block.text}
                </a>
              ))}
            </div>
          </nav>
        </aside>

        <motion.article
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto w-full max-w-4xl"
        >
          <div className="border-l-4 border-[#fcc42c] bg-white px-5 py-5 shadow-sm md:px-7">
            {blocks.slice(0, 2).map((block, index) => (
              <PolicyContentBlock key={`${block.kind}-${index}`} block={block} />
            ))}
          </div>

          <div className="pt-2">
            {blocks.slice(2).map((block, index) => (
              <motion.div
                key={`${block.kind}-${index}-${"text" in block ? block.text : index}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.32, ease: "easeOut" }}
              >
                <PolicyContentBlock block={block} />
              </motion.div>
            ))}
          </div>
        </motion.article>
      </section>
    </main>
  )
}
