"use client";

import { useState } from "react";
import { toast } from "sonner";

type Props = {
  appId: string;
};

export default function PreviewButton({ appId }: Props) {
  const [loading, setLoading] = useState(false);

  async function generatePreview() {
    try {
      setLoading(true);

      const response = await fetch(`/api/apps/${appId}/preview`, {
        method: "POST",
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.error || "Failed to create preview");
        return;
      }

      const fullUrl = `${window.location.origin}${data.data.previewUrl}`;

      await navigator.clipboard.writeText(fullUrl);

      toast.success("Preview link copied to clipboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate preview");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={generatePreview}
      disabled={loading}
      className="rounded-2xl bg-[#635BFF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:-translate-y-0.5 hover:bg-[#5148f5] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Generating..." : "Preview"}
    </button>
  );
}