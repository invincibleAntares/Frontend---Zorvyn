import { useState } from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import AddTransactionModal from "./AddTransactionModal";
import { useTransactions } from "../../hooks/useTransactions";
import { useApp } from "../../context/AppContext";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { CATEGORY_COLORS } from "../../data/mockData";

const columns = [
  { key: "date", label: "Date" },
  { key: "description", label: "Description" },
  { key: "category", label: "Category" },
  { key: "type", label: "Type" },
  { key: "amount", label: "Amount" },
];

function SortIcon({ col, sortBy, sortOrder }) {
  if (sortBy !== col) return <ArrowUpDown size={13} className="text-slate-300" />;
  return sortOrder === "asc"
    ? <ArrowUp size={13} className="text-violet-500" />
    : <ArrowDown size={13} className="text-violet-500" />;
}

export default function TransactionTable() {
  const { transactions, filters, setFilter, deleteTransaction } = useTransactions();
  const { state } = useApp();
  const isAdmin = state.role === "admin";

  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  function handleSort(col) {
    if (filters.sortBy === col) {
      setFilter("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc");
    } else {
      setFilter("sortBy", col);
      setFilter("sortOrder", "desc");
    }
  }

  function handleEdit(tx) {
    setEditData({ ...tx, amount: String(tx.amount) });
    setModalOpen(true);
  }

  function handleDelete(id) {
    setDeleteId(id);
  }

  function confirmDelete() {
    deleteTransaction(deleteId);
    setDeleteId(null);
  }

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Table */}
        {transactions.length === 0 ? (
          <EmptyState
            title="No transactions found"
            description="Try adjusting your filters or add a new transaction."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60">
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide cursor-pointer hover:text-slate-700 select-none whitespace-nowrap"
                    >
                      <span className="flex items-center gap-1.5">
                        {col.label}
                        <SortIcon col={col.key} sortBy={filters.sortBy} sortOrder={filters.sortOrder} />
                      </span>
                    </th>
                  ))}
                  {isAdmin && (
                    <th className="px-5 py-3.5 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Date */}
                    <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                      {formatDate(tx.date)}
                    </td>

                    {/* Description */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-xl shrink-0
                            ${tx.type === "income" ? "bg-emerald-50" : "bg-rose-50"}`}
                        >
                          {tx.type === "income" ? (
                            <ArrowDownLeft size={14} className="text-emerald-600" />
                          ) : (
                            <ArrowUpRight size={14} className="text-rose-500" />
                          )}
                        </div>
                        <span className="font-medium text-slate-700 truncate max-w-[180px]">
                          {tx.description}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${CATEGORY_COLORS[tx.category]}18`,
                          color: CATEGORY_COLORS[tx.category] || "#64748b",
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: CATEGORY_COLORS[tx.category] }}
                        />
                        {tx.category}
                      </span>
                    </td>

                    {/* Type */}
                    <td className="px-5 py-3.5">
                      <Badge variant={tx.type}>
                        {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      </Badge>
                    </td>

                    {/* Amount */}
                    <td className="px-5 py-3.5 text-right font-semibold whitespace-nowrap">
                      <span className={tx.type === "income" ? "text-emerald-600" : "text-slate-700"}>
                        {tx.type === "income" ? "+" : "-"}
                        {formatCurrency(tx.amount)}
                      </span>
                    </td>

                    {/* Admin actions */}
                    {isAdmin && (
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(tx)}
                            icon={<Pencil size={13} />}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(tx.id)}
                            icon={<Trash2 size={13} />}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer count */}
        {transactions.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-50 bg-slate-50/40">
            <p className="text-xs text-slate-400">
              Showing <span className="font-semibold text-slate-600">{transactions.length}</span> transaction{transactions.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>

      {/* Edit modal */}
      <AddTransactionModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null); }}
        editData={editData}
      />

      {/* Delete confirm overlay */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setDeleteId(null)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-rose-50 mx-auto mb-4">
              <Trash2 size={20} className="text-rose-500" />
            </div>
            <h3 className="text-base font-semibold text-slate-800 text-center mb-1">
              Delete Transaction?
            </h3>
            <p className="text-sm text-slate-400 text-center mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>
                Cancel
              </Button>
              <Button variant="danger" className="flex-1 !bg-rose-500 !text-white hover:!bg-rose-600" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
