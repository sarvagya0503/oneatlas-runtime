import Link from "next/link";
import {
  BookOpen,
  TriangleAlert,
  Mail,
  Rocket,
  CreditCard,
  FolderKanban,
  Puzzle,
  Code2,
  Search,
  MessageCircle,
} from "lucide-react";

const quickActions = [
  {
    title: "Browse Docs",
    description: "Explore step-by-step guides and product documentation.",
    icon: <BookOpen size={22} />,
  },
  {
    title: "Common Issues",
    description: "Find solutions to the most frequent questions.",
    icon: <TriangleAlert size={22} />,
  },
  {
    title: "Contact Support",
    description: "Submit a request and our team will get back to you.",
    icon: <Mail size={22} />,
  },
];

const topics = [
  {
    title: "Getting Started",
    description: "Set up your account and build your first app.",
    count: "8 articles",
    icon: <Rocket size={24} />,
  },
  {
    title: "Billing & Account",
    description: "Manage your plan, billing, and account settings.",
    count: "6 articles",
    icon: <CreditCard size={24} />,
  },
  {
    title: "Projects & Apps",
    description: "Manage your projects, apps, and deployments.",
    count: "10 articles",
    icon: <FolderKanban size={24} />,
  },
  {
    title: "Integrations",
    description: "Connect OneAtlas with your favorite tools.",
    count: "8 articles",
    icon: <Puzzle size={24} />,
  },
  {
    title: "API & Developers",
    description: "Learn about APIs, SDKs, and best practices.",
    count: "12 articles",
    icon: <Code2 size={24} />,
  },
];

const articles = [
  ["How to build your first app with OneAtlas", "Getting Started"],
  ["Understanding credits and usage", "Billing & Account"],
  ["Troubleshooting deployment failures", "Troubleshooting"],
  ["API authentication and best practices", "API & Developers"],
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-[#F5F5EE] text-[#111111]">
      <nav className="border-b border-[#E5E7EB] bg-[#F5F5EE]/95">
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
            <Link href="/">Docs</Link>
            <span>API</span>
            <span>Examples</span>
            <span>Guides</span>
            <span>Changelog</span>
          </div>

          <Link
            href="/"
            className="rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E65C00]"
          >
            Start Building
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#FF6600]">
            Support Center
          </p>

          <h1 className="mt-4 text-[52px] font-bold leading-[0.95] tracking-[-0.05em] md:text-[68px]">
            How can we help?
          </h1>

          <p className="mt-5 max-w-xl text-[16px] leading-7 text-[#6B7280]">
            Find answers, guides, and resources to help you build and deploy
            with OneAtlas.
          </p>

          <div className="mt-7 flex max-w-xl items-center rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3">
            <Search size={18} className="mr-3 shrink-0 text-[#9CA3AF]" />

            <input
              placeholder="Search for help, topics, and common issues..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#9CA3AF]"
            />

            <span className="rounded-md bg-[#F5F5EE] px-2 py-1 text-xs text-[#9CA3AF]">
              ⌘ K
            </span>
          </div>
        </div>

        <div className="hidden justify-center md:flex">
          <div className="relative h-[300px] w-[300px] rounded-full border border-[#E5E7EB]">
            <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6600]/20 blur-2xl" />

            <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF6600] text-white">
              <MessageCircle size={36} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 pb-12 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((item) => (
            <div
              key={item.title}
              className="rounded-[22px] border border-[#E5E7EB] bg-white p-6 transition hover:-translate-y-1 hover:border-[#FF6600]"
            >
              <div className="mb-4 text-[#FF6600]">{item.icon}</div>

              <h3 className="font-semibold">{item.title}</h3>

              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-10 md:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Browse by topic</h2>

          <span className="text-sm font-semibold text-[#FF6600]">
            View all topics →
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          {topics.map((topic) => (
            <div
              key={topic.title}
              className="rounded-[22px] border border-[#E5E7EB] bg-white p-6 text-center transition hover:-translate-y-1 hover:border-[#FF6600]"
            >
              <div className="flex justify-center text-[#FF6600]">
                {topic.icon}
              </div>

              <h3 className="mt-5 font-semibold">{topic.title}</h3>

              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                {topic.description}
              </p>

              <p className="mt-4 text-xs font-semibold text-[#FF6600]">
                {topic.count}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] gap-6 px-5 py-10 md:grid-cols-[1fr_360px] md:px-8">
        <div>
          <h2 className="mb-5 text-xl font-semibold">Popular articles</h2>

          <div className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white">
            {articles.map(([title, tag]) => (
              <div
                key={title}
                className="flex items-center justify-between gap-4 border-b border-[#ECECEC] px-5 py-4 last:border-b-0"
              >
                <h3 className="text-sm font-semibold">{title}</h3>

                <span className="shrink-0 rounded-full bg-[#FFF7F1] px-3 py-1 text-xs font-semibold text-[#FF6600]">
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF7F1] text-[#FF6600]">
            <MessageCircle size={24} />
          </div>

          <h3 className="text-xl font-semibold">Still need help?</h3>

          <p className="mt-3 text-sm leading-6 text-[#6B7280]">
            Can’t find what you’re looking for? Submit a request and our team
            will get back to you.
          </p>

          <button className="mt-6 rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white hover:bg-[#E65C00]">
            Submit a request →
          </button>

          <p className="mt-5 text-xs text-[#9CA3AF]">
            We typically respond within 24 hours.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#E5E7EB] px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 text-sm text-[#6B7280] md:flex-row">
          <p>© 2026 OneAtlas. All rights reserved.</p>

          <div className="flex gap-5">
            <span>Status</span>
            <span>Privacy</span>
            <span>Terms</span>
            <span>Security</span>
          </div>
        </div>
      </footer>
    </main>
  );
}