"use client";

import { toast } from "sonner";

type Preview = {
  id: string;
  createdAt: Date | string;
};

type Props = {
  previews: Preview[];
};

function formatDate(value: Date | string) {
  return new Date(value).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function PreviewHistory({ previews }: Props) {
  async function copyPreview(id: string) {
    try {
      const url = `${window.location.origin}/preview/${id}`;

      await navigator.clipboard.writeText(url);

      toast.success("Preview link copied");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy preview link");
    }
  }

  if (!previews.length) {
    return (
      <div className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4 text-sm text-slate-500">
        No previews generated yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {previews.map((preview) => (
        <div
          key={preview.id}
          className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#1A1F36]">
                Preview Snapshot
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {formatDate(preview.createdAt)}
              </p>
            </div>

            <div className="flex gap-2">
              <a
                href={`/preview/${preview.id}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-[#635BFF]/40 hover:text-[#635BFF]"
              >
                Open
              </a>

              <button
                onClick={() => copyPreview(preview.id)}
                className="rounded-xl bg-[#635BFF] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#5148f5]"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}