"use client";
export interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export default function Input({
  label,
  type,
  value,
  onChange,
  placeholder = "",
  maxLength = 50,
}: InputProps) {
  return (
    <div className="flex flex-col bg-secondary-600 p-2 m-2 border-text border rounded-lg">
      <label className="text-text text-lg font-bold mb-2" htmlFor={label}>
        {label}
      </label>
      <input
        className="border border-text rounded-md p-1 focus:outline-none focus:bg-secondary-800 bg-secondary-700"
        id={label}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
}
