"use client";
export interface ButtonProps {
  label: string;
  color?: "primary" | "secondary" | "accent";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}
export default function Button({
  label,
  color = "primary",
  className = "",
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={`bg-primary-500 hover:bg-primary-400 text-text font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition-all rounded-lg outline-none ${className}`}
      onClick={onClick}
      type="button"
      disabled={disabled}
      role="button"
    >
      {label}
    </button>
  );
}
