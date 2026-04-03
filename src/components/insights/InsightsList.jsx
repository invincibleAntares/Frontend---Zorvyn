import {
  Flame,
  TrendingUp,
  TrendingDown,
  Minus,
  Trophy,
  Receipt,
  PiggyBank,
} from "lucide-react";
import InsightCard from "./InsightCard";
import { useApp } from "../../context/AppContext";
import { monthlyHistory } from "../../data/mockData";
import {
  getHighestSpendingCategory,
  getTopTransactions,
  getBestSavingsMonth,
  getIncomeExpenseTrend,
  getSavingsRate,
  getCurrentMonthTotals,
} from "../../utils/calculations";
import { formatCurrency } from "../../utils/formatters";

export default function InsightsList() {
  const { state } = useApp();
  const txs = state.transactions;

  const topCategory = getHighestSpendingCategory(txs);
  const topTxs = getTopTransactions(txs, 3);
  const bestMonth = getBestSavingsMonth(monthlyHistory);
  const trend = getIncomeExpenseTrend(monthlyHistory);
  const current = getCurrentMonthTotals(txs);
  const savingsRate = getSavingsRate(current.income, current.expenses);

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendAccent = trend === "up" ? "emerald" : trend === "down" ? "rose" : "amber";
  const trendTag = trend === "up" ? "Improving" : trend === "down" ? "Declining" : "Stable";

  const insights = [
    {
      icon: Flame,
      title: "Top Spending Category",
      value: topCategory ? topCategory.name : "—",
      description: topCategory
        ? `You spent ${formatCurrency(topCategory.value)} on ${topCategory.name} this month — your largest expense category.`
        : "No expense data available for this month.",
      accent: "rose",
      tag: "This Month",
    },
    {
      icon: TrendIcon,
      title: "Income vs Expense Trend",
      value: trend === "up" ? "Net savings up" : trend === "down" ? "Net savings down" : "Stable",
      description:
        trend === "up"
          ? "Your net savings improved compared to last month. Keep it up!"
          : trend === "down"
          ? "Your net savings declined vs last month. Consider reducing discretionary spend."
          : "Your spending pattern is consistent with last month.",
      accent: trendAccent,
      tag: trendTag,
    },
    {
      icon: Trophy,
      title: "Best Savings Month",
      value: bestMonth ? bestMonth.month : "—",
      description: bestMonth
        ? `You saved ${formatCurrency(bestMonth.income - bestMonth.expenses)} in ${bestMonth.month} — your best performing month.`
        : "Not enough data yet.",
      accent: "amber",
      tag: "All Time",
    },
    {
      icon: PiggyBank,
      title: "Current Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      description:
        savingsRate >= 20
          ? `Excellent! Saving ${savingsRate.toFixed(1)}% of income this month is above the recommended 20% threshold.`
          : `You're saving ${savingsRate.toFixed(1)}% of your income. Aim for 20%+ for financial health.`,
      accent: savingsRate >= 20 ? "emerald" : "violet",
      tag: "This Month",
    },
    {
      icon: Receipt,
      title: "Largest Expense",
      value: topTxs[0] ? formatCurrency(topTxs[0].amount) : "—",
      description: topTxs[0]
        ? `"${topTxs[0].description}" on ${new Date(topTxs[0].date).toLocaleDateString("en-US", { month: "short", day: "numeric" })} was your single biggest transaction.`
        : "No expense transactions found.",
      accent: "cyan",
      tag: topTxs[0]?.category || "Expense",
    },
    {
      icon: TrendingUp,
      title: "6-Month Net Saved",
      value: formatCurrency(
        monthlyHistory.reduce((s, m) => s + m.income - m.expenses, 0)
      ),
      description: `Total net savings across the last 6 months. Consistently positive cashflow builds your long-term balance.`,
      accent: "violet",
      tag: "6 Months",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {insights.map((ins) => (
        <InsightCard key={ins.title} {...ins} />
      ))}
    </div>
  );
}
