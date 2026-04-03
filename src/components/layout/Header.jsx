import { useLocation } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { useApp } from "../../context/AppContext";

const pageTitles = {
  "/": "Dashboard",
  "/transactions": "Transactions",
  "/insights": "Insights",
};

export default function Header() {
  const location = useLocation();
  const { state, dispatch } = useApp();
  const title = pageTitles[location.pathname] || "Zorvyn";

  function setRole(role) {
    dispatch({ type: "SET_ROLE", payload: role });
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-100">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-lg font-bold text-slate-800">{title}</h1>

        <div className="flex items-center gap-3">
          {/* Role pill toggle */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-0.5">
            <button
              onClick={() => setRole("viewer")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
                ${state.role === "viewer"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
                }`}
            >
              Viewer
            </button>
            <button
              onClick={() => setRole("admin")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150
                ${state.role === "admin"
                  ? "bg-violet-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-600"
                }`}
            >
              Admin
            </button>
          </div>

          {/* Bell */}
          <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-violet-500 rounded-full" />
          </button>

          {/* Avatar */}
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-violet-100 text-violet-700">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
