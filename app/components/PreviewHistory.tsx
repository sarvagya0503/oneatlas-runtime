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
      <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F5F5EE] p-4 text-sm text-[#6B7280]">
        No previews generated yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {previews.map((preview) => (
        <div
          key={preview.id}
          className="rounded-[18px] border border-[#E5E7EB] bg-[#F5F5EE] p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[#111111]">
                Preview Snapshot
              </p>

              <p className="mt-1 text-xs text-[#9CA3AF]">
                {formatDate(preview.createdAt)}
              </p>
            </div>

            <div className="flex gap-2">
              <a
                href={`/preview/${preview.id}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-medium text-[#111111] transition hover:bg-[#FAFAFA]"
              >
                Open
              </a>

              <button
                onClick={() => copyPreview(preview.id)}
                className="rounded-xl bg-[#FF6600] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#E65C00]"
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