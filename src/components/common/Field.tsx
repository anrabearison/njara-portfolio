import { memo } from "react";

interface FieldProps {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  maxLength?: number;
}

export const Field = memo(function Field({ label, name, type, required, maxLength }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={maxLength}
        className="w-full rounded-xl border border-white/10 bg-[#0D1117] px-4 py-3 text-sm outline-none transition-colors focus:border-[#00D4FF]/60 focus:shadow-[0_0_0_3px_rgba(0,212,255,0.15)]"
      />
    </div>
  );
});
