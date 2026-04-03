import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Card from "../ui/Card";
import { useApp } from "../../context/AppContext";
import { getSpendingByCategory } from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";
import EmptyState from "../ui/EmptyState";
import { PieChartIcon } from "lucide-react";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white border border-slate-100 shadow-xl rounded-xl px-4 py-3">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: d.payload.color }}
        />
        <p className="text-xs text-slate-500">{d.name}</p>
      </div>
      <p className="text-sm font-bold text-slate-800">{formatCurrency(d.value)}</p>
      <p className="text-xs text-slate-400">{d.payload.percent}% of spend</p>
    </div>
  );
}

function CustomLegend({ payload }) {
  return (
    <ul className="flex flex-col gap-1.5 mt-2">
      {payload.slice(0, 5).map((entry) => (
        <li key={entry.value} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-slate-500 truncate">{entry.value}</span>
          </div>
          <span className="text-xs font-semibold text-slate-700">
            {formatCurrency(entry.payload.value)}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function SpendingBreakdownChart() {
  const { state } = useApp();
  const raw = getSpendingByCategory(state.transactions);
  const total = raw.reduce((s, d) => s + d.value, 0);

  const data = raw.map((d) => ({
    ...d,
    percent: total > 0 ? ((d.value / total) * 100).toFixed(1) : "0.0",
  }));

  return (
    <Card className="w-full lg:w-80 shrink-0">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-800">Spending Breakdown</h3>
        <p className="text-xs text-slate-400 mt-0.5">This month by category</p>
      </div>

      {data.length === 0 ? (
        <EmptyState
          icon={PieChartIcon}
          title="No expenses yet"
          description="Add transactions to see your spending breakdown."
        />
      ) : (
        <>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={0}>
            <PieChart>
              <Legend content={<CustomLegend />} payload={data.map(d => ({ value: d.name, color: d.color, payload: d }))} />
            </PieChart>
          </ResponsiveContainer>
          <CustomLegend payload={data.map(d => ({ value: d.name, color: d.color, payload: d }))} />
        </>
      )}
    </Card>
  );
}
