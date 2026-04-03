import MonthlyComparisonChart from "../components/charts/MonthlyComparisonChart";
import InsightsList from "../components/insights/InsightsList";
import { useApp } from "../context/AppContext";
import { useTransactions } from "../hooks/useTransactions";
import { monthlyHistory } from "../data/mockData";
import { formatCurrency } from "../utils/formatters";
import Card from "../components/ui/Card";
import { ArrowDownLeft, ArrowUpRight, Wallet } from "lucide-react";

function MonthlySummaryRow() {
  const last = monthlyHistory[monthlyHistory.length - 1];
  const prev = monthlyHistory[monthlyHistory.length - 2];

  const stats = [
    {
      label: "Income this month",
      value: formatCurrency(last.income),
      delta: last.income - prev.income,
      icon: ArrowDownLeft,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      label: "Expenses this month",
      value: formatCurrency(last.expenses),
      delta: prev.expenses - last.expenses,
      icon: ArrowUpRight,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
    },
    {
      label: "Net saved this month",
      value: formatCurrency(last.income - last.expenses),
      delta: (last.income - last.expenses) - (prev.income - prev.expenses),
      icon: Wallet,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((s) => (
        <Card key={s.label} className="flex items-center gap-4">
          <div className={`flex items-center justify-center w-11 h-11 rounded-2xl shrink-0 ${s.iconBg}`}>
            <s.icon size={20} className={s.iconColor} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">{s.label}</p>
            <p className="text-lg font-bold text-slate-800">{s.value}</p>
            <p className={`text-xs font-medium mt-0.5 ${s.delta >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
              {s.delta >= 0 ? "+" : ""}
              {formatCurrency(s.delta)} vs last month
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

function TopSpendingList() {
  const { allTransactions } = useTransactions();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const categoryTotals = allTransactions
    .filter((t) => {
      const d = new Date(t.date);
      return (
        t.type === "expense" &&
        d.getMonth() === currentMonth &&
        d.getFullYear() === currentYear
      );
    })
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const sorted = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxVal = sorted[0]?.[1] || 1;

  const colors = [
    "bg-violet-500",
    "bg-emerald-500",
    "bg-amber-400",
    "bg-cyan-500",
    "bg-rose-400",
  ];

  return (
    <Card>
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-slate-800">Top Spending Categories</h3>
        <p className="text-xs text-slate-400 mt-0.5">This month's breakdown</p>
      </div>
      {sorted.length === 0 ? (
        <p className="text-sm text-slate-400 py-6 text-center">No expense data for this month.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {sorted.map(([cat, amt], i) => (
            <li key={cat}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${colors[i]}`} />
                  <span className="text-sm font-medium text-slate-700">{cat}</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">{formatCurrency(amt)}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${colors[i]} transition-all duration-700`}
                  style={{ width: `${(amt / maxVal) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Monthly stat row */}
      <MonthlySummaryRow />

      {/* Bar chart */}
      <MonthlyComparisonChart />

      {/* Two-column: insight cards + top spending */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-800">Key Insights</h3>
            <p className="text-xs text-slate-400 mt-0.5">Auto-derived from your transaction history</p>
          </div>
          <InsightsList />
        </div>
        <div className="w-full xl:w-72 shrink-0">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-slate-800">Spending Bar</h3>
            <p className="text-xs text-slate-400 mt-0.5">Relative category spend</p>
          </div>
          <TopSpendingList />
        </div>
      </div>
    </div>
  );
}
