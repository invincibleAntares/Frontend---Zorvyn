import { useMemo } from "react";
import { useApp } from "../context/AppContext";

export function useTransactions() {
  const { state, dispatch } = useApp();
  const { transactions, filters } = state;

  const filtered = useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    if (filters.category !== "all") {
      result = result.filter((t) => t.category === filters.category);
    }

    if (filters.dateFrom) {
      result = result.filter((t) => t.date >= filters.dateFrom);
    }

    if (filters.dateTo) {
      result = result.filter((t) => t.date <= filters.dateTo);
    }

    result.sort((a, b) => {
      let valA = a[filters.sortBy];
      let valB = b[filters.sortBy];

      if (filters.sortBy === "date") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
      }

      if (filters.sortBy === "amount") {
        valA = Number(valA);
        valB = Number(valB);
      }

      if (typeof valA === "string") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (filters.sortOrder === "asc") return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });

    return result;
  }, [transactions, filters]);

  function setFilter(key, value) {
    dispatch({ type: "SET_FILTER", key, value });
  }

  function resetFilters() {
    dispatch({ type: "RESET_FILTERS" });
  }

  function addTransaction(tx) {
    dispatch({ type: "ADD_TRANSACTION", payload: tx });
  }

  function editTransaction(tx) {
    dispatch({ type: "EDIT_TRANSACTION", payload: tx });
  }

  function deleteTransaction(id) {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  }

  return {
    transactions: filtered,
    allTransactions: transactions,
    filters,
    setFilter,
    resetFilters,
    addTransaction,
    editTransaction,
    deleteTransaction,
  };
}
