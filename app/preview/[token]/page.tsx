import { prisma } from "@/lib/prisma";
import Link from "next/link";

type Field = {
  id: string;
  name: string;
  type: string;
};

type Component = {
  id: string;
  title: string;
  type: string;
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
    where: { token },
  });

  if (!preview) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F8FAFC] px-6">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-[#1A1F36]">
            Preview not found
          </h1>

          <p className="mt-3 text-slate-500">
            This preview URL is invalid or expired.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-2xl bg-[#635BFF] px-6 py-3 font-semibold text-white"
          >
            Go Home
          </Link>
        </div>
      </main>
    );
  }

  const schema = preview.schema as AppSchema;

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-8 text-[#1A1F36]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">
                Shared Runtime Preview
              </h1>

              <p className="mt-2 text-slate-500">
                Frozen schema snapshot
              </p>
            </div>

            <div className="rounded-full bg-[#635BFF]/10 px-4 py-2 text-sm font-semibold text-[#635BFF]">
              Preview Mode
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {schema.pages.map((page) => (
            <div
              key={page.id}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-5 text-2xl font-bold">
                {page.name}
              </h2>

              <div className="grid gap-4">
                {page.components.map((component) => (
                  <div
                    key={component.id}
                    className="rounded-2xl border border-slate-200 p-5"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold">
                          {component.title}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {component.type}
                        </p>
                      </div>

                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                        {component.fields?.length || 0} fields
                      </span>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-100">
                      {component.fields?.map((field) => (
                        <div
                          key={field.id}
                          className="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0"
                        >
                          <span>{field.name}</span>

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {field.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}