import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

const base =
  "w-full rounded-xl border border-black/12 bg-black/[0.02] px-4 py-3 text-base text-black placeholder:text-black/30 outline-none transition-colors focus:border-black/30 focus:bg-black/[0.04]";

export function TextField({
  label,
  name,
  ...rest
}: { label: string; name: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-widest text-black/60">
        {label}
      </label>
      <input id={name} name={name} className={base} {...rest} />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  rows = 4,
  ...rest
}: { label: string; name: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-widest text-black/60">
        {label}
      </label>
      <textarea id={name} name={name} rows={rows} className={base} {...rest} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-widest text-black/60">
        {label}
      </label>
      <select id={name} name={name} defaultValue={defaultValue} className={base}>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-white">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 text-sm text-black/65">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-black/20 bg-black/5 accent-black"
      />
      {label}
    </label>
  );
}
