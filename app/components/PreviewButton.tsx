"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  appId: string;
};

export default function PreviewButton({ appId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function generatePreview() {
    try {
      setLoading(true);

      const response = await fetch(`/api/apps/${appId}/preview`, {
        method: "POST",
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.error || "Failed to generate preview");
        return;
      }

      toast.success("Preview snapshot created");
      router.refresh();

      window.open(`/preview/${data.data.token}`, "_blank");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={generatePreview}
      disabled={loading}
      className="h-11 rounded-xl bg-[#FF6600] px-[22px] text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#E65C00] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Generating..." : "Generate Preview"}
    </button>
  );
}