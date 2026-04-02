const variants = {
  primary: "bg-violet-600 hover:bg-violet-700 text-white shadow-sm shadow-violet-200",
  secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",
  danger: "bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200",
  ghost: "hover:bg-slate-100 text-slate-600",
  outline: "border border-slate-200 hover:bg-slate-50 text-slate-700",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  icon,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center font-medium rounded-xl
        transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
