"use client";

import Link from "next/link";
import { useState } from "react";

const plans = [
  {
    name: "Explorer",
    subtitle: "For testing ideas and first AI products.",
    price: "$0",
    cta: "Start Building Free",
  },
  {
    name: "Studio",
    subtitle: "For founders launching production apps.",
    price: "$24/mo",
    cta: "Upgrade to Studio",
  },
  {
    name: "Scale",
    subtitle: "For startups building serious AI software.",
    price: "$59/mo",
    cta: "Start Scaling",
    highlighted: true,
  },
  {
    name: "Orbit",
    subtitle: "For high-growth companies at scale.",
    price: "$149/mo",
    cta: "Contact Sales",
  },
];

const rows = [
  [
    "AI Build Credits",
    "30 AI build credits",
    "150 AI build credits",
    "500 AI build credits",
    "1,500 AI build credits",
  ],

  [
    "Automation Credits",
    "200 automation credits",
    "5,000 automation credits",
    "20,000 automation credits",
    "75,000 automation credits",
  ],

  [
    "Projects",
    "Unlimited projects",
    "Unlimited projects",
    "Unlimited projects",
    "Unlimited projects",
  ],

  [
    "Visual Builder",
    "Included",
    "Included",
    "Included",
    "Included",
  ],

  [
    "Database & Auth",
    "Included",
    "Included",
    "Included",
    "Included",
  ],

  [
    "Deployment",
    "One-click deployment",
    "Faster deployment",
    "Production hosting",
    "Dedicated infrastructure",
  ],

  [
    "Custom Domains",
    "—",
    "Included",
    "Included",
    "Included",
  ],

  [
    "Backend APIs",
    "—",
    "Included",
    "Included",
    "Included",
  ],

  [
    "Code Editing",
    "—",
    "Included",
    "Included",
    "Included",
  ],

  [
    "GitHub Sync",
    "—",
    "Included",
    "Included",
    "Included",
  ],

  [
    "Branding Control",
    "OneAtlas branding",
    "Remove branding",
    "Remove branding",
    "Remove branding",
  ],

  [
    "AI Model Access",
    "Core AI tools",
    "Core AI tools",
    "Advanced AI models",
    "Premium AI routing",
  ],

  [
    "Team Workspace",
    "—",
    "—",
    "Shared workspace",
    "Advanced permissions",
  ],

  [
    "Analytics",
    "—",
    "—",
    "Analytics & monitoring",
    "Audit logs & insights",
  ],

  [
    "SEO Optimization",
    "—",
    "—",
    "Included",
    "Included",
  ],

  [
    "Authentication",
    "—",
    "—",
    "—",
    "Enterprise SSO/SAML",
  ],

  [
    "Support",
    "Community",
    "Standard support",
    "Priority support",
    "Slack support",
  ],
];

const categories = [
  {
    label: "Platform",
    items: [
      {
        q: "What is OneAtlas?",
        a: "OneAtlas is an AI-native platform for building runtime internal tools, operational dashboards, automations, and production-ready applications.",
      },
      {
        q: "Who is OneAtlas built for?",
        a: "OneAtlas is designed for founders, startups, operators, agencies, and modern product teams building AI-powered software.",
      },
      {
        q: "Do I need coding experience?",
        a: "No. You can generate applications conversationally using AI prompts and visually edit them inside the runtime builder.",
      },
      {
        q: "Can I deploy production apps?",
        a: "Yes. OneAtlas supports production-ready deployments, databases, APIs, authentication, and custom domains.",
      },
    ],
  },

  {
    label: "Pricing",
    items: [
      {
        q: "Can I start for free?",
        a: "Yes. The Explorer plan is completely free and includes AI build credits to help you explore the platform.",
      },
      {
        q: "Can I upgrade later?",
        a: "Absolutely. You can upgrade your workspace anytime as your product and usage scale.",
      },
      {
        q: "Is yearly billing discounted?",
        a: "Yes. Annual billing includes discounted pricing compared to monthly plans.",
      },
      {
        q: "Are there usage limits?",
        a: "Each plan includes AI build credits and automation credits based on your subscription tier.",
      },
    ],
  },

  {
    label: "Features",
    items: [
      {
        q: "Does OneAtlas include databases?",
        a: "Yes. Every plan includes built-in database functionality and authentication support.",
      },
      {
        q: "Can I connect GitHub?",
        a: "Yes. GitHub synchronization is available on Studio plans and above.",
      },
      {
        q: "Do you support APIs and backend functions?",
        a: "Yes. OneAtlas supports backend APIs, server logic, and runtime integrations.",
      },
      {
        q: "Can I use custom domains?",
        a: "Yes. Custom domain support is included in paid plans.",
      },
    ],
  },

  {
    label: "Enterprise",
    items: [
      {
        q: "Do you support enterprise infrastructure?",
        a: "Yes. Orbit includes dedicated infrastructure, advanced security, and enterprise-grade controls.",
      },
      {
        q: "Do you support SSO?",
        a: "Yes. Enterprise SSO/SAML authentication is available for enterprise customers.",
      },
      {
        q: "Do you provide onboarding?",
        a: "Yes. Enterprise onboarding and migration assistance are included for large teams.",
      },
      {
        q: "Can OneAtlas scale with large organizations?",
        a: "Yes. OneAtlas is designed to support enterprise workloads, team collaboration, governance, and operational scale.",
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

          <div className="hidden items-center gap-8 text-[15px] font-medium text-[#4B5563] md:flex">
            <Link href="/">Product</Link>
            <span>Solutions</span>
            <span>Resources</span>
            <span className="text-[#FF6600]">Pricing</span>
            <span>Enterprise</span>
          </div>

          <Link
            href="/"
            className="rounded-xl bg-[#FF6600] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#E65C00]"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="mx-auto max-w-[1280px] px-5 pb-7 pt-14 text-center md:px-8 md:pt-16">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold text-[#FF6600]">
          <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
          Pricing
        </div>

        <h1 className="mx-auto mt-5 max-w-[1200px] text-[42px] font-bold leading-[0.9] tracking-[-0.05em] md:text-[56px]">
          Simple pricing.{" "}
          <span className="text-[#FF6600]">
            Unlimited possibilities.
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[16px] leading-7 text-[#6B7280]">
          Choose the perfect plan for your stage.
        </p>

        <div className="mx-auto mt-6 flex w-fit items-center rounded-full border border-[#E5E7EB] bg-white p-1">
          <button className="rounded-full bg-[#111111] px-5 py-2 text-sm font-semibold text-white">
            Monthly
          </button>

          <button className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-[#6B7280]">
            Yearly
            <span className="rounded-full bg-[#FF6600] px-2 py-1 text-[10px] text-white">
              Save 20%
            </span>
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 pb-6 md:px-8">
        <div className="overflow-x-auto overflow-y-visible rounded-[28px] border border-[#E5E7EB] bg-white pt-4 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_24px_rgba(0,0,0,0.03)]">
          <div className="min-w-[1080px]">

            <div className="grid grid-cols-[170px_repeat(4,1fr)] border-b border-[#ECECEC]">
              <div className="px-5 py-4 text-sm font-semibold">
                Features
              </div>

              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative border-l px-5 py-4 ${
                    plan.highlighted
                      ? "border-x-2 border-t-2 border-[#FF6600] bg-[#FFF7F1]"
                      : "border-[#ECECEC]"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF6600] px-4 py-1 text-[11px] font-semibold text-white">
                      Most Popular
                    </div>
                  )}

                  <h2 className="text-[22px] font-semibold">
                    {plan.name}
                  </h2>

                  <p className="mt-1 text-[13px] leading-5 text-[#6B7280]">
                    {plan.subtitle}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-[170px_repeat(4,1fr)] border-b border-[#ECECEC]">
              <div className="px-4 py-3 text-sm font-semibold">
                Pricing
              </div>

              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`border-l px-4 py-3 text-[28px] font-semibold tracking-[-0.03em] ${
                    plan.highlighted
                      ? "border-x-2 border-[#FF6600] bg-[#FFF7F1]"
                      : "border-[#ECECEC]"
                  }`}
                >
                  {plan.price}
                </div>
              ))}
            </div>

            {rows.map((row) => (
              <div
                key={row[0]}
                className="grid grid-cols-[170px_repeat(4,1fr)] border-b border-[#ECECEC] last:border-b-0"
              >
                <div className="flex items-center gap-2 px-4 py-3 text-sm font-semibold">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF6600]" />
                  <span>{row[0]}</span>
                </div>

                {row.slice(1).map((value, index) => (
                  <div
                    key={value + index}
                    className={`border-l px-4 py-3 text-sm leading-6 ${
                      index === 2
                        ? "border-x-2 border-[#FF6600] bg-[#FFF7F1]"
                        : "border-[#ECECEC]"
                    }`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            ))}

            <div className="grid grid-cols-[170px_repeat(4,1fr)]">
              <div className="px-4 py-4 text-sm font-semibold">
                Get Started
              </div>

              {plans.map((plan, index) => (
                <div
                  key={plan.cta}
                  className={`border-l px-4 py-4 ${
                    index === 2
                      ? "border-x-2 border-b-2 border-[#FF6600] bg-[#FFF7F1]"
                      : "border-[#ECECEC]"
                  }`}
                >
                  <button
                    className={`h-10 w-full rounded-xl text-sm font-semibold transition ${
                      index === 2
                        ? "bg-[#FF6600] text-white hover:bg-[#E65C00]"
                        : "border border-[#E5E7EB] bg-white hover:bg-[#FAFAFA]"
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
        <div className="rounded-[32px] bg-[#FF6600] px-8 py-10 text-white md:px-14">
          <h2 className="text-4xl font-bold tracking-[-0.03em]">
            Enterprise
          </h2>

          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/90">
            Custom infrastructure & deployment solutions for modern organizations.
          </p>

          <div className="mt-6 flex flex-col gap-3 text-sm text-white/90">
            <div>✓ Private cloud or dedicated hosting</div>
            <div>✓ Custom integrations & workflows</div>
            <div>✓ SLA-backed uptime guarantees</div>
          </div>

          <button className="mt-8 rounded-xl bg-[#111111] px-6 py-3 text-sm font-semibold text-white hover:bg-[#222222]">
            Talk to Enterprise Sales
          </button>
        </div>
      </section>

      <section className="bg-[#F5F5EE] px-5 pb-20 pt-6 md:px-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold text-[#FF6600]">
              <span className="h-2 w-2 rounded-full bg-[#FF6600]" />
              FAQ
            </div>

            <h2 className="text-[40px] font-bold tracking-[-0.03em]">
              Frequently asked questions
            </h2>

            <p className="mx-auto mt-3 max-w-md text-[15px] leading-7 text-[#6B7280]">
              Everything you need to know about OneAtlas.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[240px_1fr]">
            <div className="flex flex-col gap-1">
              {categories.map((category, index) => (
                <button
                  key={category.label}
                  onClick={() => {
                    setActiveCategory(index);
                    setOpenIndex(0);
                  }}
                  className={`rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    activeCategory === index
                      ? "bg-[#FFF7F1] text-[#FF6600]"
                      : "text-[#6B7280] hover:bg-white hover:text-[#111111]"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white">
              {categories[activeCategory].items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={item.q}
                    className="border-b border-[#ECECEC] last:border-b-0"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="flex w-full items-center justify-between px-6 py-5 text-left"
                    >
                      <span
                        className={`text-[15px] font-semibold ${
                          isOpen
                            ? "text-[#FF6600]"
                            : "text-[#111111]"
                        }`}
                      >
                        {item.q}
                      </span>

                      <span
                        className={`text-xl transition ${
                          isOpen
                            ? "rotate-45 text-[#FF6600]"
                            : "text-[#9CA3AF]"
                        }`}
                      >
                        +
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-5 text-[15px] leading-7 text-[#6B7280]">
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