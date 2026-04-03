import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import Card from "../ui/Card";
import { formatCurrency, formatPercent } from "../../utils/formatters";

export default function SummaryCard({ title, value, delta, icon: Icon, accent, isCurrency = true, suffix = "" }) {
  const isPositive = delta > 0;
  const isNeutral = delta === 0;

  const accents = {
    violet: {
      bg: "bg-violet-50",
      icon: "text-violet-600",
      badge: isPositive ? "bg-emerald-50 text-emerald-600" : isNeutral ? "bg-slate-100 text-slate-500" : "bg-rose-50 text-rose-500",
    },
    emerald: {
      bg: "bg-emerald-50",
      icon: "text-emerald-600",
      badge: isPositive ? "bg-emerald-50 text-emerald-600" : isNeutral ? "bg-slate-100 text-slate-500" : "bg-rose-50 text-rose-500",
    },
    rose: {
      bg: "bg-rose-50",
      icon: "text-rose-500",
      badge: isPositive ? "bg-rose-50 text-rose-500" : isNeutral ? "bg-slate-100 text-slate-500" : "bg-emerald-50 text-emerald-600",
    },
    amber: {
      bg: "bg-amber-50",
      icon: "text-amber-600",
      badge: isPositive ? "bg-emerald-50 text-emerald-600" : isNeutral ? "bg-slate-100 text-slate-500" : "bg-rose-50 text-rose-500",
    },
  };

  const style = accents[accent] || accents.violet;
  const DeltaIcon = isNeutral ? Minus : isPositive ? TrendingUp : TrendingDown;

  return (
    <Card hover>
      <div className="flex items-start justify-between mb-4">
        <div className={`flex items-center justify-center w-11 h-11 rounded-2xl ${style.bg}`}>
          <Icon size={20} className={style.icon} />
        </div>
        {delta !== undefined && (
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${style.badge}`}>
            <DeltaIcon size={12} />
            {formatPercent(Math.abs(delta))}
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500 font-medium mb-1">{title}</p>
      <p className="text-2xl font-bold text-slate-800 tracking-tight">
        {isCurrency ? formatCurrency(value) : `${value}${suffix}`}
      </p>
      {delta !== undefined && (
        <p className="text-xs text-slate-400 mt-1">
          {isNeutral ? "No change" : isPositive ? "vs last month" : "vs last month"}
        </p>
      )}
    </Card>
  );
}
