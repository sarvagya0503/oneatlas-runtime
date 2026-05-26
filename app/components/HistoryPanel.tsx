"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Mutation = {
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

  const [history, setHistory] = useState<Mutation[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadHistory() {
    try {
      const response = await fetch(
        `/api/apps/${appId}/history`
      );

      const data = await response.json();

      if (data.success) {
        setHistory(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function undoLastChange() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/apps/${appId}/undo`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!data.success) {
        alert(data.error);
        return;
      }

      router.refresh();
      loadHistory();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return (
    <div className="rounded-3xl border border-white bg-white/85 p-5 shadow-sm backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wide text-slate-400">
          Edit History
        </h2>

        <button
          onClick={undoLastChange}
          disabled={loading}
          className="rounded-xl bg-[#635BFF] px-3 py-2 text-xs font-semibold text-white"
        >
          {loading ? "Undoing..." : "Undo"}
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {history.length === 0 && (
          <p className="text-sm text-slate-500">
            No mutations yet.
          </p>
        )}

        {history.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-100 bg-[#F8FAFC] p-4"
          >
            <p className="font-semibold text-[#1A1F36]">
              {item.summary}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {item.instruction}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}