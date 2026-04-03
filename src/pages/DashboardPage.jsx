import SummaryCards from "../components/dashboard/SummaryCards";
import BalanceTrendChart from "../components/charts/BalanceTrendChart";
import SpendingBreakdownChart from "../components/charts/SpendingBreakdownChart";
import { useApp } from "../context/AppContext";
import { useTransactions } from "../hooks/useTransactions";
import { formatCurrency, formatDate } from "../utils/formatters";
import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import { ArrowDownLeft, ArrowUpRight, Clock } from "lucide-react";

function RecentTransactions() {
  const { allTransactions } = useTransactions();
  const recent = allTransactions.slice(0, 5);

  return (
    <Card padding={false} className="flex-1">
      <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-50">
        <div>
          <h3 className="text-sm font-semibold text-slate-800">Recent Transactions</h3>
          <p className="text-xs text-slate-400 mt-0.5">Latest activity</p>
        </div>
        <Clock size={15} className="text-slate-400" />
      </div>
      <ul className="divide-y divide-slate-50">
        {recent.map((tx) => (
          <li key={tx.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50/60 transition-colors">
            <div
              className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0
                ${tx.type === "income" ? "bg-emerald-50" : "bg-rose-50"}`}
            >
              {tx.type === "income" ? (
                <ArrowDownLeft size={16} className="text-emerald-600" />
              ) : (
                <ArrowUpRight size={16} className="text-rose-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{tx.description}</p>
              <p className="text-xs text-slate-400">{formatDate(tx.date)}</p>
            </div>
            <div className="text-right shrink-0">
              <p
                className={`text-sm font-semibold ${
                  tx.type === "income" ? "text-emerald-600" : "text-slate-700"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}
                {formatCurrency(tx.amount)}
              </p>
              <Badge variant={tx.type} className="mt-0.5">
                {tx.category}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function DashboardPage() {
  const { state } = useApp();
  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Welcome banner */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {greeting} 👋
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
        {state.role === "admin" && (
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Admin Mode Active
          </span>
        )}
      </div>

      {/* Summary cards */}
      <SummaryCards />

      {/* Charts row */}
      <div className="flex flex-col lg:flex-row gap-4">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>

      {/* Recent transactions */}
      <RecentTransactions />
    </div>
  );
}
