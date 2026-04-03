import { Wallet, ArrowDownLeft, ArrowUpRight, PiggyBank } from "lucide-react";
import SummaryCard from "./SummaryCard";
import { useApp } from "../../context/AppContext";
import { balanceTrend } from "../../data/mockData";
import {
  getCurrentMonthTotals,
  getPreviousMonthTotals,
  getDeltaPercent,
  getTotalBalance,
  getSavingsRate,
} from "../../utils/calculations";

export default function SummaryCards() {
  const { state } = useApp();
  const current = getCurrentMonthTotals(state.transactions);
  const previous = getPreviousMonthTotals(state.transactions);
  const totalBalance = getTotalBalance(balanceTrend);
  const savingsRate = getSavingsRate(current.income, current.expenses);
  const prevSavingsRate = getSavingsRate(previous.income, previous.expenses);

  const cards = [
    {
      title: "Total Balance",
      value: totalBalance,
      delta: getDeltaPercent(current.net, previous.net),
      icon: Wallet,
      accent: "violet",
    },
    {
      title: "Monthly Income",
      value: current.income,
      delta: getDeltaPercent(current.income, previous.income),
      icon: ArrowDownLeft,
      accent: "emerald",
    },
    {
      title: "Monthly Expenses",
      value: current.expenses,
      delta: getDeltaPercent(current.expenses, previous.expenses),
      icon: ArrowUpRight,
      accent: "rose",
    },
    {
      title: "Savings Rate",
      value: savingsRate.toFixed(1),
      delta: getDeltaPercent(savingsRate, prevSavingsRate),
      icon: PiggyBank,
      accent: "amber",
      isCurrency: false,
      suffix: "%",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <SummaryCard key={card.title} {...card} />
      ))}
    </div>
  );
}
