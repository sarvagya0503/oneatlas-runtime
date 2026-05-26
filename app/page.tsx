"use client";

import { templates } from "@/lib/templates";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const examples = [
  "Create a CRM dashboard for managing clients and deals",
  "Build an inventory system for stock and suppliers",
  "Generate an analytics workspace for revenue reports",
  "Create an HR dashboard for employees and leave requests",
];

export default function HomePage() {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function generateApp() {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    try {
      setLoading(true);
      setStatus("Matching best template...");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      setStatus("Building runtime schema...");

      const data = await response.json();

      if (!data.success) {
        toast.error(data.error || "No matching template found");
        return;
      }

      toast.success("App generated successfully");
      setStatus("Launching builder...");
      router.push(`/builder/${data.data.appId}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function useTemplate(templateId: string) {
    try {
      setLoading(true);
      setStatus("Instantiating template...");

      const response = await fetch(`/api/templates/${templateId}/instantiate`, {
        method: "POST",
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.error || "Failed to use template");
        return;
      }

      toast.success(`${data.data.templateUsed} created`);
      router.push(`/builder/${data.data.appId}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F5EE] text-[#111111]">
      <nav className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-[#F5F5EE]/90 backdrop-blur-sm">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111111] text-sm font-semibold text-white">
              OA
            </div>

            <span className="text-lg font-semibold tracking-[-0.02em]">
              OneAtlas
            </span>
          </div>

          <div className="hidden items-center gap-8 text-[15px] font-medium text-[#4B5563] md:flex">
            <span className="transition hover:text-[#111111]">Product</span>
            <span className="transition hover:text-[#111111]">Templates</span>
            <span className="transition hover:text-[#111111]">Security</span>
            <span className="transition hover:text-[#111111]">Pricing</span>
            <span className="transition hover:text-[#111111]">Docs</span>
          </div>

          <button
            onClick={() =>
              document
                .getElementById("generator")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="h-12 rounded-xl bg-[#FF6600] px-[22px] text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#E65C00]"
          >
            Start Building
          </button>
        </div>
      </nav>

      <section className="mx-auto grid min-h-[calc(100vh-72px)] max-w-[1280px] items-center gap-14 px-5 py-24 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#FF6600]">
            AI-native runtime app platform
          </p>

          <h1 className="mt-6 text-[56px] font-bold leading-[0.95] tracking-[-0.04em] text-[#111111] md:text-[72px]">
            Build operational apps at the speed of thought.
          </h1>

          <p className="mt-7 text-lg leading-[1.7] text-[#6B7280]">
            Generate secure, database-backed CRMs, HR dashboards, admin panels,
            inventory systems, analytics workspaces, and support workflows from
            a simple prompt.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() =>
                document
                  .getElementById("generator")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="h-12 rounded-xl bg-[#FF6600] px-[22px] text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#E65C00]"
            >
              Generate App
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("templates")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="h-12 rounded-xl border border-[#E5E7EB] bg-white px-[22px] text-[15px] font-semibold text-[#111111] transition hover:bg-[#FAFAFA]"
            >
              Browse Templates
            </button>
          </div>
        </div>

        <div
          id="generator"
          className="rounded-[28px] border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_24px_rgba(0,0,0,0.03)]"
        >
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
                Runtime Generator
              </p>
              <h2 className="mt-2 text-[22px] font-semibold">
                Describe your internal app
              </h2>
            </div>

            <span className="rounded-full border border-[#E5E7EB] px-3 py-1 text-xs font-medium text-[#6B7280]">
              Schema-first
            </span>
          </div>

          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Create a CRM dashboard for managing clients and deals..."
            className="h-36 w-full resize-none rounded-[18px] border border-[#E5E7EB] bg-[#FAFAFA] p-4 text-[15px] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FF6600]"
          />

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#6B7280]">
              {loading ? status : "Prompt → Template → Schema → Builder"}
            </p>

            <button
              onClick={generateApp}
              disabled={loading}
              className="h-12 rounded-xl bg-[#FF6600] px-[22px] text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#E65C00] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate App"}
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                onClick={() => setPrompt(example)}
                className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm text-[#6B7280] transition hover:border-[#D1D5DB] hover:text-[#111111]"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-[120px] md:px-8">
        <SectionHeading
          label="Runtime workflow"
          title="How OneAtlas works"
          description="Every app is generated from reusable templates, stored as a runtime schema, and remains editable after creation."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <FeatureCard
            number="01"
            title="Describe the app"
            description="Start with a prompt such as a CRM, inventory system, analytics dashboard, or support workspace."
          />

          <FeatureCard
            number="02"
            title="Instantiate schema"
            description="OneAtlas matches the closest template and creates a versioned runtime schema in the database."
          />

          <FeatureCard
            number="03"
            title="Edit conversationally"
            description="Apply targeted mutations like adding, removing, or renaming fields without regenerating the app."
          />
        </div>
      </section>

      <section
        id="templates"
        className="mx-auto max-w-[1280px] px-5 py-[120px] md:px-8"
      >
        <SectionHeading
          label="Templates"
          title="Operational templates that feel real"
          description="Reusable business systems for internal teams, dashboards, workflows, and admin operations."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:-translate-y-1 hover:border-[#D1D5DB]"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="rounded-full border border-[#E5E7EB] px-3 py-1 text-xs font-semibold text-[#6B7280]">
                  {template.category}
                </span>

                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
                  {template.complexity}
                </span>
              </div>

              <h3 className="text-[22px] font-semibold tracking-[-0.02em]">
                {template.name}
              </h3>

              <p className="mt-3 min-h-16 text-sm leading-6 text-[#6B7280]">
                {template.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {template.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#F5F5EE] px-3 py-1 text-xs text-[#6B7280]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex gap-2">
                <button
                  onClick={() => useTemplate(template.id)}
                  disabled={loading}
                  className="h-11 rounded-xl bg-[#FF6600] px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#E65C00] disabled:opacity-60"
                >
                  Use Template
                </button>

                <button
                  onClick={() =>
                    setPrompt(
                      `Create a ${template.name.toLowerCase()} with dashboards and workflow sections`
                    )
                  }
                  className="h-11 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#111111] transition hover:bg-[#FAFAFA]"
                >
                  Preview Prompt
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-[120px] md:px-8">
        <SectionHeading
          label="Pricing"
          title="Simple plans for runtime app building"
          description="Start with a lightweight runtime workflow and scale toward team-based internal operations."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <PricingCard
            name="Starter"
            price="Free"
            description="For trying runtime app generation."
            features={[
              "Generate runtime apps",
              "Use starter templates",
              "Create preview snapshots",
              "Basic schema rendering",
            ]}
          />

          <PricingCard
            name="Pro"
            price="₹999/mo"
            highlighted
            description="For builders and product teams."
            features={[
              "All operational templates",
              "Conversational editing",
              "Schema version history",
              "Undo and preview history",
            ]}
          />

          <PricingCard
            name="Enterprise"
            price="Custom"
            description="For internal operations teams."
            features={[
              "SSO-ready architecture",
              "Audit log support",
              "Advanced governance",
              "Dedicated deployment path",
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 py-[120px] md:px-8">
        <div className="grid gap-12 md:grid-cols-[280px_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#FF6600]">
              FAQ
            </p>

            <h2 className="mt-3 text-5xl font-semibold tracking-[-0.03em] text-[#111111]">
              Questions, answered.
            </h2>

            <div className="mt-8 space-y-3 text-sm font-medium text-[#6B7280]">
              <p className="text-[#111111]">General</p>
              <p>Runtime</p>
              <p>Previews</p>
              <p>Deployment</p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-8">
            <FAQ
              q="Is this using real AI?"
              a="The MVP currently uses rule-based prompt matching and deterministic mutations. The architecture is designed so an LLM layer can be added later."
            />

            <FAQ
              q="What is a runtime schema?"
              a="A runtime schema is the source of truth for the generated app. The UI is rendered from that schema instead of being hardcoded."
            />

            <FAQ
              q="Do edits regenerate the whole app?"
              a="No. Conversational edits apply targeted schema mutations such as adding, removing, or renaming fields."
            />

            <FAQ
              q="Do preview links change after edits?"
              a="No. Preview links are frozen snapshots. Later edits to the live app do not affect older preview URLs."
            />

            <FAQ
              q="What database is used?"
              a="The project uses Neon PostgreSQL with Prisma ORM for apps, schema versions, mutation logs, and preview snapshots."
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E5E7EB] px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <h3 className="font-semibold">OneAtlas Runtime</h3>
            <p className="mt-1 text-sm text-[#9CA3AF]">
              A serious AI operating system for building software.
            </p>
          </div>

          <div className="flex gap-6 text-sm text-[#6B7280]">
            <span>Docs</span>
            <span>Security</span>
            <span>Templates</span>
            <span>GitHub</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#FF6600]">
        {label}
      </p>

      <h2 className="mt-4 text-5xl font-semibold leading-none tracking-[-0.03em] text-[#111111]">
        {title}
      </h2>

      <p className="mt-5 text-lg leading-[1.7] text-[#6B7280]">
        {description}
      </p>
    </div>
  );
}

function FeatureCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#FF6600]">
        {number}
      </p>

      <h3 className="mt-5 text-[22px] font-semibold">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-[#6B7280]">{description}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  description,
  features,
  highlighted = false,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-[24px] border bg-white p-7 ${
        highlighted ? "border-[#FF6600]" : "border-[#E5E7EB]"
      }`}
    >
      <p className="text-sm font-semibold text-[#111111]">{name}</p>

      <h3 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[#111111]">
        {price}
      </h3>

      <p className="mt-4 text-sm leading-6 text-[#6B7280]">{description}</p>

      <div className="mt-7 space-y-3">
        {features.map((feature) => (
          <p key={feature} className="text-sm text-[#111111]">
            ✓ {feature}
          </p>
        ))}
      </div>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-[#ECECEC] py-6 last:border-b-0">
      <h3 className="text-lg font-semibold text-[#111111]">{q}</h3>
      <p className="mt-3 leading-7 text-[#6B7280]">{a}</p>
    </div>
  );
}