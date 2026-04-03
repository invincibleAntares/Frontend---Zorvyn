import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { monthlyHistory } from "../../data/mockData";
import Card from "../ui/Card";
import { formatCompactCurrency, formatCurrency } from "../../utils/formatters";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-100 shadow-xl rounded-xl px-4 py-3 min-w-[150px]">
      <p className="text-xs font-semibold text-slate-500 mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: p.fill }}
            />
            <span className="text-xs text-slate-500 capitalize">{p.name}</span>
          </div>
          <span className="text-xs font-bold text-slate-700">
            {formatCurrency(p.value)}
          </span>
        </div>
      ))}
      {payload.length === 2 && (
        <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between">
          <span className="text-xs text-slate-400">Net saved</span>
          <span
            className={`text-xs font-bold ${
              payload[0].value - payload[1].value >= 0
                ? "text-emerald-600"
                : "text-rose-500"
            }`}
          >
            {formatCurrency(payload[0].value - payload[1].value)}
          </span>
        </div>
      )}
    </div>
  );
}

function CustomLegend({ payload }) {
  return (
    <div className="flex items-center justify-end gap-4 mb-1">
      {payload.map((p) => (
        <div key={p.value} className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: p.color }}
          />
          <span className="text-xs text-slate-500 capitalize">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function MonthlyComparisonChart() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Monthly Comparison</h3>
          <p className="text-xs text-slate-400 mt-0.5">Income vs expenses — last 6 months</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={monthlyHistory}
          margin={{ top: 4, right: 4, left: -10, bottom: 0 }}
          barCategoryGap="30%"
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatCompactCurrency}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
          <Legend content={<CustomLegend />} />
          <Bar dataKey="income" name="income" fill="#10b981" radius={[6, 6, 0, 0]} />
          <Bar dataKey="expenses" name="expenses" fill="#f43f5e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
