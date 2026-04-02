export default function Input({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
  className = "",
  error,
  required,
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="text-rose-500 ml-0.5">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          className={`
            w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm
            text-slate-800 placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
            transition-all duration-150
            ${icon ? "pl-9" : ""}
            ${error ? "border-rose-400 focus:ring-rose-400" : ""}
          `}
        />
      </div>
      {error && <p className="text-xs text-rose-500">{error}</p>}
    </div>
  );
}
