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

export default function RuntimeRenderer({ component }: Props) {
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

function MetricsRenderer({ component }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {component.fields?.map((field, index) => (
        <div
          key={field.id}
          className="rounded-[18px] border border-[#E5E7EB] bg-white p-5"
        >
          <p className="text-sm text-[#6B7280]">{field.name}</p>

          <h3 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[#111111]">
            {index === 0
              ? "12.4K"
              : index === 1
              ? "842"
              : index === 2
              ? "$48K"
              : "89%"}
          </h3>

          <p className="mt-2 text-xs font-medium text-[#FF6600]">
            +12.4% this month
          </p>
        </div>
      ))}
    </div>
  );
}

function TableRenderer({ component }: Props) {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[#E5E7EB] bg-white">
      <table className="w-full border-collapse">
        <thead className="bg-[#F5F5EE]">
          <tr>
            {component.fields?.map((field) => (
              <th
                key={field.id}
                className="border-b border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#6B7280]"
              >
                {field.name}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4].map((row) => (
            <tr key={row} className="border-b border-[#ECECEC] last:border-0">
              {component.fields?.map((field) => (
                <td key={field.id} className="px-4 py-3 text-sm text-[#111111]">
                  {getSampleValue(field.type)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KanbanRenderer({ component }: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {component.fields?.map((field) => (
        <div
          key={field.id}
          className="rounded-[18px] border border-[#E5E7EB] bg-[#F5F5EE] p-4"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#111111]">
              {field.name}
            </h3>

            <span className="rounded-full border border-[#E5E7EB] bg-white px-2 py-1 text-xs font-medium text-[#6B7280]">
              4
            </span>
          </div>

          <div className="space-y-3">
            {[1, 2].map((card) => (
              <div
                key={card}
                className="rounded-xl border border-[#E5E7EB] bg-white p-4"
              >
                <p className="text-sm font-semibold text-[#111111]">
                  Runtime Item
                </p>

                <p className="mt-2 text-xs leading-5 text-[#6B7280]">
                  Schema-driven workflow card
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivityRenderer({ component }: Props) {
  return (
    <div className="space-y-3">
      {component.fields?.map((field) => (
        <div
          key={field.id}
          className="flex items-start gap-4 rounded-[18px] border border-[#E5E7EB] bg-white p-4"
        >
          <div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#FF6600]" />

          <div>
            <p className="text-sm font-semibold text-[#111111]">
              {field.name}
            </p>

            <p className="mt-1 text-sm text-[#6B7280]">
              Runtime activity recorded successfully.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function AlertRenderer({ component }: Props) {
  return (
    <div className="space-y-3">
      {component.fields?.map((field) => (
        <div
          key={field.id}
          className="rounded-[18px] border border-[#E5E7EB] bg-white p-4"
        >
          <div className="mb-2 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF6600]" />

            <p className="text-sm font-semibold text-[#111111]">
              {field.name}
            </p>
          </div>

          <p className="text-sm leading-6 text-[#6B7280]">
            Attention required for this operational workflow.
          </p>
        </div>
      ))}
    </div>
  );
}

function ChartRenderer({ component }: Props) {
  return (
    <div className="rounded-[18px] border border-[#E5E7EB] bg-white p-5">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[#111111]">
            {component.title}
          </h3>

          <p className="mt-1 text-sm text-[#6B7280]">
            Runtime analytics visualization
          </p>
        </div>

        <div className="rounded-full border border-[#E5E7EB] bg-[#F5F5EE] px-3 py-1 text-xs font-medium text-[#6B7280]">
          Live
        </div>
      </div>

      <div className="flex h-64 items-end gap-4">
        {[45, 65, 30, 80, 50, 90, 70].map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-xl bg-[#111111]"
            style={{
              height: `${height}%`,
              opacity: 0.2 + index * 0.08,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DefaultRenderer({ component }: Props) {
  return (
    <div className="rounded-[18px] border border-[#E5E7EB] bg-white p-5">
      <h3 className="text-sm font-semibold text-[#111111]">
        {component.title}
      </h3>

      <div className="mt-4 space-y-2">
        {component.fields?.map((field) => (
          <div
            key={field.id}
            className="rounded-xl border border-[#E5E7EB] bg-[#F5F5EE] px-4 py-3 text-sm text-[#111111]"
          >
            {field.name}
          </div>
        ))}
      </div>
    </div>
  );
}

function getSampleValue(type: string) {
  if (type === "email") return "client@example.com";
  if (type === "currency") return "$12,400";
  if (type === "select") return "Active";
  if (type === "number") return "124";
  if (type === "date") return "26 May 2026";
  if (type === "percentage") return "89%";
  return "Sample data";
}