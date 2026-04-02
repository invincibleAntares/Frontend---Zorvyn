import { createContext, useContext, useReducer } from "react";
import { transactions as initialTransactions } from "../data/mockData";

const AppContext = createContext(null);

const initialState = {
  transactions: initialTransactions,
  filters: {
    search: "",
    type: "all",
    category: "all",
    dateFrom: "",
    dateTo: "",
    sortBy: "date",
    sortOrder: "desc",
  },
  role: "viewer",
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.payload };

    case "SET_FILTER":
      return {
        ...state,
        filters: { ...state.filters, [action.key]: action.value },
      };

    case "RESET_FILTERS":
      return { ...state, filters: initialState.filters };

    case "ADD_TRANSACTION": {
      const newTx = {
        ...action.payload,
        id: `t${Date.now()}`,
      };
      return { ...state, transactions: [newTx, ...state.transactions] };
    }

    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map((t) =>
          t.id === action.payload.id ? { ...t, ...action.payload } : t
        ),
      };

    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
