import { Search, X, SlidersHorizontal } from "lucide-react";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { useTransactions } from "../../hooks/useTransactions";
import { CATEGORIES } from "../../data/mockData";

const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

const categoryOptions = [
  { value: "all", label: "All Categories" },
  ...CATEGORIES.map((c) => ({ value: c, label: c })),
];

const sortOptions = [
  { value: "date", label: "Date" },
  { value: "amount", label: "Amount" },
  { value: "description", label: "Description" },
  { value: "category", label: "Category" },
];

const orderOptions = [
  { value: "desc", label: "Descending" },
  { value: "asc", label: "Ascending" },
];

export default function TransactionFilters() {
  const { filters, setFilter, resetFilters } = useTransactions();

  const hasActive =
    filters.search ||
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.dateFrom ||
    filters.dateTo;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal size={15} className="text-slate-400" />
        <span className="text-sm font-semibold text-slate-700">Filters</span>
        {hasActive && (
          <button
            onClick={resetFilters}
            className="ml-auto flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-medium transition-colors"
          >
            <X size={12} />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <Input
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
          icon={<Search size={14} />}
          className="xl:col-span-2"
        />
        <Select
          value={filters.type}
          onChange={(e) => setFilter("type", e.target.value)}
          options={typeOptions}
          placeholder={null}
        />
        <Select
          value={filters.category}
          onChange={(e) => setFilter("category", e.target.value)}
          options={categoryOptions}
          placeholder={null}
        />
        <Input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilter("dateFrom", e.target.value)}
          placeholder="From date"
        />
        <Input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilter("dateTo", e.target.value)}
          placeholder="To date"
        />
      </div>

      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-50">
        <span className="text-xs text-slate-400">Sort by:</span>
        <Select
          value={filters.sortBy}
          onChange={(e) => setFilter("sortBy", e.target.value)}
          options={sortOptions}
          placeholder={null}
          className="w-36"
        />
        <Select
          value={filters.sortOrder}
          onChange={(e) => setFilter("sortOrder", e.target.value)}
          options={orderOptions}
          placeholder={null}
          className="w-36"
        />
      </div>
    </div>
  );
}
