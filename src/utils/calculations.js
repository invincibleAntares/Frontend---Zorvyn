import { CATEGORY_COLORS } from "../data/mockData";

export function getCurrentMonthTotals(transactions) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const current = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const income = current
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = current
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return { income, expenses, net: income - expenses };
}

export function getPreviousMonthTotals(transactions) {
  const now = new Date();
  const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
  const prevYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

  const prev = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === prevMonth && d.getFullYear() === prevYear;
  });

  const income = prev
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = prev
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return { income, expenses, net: income - expenses };
}

export function getDeltaPercent(current, previous) {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function getTotalBalance(balanceTrend) {
  if (!balanceTrend || balanceTrend.length === 0) return 0;
  return balanceTrend[balanceTrend.length - 1].balance;
}

export function getSavingsRate(income, expenses) {
  if (income === 0) return 0;
  return ((income - expenses) / income) * 100;
}

export function getSpendingByCategory(transactions) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const expenses = transactions.filter((t) => {
    const d = new Date(t.date);
    return (
      t.type === "expense" &&
      d.getMonth() === currentMonth &&
      d.getFullYear() === currentYear
    );
  });

  const map = {};
  expenses.forEach((t) => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });

  return Object.entries(map)
    .map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
      color: CATEGORY_COLORS[name] || "#94a3b8",
    }))
    .sort((a, b) => b.value - a.value);
}

export function getHighestSpendingCategory(transactions) {
  const breakdown = getSpendingByCategory(transactions);
  return breakdown[0] || null;
}

export function getTopTransactions(transactions, n = 3) {
  return [...transactions]
    .filter((t) => t.type === "expense")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, n);
}

export function getBestSavingsMonth(monthlyHistory) {
  if (!monthlyHistory || monthlyHistory.length === 0) return null;
  return [...monthlyHistory].sort((a, b) => {
    const rateA = a.income > 0 ? (a.income - a.expenses) / a.income : 0;
    const rateB = b.income > 0 ? (b.income - b.expenses) / b.income : 0;
    return rateB - rateA;
  })[0];
}

export function getIncomeExpenseTrend(monthlyHistory) {
  if (!monthlyHistory || monthlyHistory.length < 2) return "stable";
  const last = monthlyHistory[monthlyHistory.length - 1];
  const prev = monthlyHistory[monthlyHistory.length - 2];
  const lastNet = last.income - last.expenses;
  const prevNet = prev.income - prev.expenses;
  if (lastNet > prevNet) return "up";
  if (lastNet < prevNet) return "down";
  return "stable";
}
