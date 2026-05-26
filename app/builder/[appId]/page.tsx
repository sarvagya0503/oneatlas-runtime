import { prisma } from "@/lib/prisma";
import Link from "next/link";
import BuilderClient from "@/app/components/BuilderClient";
import HistoryPanel from "@/app/components/HistoryPanel";
import PreviewButton from "@/app/components/PreviewButton";
import RuntimeRenderer from "@/app/components/RuntimeRenderer";
import PreviewHistory from "@/app/components/PreviewHistory";

type Field = {
  id: string;
  name: string;
  type: string;
};

type Component = {
  id: string;
  type: string;
  title: string;
  fields?: Field[];
};

type AppSchema = {
  pages: {
    id: string;
    name: string;
    components: Component[];
  }[];
};

type Props = {
  params: Promise<{
    appId: string;
  }>;
};

export default async function BuilderPage({ params }: Props) {
  const { appId } = await params;

  const app = await prisma.app.findUnique({
    where: { id: appId },
    include: {
      previews: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!app) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl shadow-indigo-100">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#635BFF] text-lg font-bold text-white">
            OA
          </div>

          <h1 className="text-3xl font-bold text-[#1A1F36]">App not found</h1>

          <p className="mt-3 text-slate-500">
            This generated runtime app does not exist.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-2xl bg-[#635BFF] px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-[#5148f5]"
          >
            Go back home
          </Link>
        </div>
      </main>
    );
  }

  const schema = app.schema as AppSchema;

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-40 text-[#1A1F36]">
      <header className="sticky top-0 z-40 border-b border-white/80 bg-white/75 px-6 py-4 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#635BFF] text-sm font-bold text-white shadow-lg shadow-indigo-100"
            >
              OA
            </Link>

            <div>
              <h1 className="text-xl font-bold tracking-tight">{app.name}</h1>
              <p className="text-sm text-slate-500">
                Runtime Builder · Schema v{app.version}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 md:block">
              ● Connected
            </div>

            <button className="rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#635BFF]/40 hover:text-[#635BFF]">
              Share
            </button>

            <PreviewButton appId={app.id} />
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[260px_1fr_340px]">
        <aside className="rounded-3xl border border-white bg-white/85 p-5 shadow-sm backdrop-blur-xl">
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
            Component Tree
          </h2>

          <div className="mt-5 space-y-3">
            {schema.pages.map((page) => (
              <div key={page.id}>
                <div className="rounded-xl bg-[#F8FAFC] px-3 py-2 text-sm font-semibold text-[#1A1F36]">
                  {page.name}
                </div>

                <div className="mt-2 space-y-2 pl-3">
                  {page.components.map((component) => (
                    <div
                      key={component.id}
                      className="rounded-xl border border-slate-100 bg-white px-3 py-2 text-sm text-slate-600 transition hover:border-[#635BFF]/30 hover:text-[#635BFF]"
                    >
                      <div className="font-medium">{component.title}</div>
                      <div className="mt-1 text-xs capitalize text-slate-400">
                        {component.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="rounded-[2rem] border border-white bg-white/90 p-6 shadow-xl shadow-indigo-100/60 backdrop-blur-xl">
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold">Live App Preview</h2>
              <p className="text-sm text-slate-500">
                Rendered from runtime schema, not hardcoded UI.
              </p>
            </div>

            <span className="w-fit rounded-full bg-[#00D4B1]/10 px-4 py-2 text-sm font-semibold text-[#008f78]">
              Template: {app.templateId}
            </span>
          </div>

          <div className="space-y-6">
            {schema.pages.map((page) => (
              <div
                key={page.id}
                className="rounded-3xl border border-slate-100 bg-[#F8FAFC] p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">{page.name}</h3>
                    <p className="text-sm text-slate-500">
                      {page.components.length} runtime components
                    </p>
                  </div>

                  <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-[#635BFF] to-[#00D4FF]" />
                </div>

                <div className="grid gap-5">
                  {page.components.map((component) => (
                    <div
                      key={component.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-bold">
                            {component.title}
                          </h4>

                          <p className="text-sm capitalize text-slate-500">
                            {component.type} component
                          </p>
                        </div>

                        <span className="rounded-full bg-[#635BFF]/10 px-3 py-1 text-xs font-semibold text-[#635BFF]">
                          {component.fields?.length || 0} fields
                        </span>
                      </div>

                      <RuntimeRenderer component={component} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <aside className="rounded-3xl border border-white bg-white/85 p-5 shadow-sm backdrop-blur-xl">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Schema Summary
            </h2>

            <div className="mt-5 space-y-4">
              <SummaryCard label="Full App ID" value={app.id} />
              <SummaryCard label="Template" value={app.templateId} />
              <SummaryCard label="Version" value={`v${app.version}`} />
              <SummaryCard label="Pages" value={`${schema.pages.length}`} />
              <SummaryCard
                label="Components"
                value={`${schema.pages.reduce(
                  (total, page) => total + page.components.length,
                  0
                )}`}
              />
            </div>

            <div className="mt-6 rounded-2xl bg-[#0A2540] p-4 text-white">
              <p className="text-sm font-semibold">Conversational Runtime</p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Suggestions adapt to the selected template. Schemas evolve
                through targeted mutations, not full rewrites.
              </p>
            </div>
          </aside>

          <HistoryPanel appId={app.id} />

          <aside className="rounded-3xl border border-white bg-white/85 p-5 shadow-sm backdrop-blur-xl">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
              Preview Links
            </h2>

            <div className="mt-5">
              <PreviewHistory
                previews={app.previews.map((preview) => ({
                  id: preview.token,
                  createdAt: preview.createdAt,
                }))}
              />
            </div>
          </aside>
        </div>
      </section>

      <BuilderClient appId={app.id} templateId={app.templateId} />
    </main>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-all font-semibold text-[#1A1F36]">{value}</p>
    </div>
  );
}