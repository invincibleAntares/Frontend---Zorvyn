import { useLocation } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { useApp } from "../../context/AppContext";
import Badge from "../ui/Badge";

const pageTitles = {
  "/": { title: "Dashboard", subtitle: "Your financial overview" },
  "/transactions": { title: "Transactions", subtitle: "Track every movement" },
  "/insights": { title: "Insights", subtitle: "Understand your patterns" },
};

export default function Header() {
  const location = useLocation();
  const { state } = useApp();
  const page = pageTitles[location.pathname] || { title: "Zorvyn", subtitle: "" };

  return (
    <header className="sticky top-0 z-30 bg-slate-50/80 backdrop-blur-md border-b border-slate-100">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800 leading-tight">{page.title}</h1>
          <p className="text-xs text-slate-400 mt-0.5">{page.subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant={state.role === "admin" ? "admin" : "viewer"}>
            {state.role === "admin" ? "Admin" : "Viewer"}
          </Badge>

          <button className="relative p-2 rounded-xl hover:bg-slate-200 text-slate-500 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-violet-500 rounded-full" />
          </button>

          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-100 text-violet-700">
            <User size={17} />
          </div>
        </div>
      </div>
    </header>
  );
}
