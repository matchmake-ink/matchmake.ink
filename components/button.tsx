"use client";
export interface ButtonProps {
  label: string;
  color: "primary" | "secondary" | "accent";
  onClick: () => void;
}
export default function Button({ label, color, onClick }: ButtonProps) {
  console.log(color);
  return (
    <button
      className={`bg-primary-500 hover:bg-primary-400 text-text font-bold py-2 px-4 focus:outline-none focus:shadow-outline transition-all rounded-lg outline-none`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
