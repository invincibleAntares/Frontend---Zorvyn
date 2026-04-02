import { NavLink } from "react-router-dom";
import { LayoutDashboard, ArrowLeftRight, Lightbulb, ChevronDown, Wallet } from "lucide-react";
import { useApp } from "../../context/AppContext";

const navLinks = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/insights", label: "Insights", icon: Lightbulb },
];

const roleOptions = [
  { value: "viewer", label: "Viewer" },
  { value: "admin", label: "Admin" },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 bg-[#0f1117] min-h-screen px-4 py-6">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-2 mb-10">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-violet-600 shadow-lg shadow-violet-900/50">
            <Wallet size={18} className="text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">Zorvyn</span>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 flex-1">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2">
            Menu
          </p>
          {navLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150
                ${
                  isActive
                    ? "bg-violet-600 text-white shadow-md shadow-violet-900/40"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Role switcher */}
        <div className="mt-auto px-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
            Role
          </p>
          <div className="relative">
            <select
              value={state.role}
              onChange={(e) => dispatch({ type: "SET_ROLE", payload: e.target.value })}
              className="w-full appearance-none bg-white/5 border border-white/10 text-slate-300 text-sm
                rounded-xl px-3 py-2.5 pr-8 cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-violet-500
                transition-all"
            >
              {roleOptions.map((r) => (
                <option key={r.value} value={r.value} className="bg-[#1a1d27] text-white">
                  {r.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
          </div>
          <div
            className={`mt-2 text-center text-xs py-1.5 rounded-lg font-medium
            ${state.role === "admin" ? "bg-amber-500/10 text-amber-400" : "bg-slate-700/50 text-slate-500"}`}
          >
            {state.role === "admin" ? "Admin — Full Access" : "Viewer — Read Only"}
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0f1117] border-t border-white/10 flex">
        {navLinks.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors
              ${isActive ? "text-violet-400" : "text-slate-500"}`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  );
}
