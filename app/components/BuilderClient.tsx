"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

type Props = {
  appId: string;
  templateId: string;
};

const templatePrompts: Record<string, string[]> = {
  crm: [
    "Add priority field",
    "Rename company to account",
    "Remove deal value field",
    "Add follow up date field",
  ],

  inventory: [
    "Add reorder level field",
    "Rename supplier to vendor",
    "Remove sku field",
    "Add warehouse location field",
  ],

  analytics: [
    "Add forecast field",
    "Add retention field",
    "Rename owner to analyst",
    "Remove status field",
  ],

  hr: [
    "Add salary field",
    "Rename department to team",
    "Add onboarding status field",
    "Remove status field",
  ],

  admin: [
    "Add api usage field",
    "Rename role to access level",
    "Add audit logs field",
    "Remove email field",
  ],

  support: [
    "Add escalation status field",
    "Rename owner to support agent",
    "Add sla priority field",
    "Remove status field",
  ],
};

export default function BuilderClient({ appId, templateId }: Props) {
  const router = useRouter();

  const [instruction, setInstruction] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = useMemo(() => {
    return (
      templatePrompts[templateId] || [
        "Add priority field",
        "Rename name to title",
        "Remove status field",
      ]
    );
  }, [templateId]);

  async function sendInstruction(customInstruction?: string) {
    const finalInstruction = customInstruction || instruction;

    if (!finalInstruction.trim()) {
      toast.error("Please enter an instruction");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api/apps/${appId}/edit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          instruction: finalInstruction,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.error || "Could not apply mutation");
        return;
      }

      toast.success(data.data.summary || "Schema updated successfully");

      setInstruction("");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating schema");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[94%] max-w-5xl -translate-x-1/2 rounded-[28px] border border-[#E5E7EB] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_24px_rgba(0,0,0,0.03)]">
      <div className="mb-4 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => sendInstruction(suggestion)}
            disabled={loading}
            className="rounded-full border border-[#E5E7EB] bg-[#F5F5EE] px-4 py-2 text-xs font-medium text-[#6B7280] transition hover:-translate-y-0.5 hover:border-[#D1D5DB] hover:text-[#111111] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          value={instruction}
          onChange={(event) => setInstruction(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendInstruction();
            }
          }}
          placeholder="Describe how the runtime schema should evolve..."
          className="flex-1 rounded-[18px] border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 text-sm text-[#111111] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FF6600]"
        />

        <button
          onClick={() => sendInstruction()}
          disabled={loading}
          className="h-12 rounded-xl bg-[#FF6600] px-[22px] text-[15px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#E65C00] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Updating..." : "Send"}
        </button>
      </div>
    </div>
  );
}