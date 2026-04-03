import { useState } from "react";
import { Plus, Download } from "lucide-react";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionTable from "../components/transactions/TransactionTable";
import AddTransactionModal from "../components/transactions/AddTransactionModal";
import Button from "../components/ui/Button";
import { useApp } from "../context/AppContext";
import { useTransactions } from "../hooks/useTransactions";

export default function TransactionsPage() {
  const { state } = useApp();
  const { transactions } = useTransactions();
  const isAdmin = state.role === "admin";
  const [addOpen, setAddOpen] = useState(false);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto">
      {/* Page header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-400 mt-0.5">
            {transactions.length} result{transactions.length !== 1 ? "s" : ""} &middot;&nbsp;
            <span className="text-emerald-600 font-medium">
              +${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })} income
            </span>
            &nbsp;&middot;&nbsp;
            <span className="text-rose-500 font-medium">
              -${totalExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })} expenses
            </span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button
              variant="primary"
              size="md"
              icon={<Plus size={15} />}
              onClick={() => setAddOpen(true)}
            >
              Add Transaction
            </Button>
          )}
          {!isAdmin && (
            <span className="text-xs text-slate-400 bg-slate-100 px-3 py-2 rounded-xl">
              Switch to Admin to add transactions
            </span>
          )}
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* Table */}
      <TransactionTable />

      {/* Add modal */}
      <AddTransactionModal isOpen={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}
