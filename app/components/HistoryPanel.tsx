"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type HistoryItem = {
  id: string;
  instruction: string;
  summary: string;
  createdAt: string;
};

type Props = {
  appId: string;
};

export default function HistoryPanel({ appId }: Props) {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [undoing, setUndoing] = useState(false);

  async function fetchHistory() {
    try {
      const response = await fetch(`/api/apps/${appId}/history`);
      const data = await response.json();

      if (data.success) {
        setHistory(data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load history");
    } finally {
      setLoading(false);
    }
  }

  async function undoLastChange() {
    try {
      setUndoing(true);

      const response = await fetch(`/api/apps/${appId}/undo`, {
        method: "POST",
      });

      const data = await response.json();

      if (!data.success) {
        toast.error(data.error || "Nothing to undo");
        return;
      }

      toast.success("Reverted to previous schema version");
      await fetchHistory();
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Undo failed");
    } finally {
      setUndoing(false);
    }
  }

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <aside className="rounded-[24px] border border-[#E5E7EB] bg-white p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#9CA3AF]">
            Mutation History
          </p>

          <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.02em] text-[#111111]">
            Runtime changes
          </h2>
        </div>

        <button
          onClick={undoLastChange}
          disabled={undoing}
          className="h-10 rounded-xl bg-[#FF6600] px-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#E65C00] disabled:opacity-60"
        >
          {undoing ? "Undoing..." : "Undo"}
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-[18px] border border-[#E5E7EB] bg-[#F5F5EE]"
            />
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="rounded-[18px] border border-[#E5E7EB] bg-[#F5F5EE] p-4 text-sm text-[#6B7280]">
          No schema mutations yet.
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-[18px] border border-[#E5E7EB] bg-[#F5F5EE] p-4"
            >
              <p className="text-sm font-semibold text-[#111111]">
                {item.summary}
              </p>

              <p className="mt-1 text-xs text-[#6B7280]">
                {item.instruction}
              </p>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}