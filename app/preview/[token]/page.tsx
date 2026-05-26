import Link from "next/link";
import { prisma } from "@/lib/prisma";
import RuntimeRenderer from "@/app/components/RuntimeRenderer";

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
    token: string;
  }>;
};

export default async function PreviewPage({ params }: Props) {
  const { token } = await params;

  const preview = await prisma.previewSnapshot.findUnique({
    where: {
      token,
    },
  });

  const isExpired =
    preview?.expiresAt ? new Date(preview.expiresAt) < new Date() : false;

  if (!preview || isExpired) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F5EE] px-5">
        <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-10 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#111111] text-sm font-semibold text-white">
            OA
          </div>

          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
            Preview unavailable
          </h1>

          <p className="mt-3 text-[#6B7280]">
            This preview snapshot is invalid or has expired.
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

  const schema = preview.schema as AppSchema;

  const componentCount = schema.pages.reduce(
    (total, page) => total + page.components.length,
    0
  );

  return (
    <main className="min-h-screen bg-[#F5F5EE] text-[#111111]">
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
                Preview Snapshot
              </h1>

              <p className="text-sm text-[#6B7280]">
                Immutable runtime preview
              </p>
            </div>
          </div>

          <div className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-medium text-[#6B7280]">
            {componentCount} components
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1280px] px-5 py-8 md:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#FF6600]">
              Runtime Preview
            </p>

            <h2 className="mt-3 text-5xl font-semibold tracking-[-0.03em] text-[#111111]">
              Shared snapshot
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-[1.7] text-[#6B7280]">
              This preview represents a frozen runtime schema snapshot.
              Future mutations do not affect this version.
            </p>
          </div>

          <div className="rounded-[18px] border border-[#E5E7EB] bg-white px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
              Generated
            </p>

            <p className="mt-1 text-sm font-medium text-[#111111]">
              {new Date(preview.createdAt).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {schema.pages.map((page) => (
            <div
              key={page.id}
              className="rounded-[24px] border border-[#E5E7EB] bg-white p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-[#111111]">
                    {page.name}
                  </h3>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    {page.components.length} runtime components
                  </p>
                </div>

                <div className="rounded-full border border-[#E5E7EB] bg-[#F5F5EE] px-3 py-1 text-xs font-medium text-[#6B7280]">
                  Runtime page
                </div>
              </div>

              <div className="grid gap-5">
                {page.components.map((component) => (
                  <div
                    key={component.id}
                    className="rounded-[24px] border border-[#E5E7EB] bg-[#F5F5EE] p-5"
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

                      <span className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-xs font-medium text-[#6B7280]">
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
    </main>
  );
}