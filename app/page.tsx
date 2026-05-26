"use client";

import { templates } from "@/lib/templates";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
    <main className="min-h-screen bg-[#F8FAFC] text-[#1A1F36]">
      <nav className="fixed left-1/2 top-4 z-50 w-[92%] max-w-7xl -translate-x-1/2 rounded-2xl border border-white/70 bg-white/75 px-5 py-3 shadow-sm backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#635BFF] text-sm font-bold text-white shadow-lg shadow-indigo-200">
              OA
            </div>

            <span className="text-lg font-bold tracking-tight">OneAtlas</span>
          </div>

          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <span>Product</span>
            <span>Templates</span>
            <span>Security</span>
            <span>Pricing</span>
            <span>Docs</span>
          </div>

          <button
            onClick={() =>
              document
                .getElementById("generator")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-xl bg-[#0A2540] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Start Building
          </button>
        </div>
      </nav>

      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center overflow-hidden px-6 pt-28">
        <div className="absolute left-10 top-40 h-72 w-72 rounded-full bg-[#635BFF]/10 blur-3xl" />
        <div className="absolute right-10 top-56 h-72 w-72 rounded-full bg-[#00D4FF]/20 blur-3xl" />

        <div className="relative mb-6 rounded-full border border-[#635BFF]/20 bg-white px-4 py-2 text-sm font-medium text-[#635BFF] shadow-sm">
          AI-native runtime app platform
        </div>

        <h1 className="relative max-w-5xl text-center text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Build operational apps at the speed of thought.
        </h1>

        <p className="relative mt-6 max-w-3xl text-center text-lg leading-8 text-slate-600">
          Generate secure, database-backed CRMs, HR dashboards, admin panels,
          inventory systems, and analytics workspaces from a simple prompt.
        </p>

        <div
          id="generator"
          className="relative mt-10 w-full max-w-3xl rounded-[2rem] border border-white bg-white/90 p-4 shadow-2xl shadow-indigo-100 backdrop-blur-xl"
        >
          <div className="rounded-[1.5rem] border border-slate-100 bg-[#F8FAFC] p-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the internal app you want to generate..."
              className="h-32 w-full resize-none bg-transparent p-2 text-base outline-none placeholder:text-slate-400"
            />

            <div className="mt-4 flex flex-col gap-3 border-t border-slate-200 pt-4 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-slate-500">
                {loading ? status : "Prompt → Template → Schema → Builder"}
              </div>

              <button
                onClick={generateApp}
                disabled={loading}
                className="rounded-2xl bg-[#635BFF] px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-[#5148f5] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Generating..." : "Generate App"}
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example}
                onClick={() => setPrompt(example)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:border-[#635BFF]/40 hover:text-[#635BFF]"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          label="Runtime workflow"
          title="How OneAtlas works"
          description="Every app is generated from templates, saved as a runtime schema, and remains editable after creation."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <FeatureCard
            number="01"
            title="Describe the app"
            description="Start with a prompt such as a CRM, inventory system, or analytics dashboard."
          />

          <FeatureCard
            number="02"
            title="Instantiate schema"
            description="OneAtlas matches the closest template and creates a versioned runtime schema."
          />

          <FeatureCard
            number="03"
            title="Edit conversationally"
            description="Mutate the schema with instructions like add fields, rename fields, or undo changes."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeading
          label="Templates"
          title="Operational templates that feel real"
          description="Reusable business systems for internal teams, dashboards, workflows, and admin operations."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="rounded-3xl border border-white bg-white/85 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100"
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#635BFF] to-[#00D4FF]" />

                <span className="rounded-full bg-[#635BFF]/10 px-3 py-1 text-xs font-semibold text-[#635BFF]">
                  {template.complexity}
                </span>
              </div>

              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full bg-[#00D4B1]/10 px-3 py-1 text-xs font-semibold text-[#008f78]">
                  {template.category}
                </span>
              </div>

              <h3 className="text-xl font-bold">{template.name}</h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {template.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {template.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-[#F8FAFC] px-3 py-1 text-xs text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => useTemplate(template.id)}
                  disabled={loading}
                  className="rounded-xl bg-[#0A2540] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Use Template
                </button>

                <button
                  onClick={() =>
                    setPrompt(
                      `Create a ${template.name.toLowerCase()} with dashboards and workflow sections`
                    )
                  }
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#635BFF]/40 hover:text-[#635BFF]"
                >
                  Preview Prompt
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
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
    <div className="max-w-2xl">
      <p className="text-sm font-semibold text-[#635BFF]">{label}</p>
      <h2 className="mt-3 text-4xl font-bold tracking-tight">{title}</h2>
      <p className="mt-4 leading-7 text-slate-600">{description}</p>
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
    <div className="rounded-3xl border border-white bg-white/85 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-100">
      <p className="text-sm font-bold text-[#635BFF]">{number}</p>
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}