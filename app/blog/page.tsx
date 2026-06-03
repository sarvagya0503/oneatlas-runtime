import Link from "next/link";
import {
  Search,
  ArrowRight,
  Mail,
  Bot,
  Workflow,
  Newspaper,
  BookOpen,
  Code2,
} from "lucide-react";

const categories = [
  "All",
  "Product",
  "Engineering",
  "Guides",
  "Use Cases",
  "Company",
  "Updates",
];

const posts = [
  {
    category: "Product",
    title: "OneAtlas 2.0: What’s new",
    description:
      "New capabilities for building, orchestrating, and shipping AI-native software.",
    date: "May 18, 2026",
    read: "6 min read",
  },
  {
    category: "Engineering",
    title: "Inside the multi-agent runtime",
    description:
      "A deep dive into the architecture that powers autonomous execution at scale.",
    date: "May 15, 2026",
    read: "10 min read",
  },
  {
    category: "Guides",
    title: "Building AI workflows that scale",
    description:
      "Best practices for designing reliable, observable, and evolvable workflows.",
    date: "May 14, 2026",
    read: "9 min read",
  },
  {
    category: "Use Cases",
    title: "From idea to app in minutes",
    description:
      "See how teams are using OneAtlas to go from idea to production-ready software.",
    date: "May 12, 2026",
    read: "5 min read",
  },
];

const popularTopics = [
  ["AI Agents", "24", Bot],
  ["Workflows", "18", Workflow],
  ["Product Updates", "16", Newspaper],
  ["Guides", "14", BookOpen],
  ["Engineering", "12", Code2],
];

const updates = [
  "OneAtlas Copilot in production",
  "New integrations: Slack, GitHub, and Notion",
  "OneAtlas raises $15M Series A",
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#F5F5EE] text-[#111111]">
      <nav className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-[#F5F5EE]/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111111] text-sm font-semibold text-white">
              OA
            </div>

            <span className="text-lg font-semibold tracking-[-0.02em]">
              OneAtlas
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-[#4B5563] md:flex">
            <Link href="/">Platform</Link>
            <span>Solutions</span>
            <span>Resources</span>
            <span>Enterprise</span>
            <Link href="/pricing">Pricing</Link>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] md:flex">
              <Search size={17} />
            </button>

            <Link
              href="/"
              className="rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#E65C00]"
            >
              Start Building
            </Link>
          </div>
        </div>
      </nav>

      <section className="mx-auto grid max-w-[1280px] items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-20">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#FF6600]">
            <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
            Blog
          </p>

          <h1 className="mt-6 max-w-xl text-[52px] font-bold leading-[0.95] tracking-[-0.05em] md:text-[68px]">
            Insights for AI-native builders
          </h1>

          <p className="mt-6 max-w-md text-[16px] leading-7 text-[#6B7280]">
            Thoughts, tutorials, and updates on building the next generation of
            software with AI.
          </p>
        </div>

        <div className="hidden justify-center md:flex">
          <div className="relative h-[330px] w-[330px]">
            <div className="absolute inset-0 rounded-full border border-[#E5E7EB]" />
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6600]/25 blur-3xl" />

            <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 rotate-6 items-center justify-center rounded-[32px] border border-[#E5E7EB] bg-white text-4xl font-bold text-[#FF6600] shadow-[0_0_60px_rgba(255,102,0,0.2)]">
              OA
            </div>

            <div className="absolute left-[44%] top-[42%] h-32 w-32 rotate-12 rounded-[32px] border border-[#E5E7EB] bg-white/60" />
            <div className="absolute left-[38%] top-[36%] h-32 w-32 rotate-6 rounded-[32px] border border-[#E5E7EB] bg-white/60" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 pb-8 md:px-8">
        <div className="flex flex-col justify-between gap-4 rounded-[22px] border border-[#E5E7EB] bg-white p-2 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  index === 0
                    ? "bg-[#FF6600] text-white"
                    : "text-[#6B7280] hover:bg-[#FFF7F1] hover:text-[#FF6600]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button className="flex items-center justify-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-5 py-2 text-sm font-semibold text-[#6B7280]">
            Latest
            <span>⌄</span>
          </button>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-6 px-5 pb-16 md:grid-cols-[1fr_360px] md:px-8">
        <div>
          <article className="overflow-hidden rounded-[28px] border border-[#E5E7EB] bg-[#111111] text-white shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_24px_rgba(0,0,0,0.03)]">
            <div className="relative min-h-[360px] p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_40%,rgba(255,102,0,0.45),transparent_30%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.12),transparent_35%)]" />

              <div className="relative z-10 flex h-full min-h-[300px] flex-col justify-end">
                <span className="mb-4 w-fit rounded-full bg-[#FF6600] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-white">
                  Featured
                </span>

                <h2 className="max-w-xl text-4xl font-semibold leading-tight tracking-[-0.03em]">
                  The operating system for AI-native teams
                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
                  How OneAtlas unifies agents, tools, and workflows to ship
                  production-ready software faster.
                </p>

                <div className="mt-6 flex gap-4 text-xs text-white/60">
                  <span>May 20, 2026</span>
                  <span>8 min read</span>
                </div>
              </div>
            </div>
          </article>

          <div className="mt-5 overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white">
            {posts.map((post, index) => (
              <article
                key={post.title}
                className="grid gap-5 border-b border-[#ECECEC] p-4 last:border-b-0 md:grid-cols-[180px_1fr_40px]"
              >
                <div
                  className={`h-32 rounded-[18px] ${
                    index === 0
                      ? "bg-[#FFF7F1]"
                      : index === 1
                      ? "bg-[#F5F5EE]"
                      : index === 2
                      ? "bg-[#ECFDF5]"
                      : "bg-[#FEF2F2]"
                  }`}
                />

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#FF6600]">
                    {post.category}
                  </p>

                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em]">
                    {post.title}
                  </h3>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#6B7280]">
                    {post.description}
                  </p>

                  <div className="mt-4 flex gap-4 text-xs text-[#9CA3AF]">
                    <span>{post.date}</span>
                    <span>{post.read}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end text-[#6B7280]">
                  <ArrowRight size={18} />
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="rounded-xl border border-[#E5E7EB] bg-white px-5 py-3 text-sm font-semibold text-[#111111] transition hover:border-[#FF6600] hover:text-[#FF6600]">
              Load more
            </button>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF7F1] text-[#FF6600] shadow-[0_0_30px_rgba(255,102,0,0.18)]">
              <Mail size={23} />
            </div>

            <h3 className="text-xl font-semibold">Stay in the loop</h3>

            <p className="mt-3 text-sm leading-6 text-[#6B7280]">
              Get the latest insights, product updates, and tutorials straight
              to your inbox.
            </p>

            <div className="mt-6 flex gap-2">
              <input
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-xl border border-[#E5E7EB] bg-white px-3 py-3 text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#FF6600]"
              />

              <button className="rounded-xl bg-[#FF6600] px-4 text-sm font-semibold text-white hover:bg-[#E65C00]">
                Subscribe
              </button>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7">
            <h3 className="text-lg font-semibold">Popular topics</h3>

            <div className="mt-5 space-y-4">
              {popularTopics.map(([topic, count, Icon]) => (
                <div
                  key={topic as string}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3 text-[#4B5563]">
                    <Icon size={16} className="text-[#FF6600]" />
                    <span>{topic as string}</span>
                  </div>

                  <span className="text-[#9CA3AF]">{count as string}</span>
                </div>
              ))}
            </div>

            <button className="mt-6 text-sm font-semibold text-[#FF6600]">
              View all topics →
            </button>
          </div>

          <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7">
            <h3 className="text-lg font-semibold">Latest from OneAtlas</h3>

            <div className="mt-5 space-y-5">
              {updates.map((update) => (
                <div key={update}>
                  <p className="text-sm font-medium leading-6">{update}</p>
                  <p className="mt-1 text-xs text-[#9CA3AF]">May 2026</p>
                </div>
              ))}
            </div>

            <button className="mt-6 text-sm font-semibold text-[#FF6600]">
              View all updates →
            </button>
          </div>
        </aside>
      </section>
    </main>
  );
}