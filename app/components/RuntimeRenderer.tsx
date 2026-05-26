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

type Props = {
  component: Component;
};

export default function RuntimeRenderer({
  component,
}: Props) {
  switch (component.type) {
    case "metrics":
      return <MetricsRenderer component={component} />;

    case "table":
      return <TableRenderer component={component} />;

    case "kanban":
      return <KanbanRenderer component={component} />;

    case "activity":
      return <ActivityRenderer component={component} />;

    case "alerts":
      return <AlertRenderer component={component} />;

    case "chart":
      return <ChartRenderer component={component} />;

    default:
      return <DefaultRenderer component={component} />;
  }
}

function MetricsRenderer({
  component,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {component.fields?.map((field, index) => (
        <div
          key={field.id}
          className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-slate-500">
            {field.name}
          </p>

          <h3 className="mt-3 text-3xl font-bold">
            {index === 0
              ? "12.4K"
              : index === 1
              ? "842"
              : index === 2
              ? "$48K"
              : "89%"}
          </h3>

          <p className="mt-2 text-xs font-semibold text-emerald-600">
            +12.4% this month
          </p>
        </div>
      ))}
    </div>
  );
}

function TableRenderer({
  component,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <table className="w-full border-collapse">
        <thead className="bg-[#F8FAFC]">
          <tr>
            {component.fields?.map((field) => (
              <th
                key={field.id}
                className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-600"
              >
                {field.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4].map((row) => (
            <tr
              key={row}
              className="border-b border-slate-100 last:border-0"
            >
              {component.fields?.map((field) => (
                <td
                  key={field.id}
                  className="px-4 py-3 text-sm text-slate-600"
                >
                  {field.type === "email"
                    ? "client@example.com"
                    : field.type === "currency"
                    ? "$12,400"
                    : field.type === "select"
                    ? "Active"
                    : "Sample Data"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KanbanRenderer({
  component,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {component.fields?.map((field) => (
        <div
          key={field.id}
          className="rounded-2xl bg-[#F8FAFC] p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">{field.name}</h3>

            <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-slate-500 shadow-sm">
              4
            </span>
          </div>

          <div className="space-y-3">
            {[1, 2].map((card) => (
              <div
                key={card}
                className="rounded-xl bg-white p-4 shadow-sm"
              >
                <p className="font-medium">
                  Enterprise Account
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Revenue opportunity pipeline
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivityRenderer({
  component,
}: Props) {
  return (
    <div className="space-y-3">
      {component.fields?.map((field) => (
        <div
          key={field.id}
          className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4"
        >
          <div className="mt-1 h-3 w-3 rounded-full bg-[#635BFF]" />

          <div>
            <p className="font-semibold">{field.name}</p>

            <p className="mt-1 text-sm text-slate-500">
              Activity completed successfully.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function AlertRenderer({
  component,
}: Props) {
  return (
    <div className="space-y-3">
      {component.fields?.map((field) => (
        <div
          key={field.id}
          className="rounded-2xl border border-amber-200 bg-amber-50 p-4"
        >
          <p className="font-semibold text-amber-800">
            {field.name}
          </p>

          <p className="mt-1 text-sm text-amber-700">
            Attention required for this workflow.
          </p>
        </div>
      ))}
    </div>
  );
}

function ChartRenderer({
  component,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-bold">{component.title}</h3>

          <p className="text-sm text-slate-500">
            Runtime analytics visualization
          </p>
        </div>

        <div className="rounded-full bg-[#635BFF]/10 px-3 py-1 text-xs font-semibold text-[#635BFF]">
          Live
        </div>
      </div>

      <div className="flex h-64 items-end gap-4">
        {[45, 65, 30, 80, 50, 90, 70].map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-2xl bg-gradient-to-t from-[#635BFF] to-[#00D4FF]"
            style={{
              height: `${height}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DefaultRenderer({
  component,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="font-bold">{component.title}</h3>

      <div className="mt-4 space-y-2">
        {component.fields?.map((field) => (
          <div
            key={field.id}
            className="rounded-xl bg-[#F8FAFC] px-4 py-3"
          >
            {field.name}
          </div>
        ))}
      </div>
    </div>
  );
}