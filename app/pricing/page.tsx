"use client";

import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Explorer",
    subtitle: "Learning & experimentation",
    price: "Free",
    cta: "Start Free",
  },
  {
    name: "Builder",
    subtitle: "Indie builders & MVPs",
    price: "₹999/mo",
    cta: "Build Faster",
    highlighted: true,
  },
  {
    name: "Studio",
    subtitle: "Startups & product teams",
    price: "₹2,499/mo",
    cta: "Upgrade",
  },
  {
    name: "Scale",
    subtitle: "AI-native companies",
    price: "Custom",
    cta: "Contact Sales",
  },
];

const rows = [
  ["AI Usage Capacity", "30 monthly credits", "200 monthly credits", "800 monthly credits", "2,500+ monthly credits"],
  ["Runtime Templates", "Starter templates", "All operational templates", "Advanced templates", "Custom templates"],
  ["Projects", "Unlimited public apps", "Public + private apps", "Unlimited apps", "Organization workspaces"],
  ["Preview Snapshots", "Basic previews", "Preview history", "Team preview sharing", "Governed preview links"],
  ["Schema Versioning", "Basic schema save", "Version history", "Rollback support", "Audit-backed history"],
  ["Conversational Editing", "Basic edits", "Add / rename / remove fields", "Advanced mutation flows", "Governed changes"],
  ["Database Backend", "Shared infrastructure", "Managed Neon database", "Production database", "Dedicated resources"],
  ["GitHub Integration", "—", "Included", "Included", "Included"],
  ["Team Collaboration", "—", "—", "Shared workspaces", "Granular permissions"],
  ["API Access", "—", "Basic API access", "Workflow APIs", "Enterprise APIs"],
  ["Build Priority", "Standard", "Faster builds", "Priority builds", "Dedicated queue"],
  ["Analytics", "Basic metrics", "Project analytics", "Advanced observability", "Full insights"],
  ["Support", "Community", "Email support", "Priority support", "Dedicated channel"],
  ["Ideal Use Case", "Explore platform", "Launch apps", "Scale teams", "Mission-critical systems"],
];

const categories = [
  {
    label: "Platform",
    items: [
      {
        q: "What is OneAtlas?",
        a: "OneAtlas is an AI-native platform for generating runtime internal tools, dashboards, workflows, and operational applications.",
      },
      {
        q: "Who is OneAtlas built for?",
        a: "It is built for founders, startups, operators, product teams, and businesses that want to ship internal software faster.",
      },
      {
        q: "Do I need to know how to code?",
        a: "No. You can generate applications using prompts and then edit them through conversational runtime instructions.",
      },
    ],
  },
  {
    label: "Pricing",
    items: [
      {
        q: "Can I start for free?",
        a: "Yes. Explorer is designed for learning the runtime workflow and generating basic apps.",
      },
      {
        q: "Why is Builder recommended?",
        a: "Builder includes templates, conversational editing, schema versioning, undo, and preview history.",
      },
      {
        q: "Can I upgrade later?",
        a: "Yes. The pricing structure is designed to scale as your runtime apps and workflows grow.",
      },
    ],
  },
  {
    label: "Runtime",
    items: [
      {
        q: "What is a runtime schema?",
        a: "A runtime schema is the source of truth for the generated application. The UI is rendered from this schema instead of being hardcoded.",
      },
      {
        q: "Do edits regenerate the whole app?",
        a: "No. Conversational edits apply targeted schema mutations such as adding, removing, or renaming fields.",
      },
      {
        q: "Are preview links mutable?",
        a: "No. Preview links are frozen snapshots. Future schema edits do not affect already generated previews.",
      },
    ],
  },
  {
    label: "Enterprise",
    items: [
      {
        q: "Can this support enterprise workflows?",
        a: "Yes. The Scale tier represents governance, audit logs, dedicated infrastructure, and organization-level controls.",
      },
      {
        q: "Does OneAtlas support team collaboration?",
        a: "The platform is designed for team-based workflows with versioning, shared previews, and workspace-level controls.",
      },
      {
        q: "Is my data secure?",
        a: "OneAtlas is structured around protected infrastructure, database-backed persistence, and future-ready access control patterns.",
      },
    ],
  },
];

export default function PricingPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);

  function toggleFAQ(index: number) {
    setOpenIndex(openIndex === index ? -1 : index);
  }

  return (
    <main className="min-h-screen bg-[#F5F5EE] text-[#111111]">
      <nav className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-[#F5F5EE]/95">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 md:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111111] text-sm font-semibold text-white">
              OA
            </div>

            <span className="text-lg font-semibold tracking-[-0.02em]">
              OneAtlas
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-[15px] font-medium text-[#4B5563] md:flex">
            <Link href="/">Product</Link>
            <span>Solutions</span>
            <span>Resources</span>
            <span className="text-[#FF6600]">Pricing</span>
            <span>Enterprise</span>
          </div>

          <Link
            href="/"
            className="h-11 rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#E65C00]"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-[1280px] px-5 pb-8 pt-16 text-center md:px-8 md:pt-20">
        <p className="mx-auto w-fit rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#FF6600]">
          Pricing
        </p>

        <h1 className="mx-auto mt-5 max-w-[1200px] text-[42px] font-bold leading-[0.9] tracking-[-0.05em] md:text-[56px]">
          Simple pricing. Unlimited runtime possibilities.
        </h1>

        <p className="mx-auto mt-4 max-w-4xl text-[15px] leading-7 text-[#6B7280]">
          Choose the plan that fits your journey. Start free and scale as you
          build editable, database-backed operational apps.
        </p>

        <div className="mx-auto mt-6 flex w-fit items-center rounded-[18px] border border-[#E5E7EB] bg-white p-1">
          <button className="h-9 rounded-xl bg-[#111111] px-5 text-sm font-semibold text-white">
            Monthly
          </button>

          <button className="h-9 rounded-xl px-5 text-sm font-semibold text-[#6B7280]">
            Yearly
          </button>

          <span className="ml-2 rounded-full bg-[#F5F5EE] px-3 py-1 text-xs font-semibold text-[#FF6600]">
            Save 20%
          </span>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 pb-6 md:px-8">
        <div className="overflow-x-auto rounded-[24px] border border-[#E5E7EB] bg-white">
          <div className="min-w-[980px]">
            <div className="grid grid-cols-[220px_repeat(4,1fr)] border-b border-[#E5E7EB]">
              <div className="p-5 text-sm font-semibold">Features</div>

              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`border-l border-[#E5E7EB] p-5 ${
                    plan.highlighted ? "bg-[#FFF7F1]" : "bg-white"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="mb-3 w-fit rounded-full bg-[#FF6600] px-3 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </div>
                  )}

                  <h2 className="text-lg font-semibold">{plan.name}</h2>

                  <p className="mt-1 min-h-8 text-xs leading-5 text-[#6B7280]">
                    {plan.subtitle}
                  </p>

                  <p className="mt-4 text-[30px] font-semibold tracking-[-0.03em]">
                    {plan.price}
                  </p>
                </div>
              ))}
            </div>

            {rows.map((row) => (
              <div
                key={row[0]}
                className="grid grid-cols-[220px_repeat(4,1fr)] border-b border-[#ECECEC] last:border-b-0"
              >
                <div className="flex items-center gap-3 px-4 py-4 text-sm font-semibold">
                  <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
                  {row[0]}
                </div>

                {row.slice(1).map((value, index) => (
                  <div
                    key={value + index}
                    className={`border-l border-[#ECECEC] px-4 py-4 text-sm leading-6 ${
                      index === 1 ? "bg-[#FFF7F1]" : ""
                    }`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            ))}

            <div className="grid grid-cols-[220px_repeat(4,1fr)] border-t border-[#E5E7EB]">
              <div className="px-4 py-4 text-sm font-semibold">CTA</div>

              {plans.map((plan) => (
                <div
                  key={plan.cta}
                  className={`border-l border-[#ECECEC] px-4 py-4 ${
                    plan.highlighted ? "bg-[#FFF7F1]" : ""
                  }`}
                >
                  <button
                    className={`h-10 w-full rounded-xl text-sm font-semibold transition ${
                      plan.highlighted
                        ? "bg-[#FF6600] text-white hover:bg-[#E65C00]"
                        : "border border-[#E5E7EB] bg-white text-[#111111] hover:bg-[#FAFAFA]"
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-8 md:px-8">
        <div className="grid overflow-hidden rounded-[32px] border border-[#E5E7EB] bg-[#111111] text-white md:grid-cols-[1fr_380px]">
          <div className="p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#FF6600]">
              Ready to build?
            </p>

            <h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.03em]">
              Build your first runtime app with OneAtlas.
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#D1D5DB]">
              Generate a workspace, edit its schema conversationally, and share
              immutable previews with your team.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#FF6600] px-5 text-sm font-semibold text-white hover:bg-[#E65C00]"
              >
                Start for Free
              </Link>

              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/20 px-5 text-sm font-semibold text-white hover:bg-white/10"
              >
                Explore Templates
              </Link>
            </div>
          </div>

          <div className="hidden border-l border-white/10 p-8 md:block">
            <div className="h-full rounded-[24px] border border-white/10 bg-white/5 p-5">
              <div className="rounded-[18px] bg-white p-5 text-[#111111]">
                <p className="text-sm font-semibold">Runtime Preview</p>

                <div className="mt-4 h-3 w-3/4 rounded-full bg-[#E5E7EB]" />
                <div className="mt-3 h-3 w-1/2 rounded-full bg-[#E5E7EB]" />

                <div className="mt-5 grid grid-cols-3 gap-3">
                  <div className="h-14 rounded-xl bg-[#F5F5EE]" />
                  <div className="h-14 rounded-xl bg-[#F5F5EE]" />
                  <div className="h-14 rounded-xl bg-[#F5F5EE]" />
                </div>
              </div>

              <div className="mt-4 rounded-[18px] border border-white/10 p-4">
                <p className="text-sm text-[#D1D5DB]">
                  Schema-first dashboards, preview links, and versioned edits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5EE] px-5 pb-20 pt-10 md:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 text-center">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold text-[#FF6600]">
              <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
              FAQ
            </div>

            <h2 className="text-[36px] font-bold leading-tight tracking-[-0.035em] text-[#111111] md:text-[44px]">
              Frequently asked questions
            </h2>

            <p className="mx-auto mt-4 max-w-md text-[16px] leading-7 text-[#6B7280]">
              Everything you need to know about OneAtlas.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-[240px_1fr]">
            <div className="md:sticky md:top-24 md:self-start">
              <div className="flex flex-col gap-1">
                {categories.map((category, index) => (
                  <button
                    key={category.label}
                    onClick={() => {
                      setActiveCategory(index);
                      setOpenIndex(0);
                    }}
                    className={`rounded-xl px-4 py-3 text-left text-[15px] font-medium transition ${
                      activeCategory === index
                        ? "bg-[#FFF7F1] text-[#FF6600]"
                        : "text-[#6B7280] hover:bg-white hover:text-[#111111]"
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_24px_rgba(0,0,0,0.03)]">
              {categories[activeCategory].items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={item.q}
                    className="border-b border-[#ECECEC] last:border-b-0"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left transition hover:bg-[#FAFAFA]"
                    >
                      <span
                        className={`text-[15px] font-semibold leading-6 ${
                          isOpen ? "text-[#FF6600]" : "text-[#111111]"
                        }`}
                      >
                        {item.q}
                      </span>

                      <span
                        className={`text-xl transition ${
                          isOpen ? "rotate-45 text-[#FF6600]" : "text-[#9CA3AF]"
                        }`}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-7 pb-6 text-[15px] leading-7 text-[#6B7280]">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}