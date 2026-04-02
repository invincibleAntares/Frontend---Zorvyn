const variants = {
  income: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  expense: "bg-rose-50 text-rose-700 border border-rose-200",
  admin: "bg-amber-50 text-amber-700 border border-amber-200",
  viewer: "bg-slate-100 text-slate-600 border border-slate-200",
  default: "bg-slate-100 text-slate-600 border border-slate-200",
};

export default function Badge({ children, variant = "default", className = "" }) {
  return (
    <span
      className={`
        inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
        ${variants[variant] || variants.default}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
