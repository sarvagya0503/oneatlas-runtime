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
      <main className="flex min-h-screen items-center justify-center bg-[#F5F5EE] px-5">
        <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-10 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#111111] text-sm font-semibold text-white">
            OA
          </div>

          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
            App not found
          </h1>

          <p className="mt-3 text-[#6B7280]">
            This generated runtime app does not exist.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex h-12 items-center rounded-xl bg-[#FF6600] px-[22px] text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#E65C00]"
          >
            Go back home
          </Link>
        </div>
      </main>
    );
  }

  const schema = app.schema as AppSchema;

  const componentCount = schema.pages.reduce(
    (total, page) => total + page.components.length,
    0
  );

  return (
    <main className="min-h-screen bg-[#F5F5EE] pb-44 text-[#111111]">
      <header className="sticky top-0 z-40 border-b border-[#E5E7EB] bg-[#F5F5EE]/95">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-5 md:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#111111] text-sm font-semibold text-white"
            >
              OA
            </Link>

            <div>
              <h1 className="text-[17px] font-semibold tracking-[-0.02em] text-[#111111]">
                {app.name}
              </h1>

              <p className="text-sm text-[#6B7280]">
                Runtime Builder · Schema v{app.version}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#6B7280] md:block">
              Connected
            </div>

            <button className="h-11 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#111111] transition hover:bg-[#FAFAFA]">
              Share
            </button>

            <PreviewButton appId={app.id} />
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1280px] gap-5 px-5 py-8 md:px-8 lg:grid-cols-[260px_1fr_340px]">
        <aside className="rounded-[24px] border border-[#E5E7EB] bg-white p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
            Component Tree
          </h2>

          <div className="mt-6 space-y-4">
            {schema.pages.map((page) => (
              <div key={page.id}>
                <div className="rounded-xl bg-[#F5F5EE] px-3 py-2 text-sm font-semibold text-[#111111]">
                  {page.name}
                </div>

                <div className="mt-2 space-y-2 pl-3">
                  {page.components.map((component) => (
                    <div
                      key={component.id}
                      className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 transition hover:border-[#D1D5DB]"
                    >
                      <div className="text-sm font-medium text-[#111111]">
                        {component.title}
                      </div>

                      <div className="mt-1 text-xs capitalize text-[#9CA3AF]">
                        {component.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="rounded-[24px] border border-[#E5E7EB] bg-white p-6">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#FF6600]">
                Runtime Canvas
              </p>

              <h2 className="mt-3 text-4xl font-semibold tracking-[-0.03em] text-[#111111]">
                Live app preview
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                Rendered from a stored runtime schema, not hardcoded UI.
              </p>
            </div>

            <span className="w-fit rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#6B7280]">
              Template: {app.templateId}
            </span>
          </div>

          <div className="space-y-6">
            {schema.pages.map((page) => (
              <div
                key={page.id}
                className="rounded-[24px] border border-[#E5E7EB] bg-[#F5F5EE] p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-[#111111]">
                      {page.name}
                    </h3>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      {page.components.length} runtime components
                    </p>
                  </div>

                  <div className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-medium text-[#6B7280]">
                    Schema page
                  </div>
                </div>

                <div className="grid gap-5">
                  {page.components.map((component) => (
                    <div
                      key={component.id}
                      className="rounded-[24px] border border-[#E5E7EB] bg-white p-5 transition hover:border-[#D1D5DB]"
                    >
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                          <h4 className="text-[22px] font-semibold tracking-[-0.02em] text-[#111111]">
                            {component.title}
                          </h4>

                          <p className="mt-1 text-sm capitalize text-[#6B7280]">
                            {component.type} component
                          </p>
                        </div>

                        <span className="rounded-full bg-[#F5F5EE] px-3 py-1 text-xs font-medium text-[#6B7280]">
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

        <div className="space-y-5">
          <aside className="rounded-[24px] border border-[#E5E7EB] bg-white p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
              Schema Summary
            </h2>

            <div className="mt-6 space-y-3">
              <SummaryCard label="Full App ID" value={app.id} />
              <SummaryCard label="Template" value={app.templateId} />
              <SummaryCard label="Version" value={`v${app.version}`} />
              <SummaryCard label="Pages" value={`${schema.pages.length}`} />
              <SummaryCard label="Components" value={`${componentCount}`} />
            </div>

            <div className="mt-6 rounded-[18px] border border-[#E5E7EB] bg-[#F5F5EE] p-4">
              <p className="text-sm font-semibold text-[#111111]">
                Conversational runtime
              </p>

              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                Suggestions adapt to the selected template. Schemas evolve
                through targeted mutations, not full rewrites.
              </p>
            </div>
          </aside>

          <HistoryPanel appId={app.id} />

          <aside className="rounded-[24px] border border-[#E5E7EB] bg-white p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
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
    <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F5F5EE] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
        {label}
      </p>

      <p className="mt-1 break-all text-sm font-semibold text-[#111111]">
        {value}
      </p>
    </div>
  );
}