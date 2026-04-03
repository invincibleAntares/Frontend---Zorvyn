import Card from "../ui/Card";

const accentMap = {
  emerald: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    bar: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  rose: {
    bg: "bg-rose-50",
    icon: "text-rose-500",
    bar: "bg-rose-500",
    badge: "bg-rose-50 text-rose-600 border-rose-200",
  },
  violet: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    bar: "bg-violet-500",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    bar: "bg-amber-400",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  cyan: {
    bg: "bg-cyan-50",
    icon: "text-cyan-600",
    bar: "bg-cyan-500",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
};

export default function InsightCard({ icon: Icon, title, value, description, accent = "violet", tag }) {
  const style = accentMap[accent] || accentMap.violet;

  return (
    <Card hover className="flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className={`flex items-center justify-center w-10 h-10 rounded-2xl ${style.bg}`}>
          <Icon size={18} className={style.icon} />
        </div>
        {tag && (
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${style.badge}`}>
            {tag}
          </span>
        )}
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1">{title}</p>
        <p className="text-xl font-bold text-slate-800 leading-tight">{value}</p>
        <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}
